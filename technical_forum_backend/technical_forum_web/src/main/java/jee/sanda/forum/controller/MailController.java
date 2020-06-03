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
    private HttpServletRequest request;
    @PostMapping("/sendCode")
    public ResponseEntity<String> sendCode(@RequestBody Map<String,String> email){
        String em = email.get("email");
        if(em == null || !em.contains("@")){
            return ResponseEntity.badRequest().body("邮箱错误!!!");
        }
        String code = mailService.sendSimpleMail(em);
        HttpSession session = request.getSession();
        ////将邮箱验证码存入session域
        session.setAttribute("code",code);
        return ResponseEntity.ok("success");
    }
}
