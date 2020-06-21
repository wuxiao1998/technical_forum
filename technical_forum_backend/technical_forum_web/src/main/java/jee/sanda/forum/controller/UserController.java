package jee.sanda.forum.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jee.sanda.forum.entity.User;
import jee.sanda.forum.form.UpdateUserForm;
import jee.sanda.forum.service.MailService;
import jee.sanda.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;

/***
 * 用户接口
 */
@RestController
@RequestMapping("/user")
@Api(value="用户controller",tags={"用户服务接口"})
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MailService mailService;

    @Autowired
    private HttpServletRequest request;
    //redis 缓存工具类
    @Autowired
    private StringRedisTemplate redisTemplate;
    /***
     * 用户登录接口
     * @param user
     * @return
     */
    @ApiOperation("用户登录")
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody User user) {
        User loginUser = userService.login(user.getUsername(), user.getPassword());
        if (loginUser == null)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("用户名或密码错误");
        }
        else
            {
                if (userService.checkStatus(loginUser)==true)
                {
                    HttpSession session = request.getSession();
                    //将userId存入session域
                    session.setAttribute("userId", loginUser.getId());
                    return ResponseEntity.ok(loginUser);
                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("该账号被封，无法登录");
            }
    }

    /***
     * 注册接口
     * @param user
     * @return
     */
    @ApiOperation("用户注册")
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        HttpSession session = request.getSession();
        String validateCode = user.getCode();
        String uuid = user.getUuid();
        if (uuid != null && validateCode != null) {
            //检测验证码是否匹配
            String authCode = redisTemplate.opsForValue().get(uuid);
            boolean flag = mailService.validateCode(authCode, validateCode);
            if (flag) {
                //验证码正确
                Long userId=userService.register(user);
                session.setAttribute("userId",userId);
                return ResponseEntity.ok("注册成功");

            } else {
                return ResponseEntity.badRequest().body("验证码错误或已失效!!!");
            }
        } else {
            return ResponseEntity.badRequest().body("注册失败");
        }
    }

    /***
     * 更新用户信息
     * @param updateUserForm
     * @return
     */
    @ApiOperation("更新用户信息")
    @PostMapping("/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserForm updateUserForm) {
        HttpSession session = request.getSession();
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("请重新登录");
        }
        boolean result = userService.updateUser(userId, updateUserForm);
        if (result == false) {
            return ResponseEntity.badRequest().body("更新失败");
        }
        return ResponseEntity.ok("更新成功");
    }

    /***
     * 检查用户名是否重名
     * @param user
     * @return
     */
    @ApiOperation("检查用户名是否重名")
    @PostMapping("/checkUsername")
    public ResponseEntity<Object> checkUsername(@RequestBody User user) {
        if (userService.checkUserName(user.getUsername())) {
            return ResponseEntity.ok("用户名可使用");
        }
        return ResponseEntity.ok("用户名重复");
    }

    /***
     * 检查用户修改密码时旧密码是否正确
     * @param user
     * @return
     */
    @ApiOperation("检查用户修改密码时旧密码是否正确")
    @PostMapping("/checkPassword")
    public ResponseEntity<Object> checkPassword(@RequestBody User user) {
        HttpSession session = request.getSession();
        Long userId = (Long) session.getAttribute("userId");
        if (userService.checkPassword(userId, user.getPassword())) {
            return ResponseEntity.ok("密码正确");
        }
        return ResponseEntity.badRequest().body("密码错误");
    }

    /***
     * 修改密码
     * @param user
     * @return
     */
    @ApiOperation("修改密码")
    @PostMapping("/updatePassword")
    public ResponseEntity<Object> updatePassword(@RequestBody User user) {
        HttpSession session = request.getSession();
        Long userId = (Long) session.getAttribute("userId");
        if (userService.updatePassword(userId, user.getPassword())) {
            return ResponseEntity.ok("密码修改成功");
        }
        return ResponseEntity.badRequest().body("密码修改失败");
    }
    /***
     * 头像上传
     * @param file,uploadType
     * @return
     * @throws IOException
     */
    @ApiOperation("头像上传")
    @PostMapping("/upload")
    public String testUpload(MultipartFile file,@RequestParam("uploadType")String uploadType) throws IOException {
        if(file == null){
            return "";
        }
        HttpSession session = request.getSession();
        File upload = new File(ResourceUtils.getURL("classpath:").getPath() + "/upload/");
        if (!upload.exists()) {
            upload.mkdirs();
        }
        Long userId=(Long)session.getAttribute("userId");
        file.transferTo(new File(upload, userId+".jpg"));
        if("register".equals(uploadType)){
            session.removeAttribute("userId");
        }
        return "success";
    }

    /**
     * 根据当前登录用户的个人信息
     * @return
     */
    @ApiOperation("查找当前登录用户的个人信息")
    @GetMapping("/findById")
    public ResponseEntity<Object> findById(){
        Long userId = (Long)request.getSession().getAttribute("userId");
        if(userId == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("请重新登录");
        }
        User user = userService.findById(userId);
        if(user == null){
            return ResponseEntity.badRequest().body("没有找到指定用户");
        }else{
            return ResponseEntity.ok(user);
        }
    }

    /**
     * 查看所有用户信息
     * @return
     */
    @ApiOperation("查看所有用户信息")
    @GetMapping("/findAll/{pageNo}/{pageSize}")
    public ResponseEntity<Object> findAll(@PathVariable("pageNo") Integer pageNo,
                                          @PathVariable("pageSize") Integer pageSize){
        Page<User> userList = userService.findAll(pageNo,pageSize);
        return ResponseEntity.ok(userList);

    }

    /**
     * 封禁用户
     * @param userId
     * @return
     */
    @ApiOperation("封禁用户")
    @GetMapping("/banUser")
    public ResponseEntity<Object> banUser(Long userId){
        if(userService.banUser(userId)){
           return ResponseEntity.ok("封禁成功");
        }
        return ResponseEntity.badRequest().body("没有查找到该用户id，封禁失败");
    }
}

