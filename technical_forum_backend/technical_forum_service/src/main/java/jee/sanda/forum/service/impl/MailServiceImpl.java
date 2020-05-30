package jee.sanda.forum.service.impl;

import jee.sanda.forum.service.MailService;
import jee.sanda.forum.utils.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MailServiceImpl implements MailService {
    @Autowired
    private JavaMailSender mailSender;
    @Value("${spring.mail.from}")
    private String from;
    @Override
    public String sendSimpleMail(String email) {
        String code = RandomUtils.getCode();
        //创建SimpleMailMessage对象
        SimpleMailMessage message = new SimpleMailMessage();
        //邮件发送人
        message.setFrom(from);
        //邮件接收人
        message.setTo(email);
        //邮件主题
        message.setSubject("技术论坛系统");
        //邮件内容
        message.setText("欢迎注册技术论坛系统,此次注册验证码是:"+code);
        //发送邮件
        mailSender.send(message);
        return code;
    }

    @Override
    public boolean validateCode(String sessionCode,String code) {
        return sessionCode.equalsIgnoreCase(code);
    }
}
