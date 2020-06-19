package jee.sanda.forum.controller;

import jee.sanda.forum.form.Email;
import jee.sanda.forum.service.MailService;
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
public class MailController {
    @Autowired
    private MailService mailService;
    //redis 缓存工具类
    @Autowired
    private StringRedisTemplate redisTemplate;
    /***
     * 发送邮箱验证码
     * @param email
     * @return
     */
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
}
