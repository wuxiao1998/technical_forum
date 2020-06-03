package jee.sanda.forum.controller;


import jee.sanda.forum.entity.User;
import jee.sanda.forum.form.UpdateUserForm;
import jee.sanda.forum.service.MailService;
import jee.sanda.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/***
 * 用户接口
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MailService mailService;

    @Autowired
    private HttpServletRequest request;
    /***
     * 用户登录接口
     * @param user
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody User user) {
        User loginUser = userService.login(user.getUsername(), user.getPassword());
        if (loginUser == null) {
            return ResponseEntity.ok("用户名或密码错误");
        } else {
            HttpSession session = request.getSession();
            //将userId存入session域
            session.setAttribute("userId", loginUser.getId());
            return ResponseEntity.ok(loginUser);
        }
    }

    /***
     * 注册接口
     * @param user
     * @return
     */
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        HttpSession session = request.getSession();
        String validateCode = user.getCode();
        String sessionCode = (String) session.getAttribute("code");
        if (sessionCode != null && validateCode != null) {
            //检测验证码是否匹配
            boolean flag = mailService.validateCode(sessionCode, validateCode);
            if (flag) {
                //验证码正确
                session.removeAttribute("code");
                if(userService.register(user))
                    return ResponseEntity.ok("注册成功");
                else
                    return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("用户名重复");
            } else {
                return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("验证码错误");
            }
        }else{
            return ResponseEntity.badRequest().body("注册失败");
        }
    }
    @PostMapping("/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserForm updateUserForm){
        HttpSession session=request.getSession();
        Long userId=(Long)session.getAttribute("userId");
        if(userId==null){
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("请重新登录");
        }
        boolean result=userService.updateUser(userId,updateUserForm);
        if (result==false){
            return ResponseEntity.badRequest().body("更新失败");
        }
        return ResponseEntity.ok("更新成功");
    }
}

