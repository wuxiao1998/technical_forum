package jee.sanda.forum.controller;

import jee.sanda.forum.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping("/mail")
public class MailController {
    @Autowired
    private MailService mailService;


    @PostMapping("/sendCode")
    public String sendCode(@RequestBody Map<String,String> email, HttpServletRequest request){
        String email1 = email.get("email");
        String code = mailService.sendSimpleMail(email1);
        HttpSession session = request.getSession();
        session.setAttribute("code",code);
        return "success";
    }

    @PostMapping("/validateCode")
    public String validateCode(HttpServletRequest request,@RequestBody Map<String,String> code){
        HttpSession session = request.getSession();
        String sessionCode = (String)session.getAttribute("code");
        if( sessionCode!= null ){
            boolean flag = mailService.validateCode(sessionCode, code.get("code"));
            if(flag){
                return "验证成功!!!";
            }else{
                return "验证码错误,验证失败!!!";
            }
        }
        return "验证失败!!!";
    }
}
