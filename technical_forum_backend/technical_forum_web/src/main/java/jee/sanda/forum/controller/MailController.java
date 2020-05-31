package jee.sanda.forum.controller;

import jee.sanda.forum.service.MailService;
import jee.sanda.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping("/mail")
public class MailController {
    @Autowired
    private MailService mailService;
    @Autowired
    private UserService userService;

    @PostMapping("/sendCode")
    public ResponseEntity<String> sendCode(@RequestBody Map<String,String> email, HttpServletRequest request){
        String email1 = email.get("email");
        String code = mailService.sendSimpleMail(email1);
        HttpSession session = request.getSession();
        ////将邮箱验证码存入session域
        session.setAttribute("code",code);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/validateCode")
    public ResponseEntity<String> validateCode(HttpServletRequest request,@RequestBody Map<String,Object> validate){
        HttpSession session = request.getSession();
        String sessionCode = (String)session.getAttribute("code");
        String validateCode = (String)validate.get("code");
        Long userId = (Long) session.getAttribute("userId");
        if( sessionCode!= null && userId != null && validateCode != null){
            //检测验证码是否匹配
            boolean flag = mailService.validateCode(sessionCode, validateCode);
            if(flag){
                //验证码正确,修改用户状态为已激活,清空session
                userService.updateStatus(userId);
                session.removeAttribute("code");
                session.removeAttribute("userId");
                return ResponseEntity.ok("验证成功");
            }else{
                return ResponseEntity.ok("验证码错误,验证失败");
            }
        }
        return ResponseEntity.badRequest().body("验证失败");
    }
}
