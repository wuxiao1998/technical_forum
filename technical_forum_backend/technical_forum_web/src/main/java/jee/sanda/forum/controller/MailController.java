package jee.sanda.forum.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jee.sanda.forum.form.Email;
import jee.sanda.forum.service.MailService;
import jee.sanda.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.TimeUnit;

/***
 * 邮件服务接口
 */
@RestController
@RequestMapping("/mail")
@Api(value="邮件controller",tags={"邮件服务接口"})
public class MailController {
    @Autowired
    private MailService mailService;
    //redis 缓存工具类
    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private UserService userService;
    /***
     * 发送邮箱验证码
     * @param email
     * @return
     */
    @ApiOperation("发送邮箱验证码")
    @PostMapping("/sendCode")
    public ResponseEntity<String> sendCode(@RequestBody Email email) {
        String em = email.getEmail();
        String uuid = email.getUuid();
        if (em == null || !em.contains("@")) {
            return ResponseEntity.badRequest().body("邮箱错误!!!");
        }
        String code = mailService.sendSimpleMail(em,"欢迎注册IT技术论坛,本次注册的验证码是:");
        ////将邮箱验证码存入session域
        redisTemplate.delete(uuid);
        redisTemplate.opsForValue().set(uuid,code,5, TimeUnit.MINUTES); //验证码在5分钟之后失效
        return ResponseEntity.ok("success");
    }

    /**
     * 发送用于重置密码的邮箱验证码
     * @param userName
     * @return
     */
    @ApiOperation("发送用于重置密码的邮箱验证码")
    @GetMapping("/sendCodeForResetPassword/{username}")
    public ResponseEntity<String> sendCodeForResetPassword(@PathVariable("username") String userName) {
        if(!userService.checkUserName(userName))
        {
            String em=userService.findEmailByUserName(userName);
            String code = mailService.sendSimpleMail(em,"本次用于重置密码的验证码是:");
            redisTemplate.delete(userName);
            redisTemplate.opsForValue().set(userName,code,5, TimeUnit.MINUTES); //验证码在5分钟之后失效
            return ResponseEntity.ok("success");
        }
        return ResponseEntity.badRequest().body("用户名错误");
    }
}
