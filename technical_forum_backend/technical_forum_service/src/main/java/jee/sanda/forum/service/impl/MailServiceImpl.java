package jee.sanda.forum.service.impl;

import jee.sanda.forum.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {
    @Autowired
    private JavaMailSender mailSender;
    @Value("${spring.mail.from}")
    private String from;
    @Override
    public void sendSimpleMail(String email) {
        //创建SimpleMailMessage对象
        SimpleMailMessage message = new SimpleMailMessage();
        //邮件发送人
        message.setFrom(from);
        //邮件接收人
        message.setTo(email);
        //邮件主题
        message.setSubject("技术论坛系统");
        //邮件内容
        message.setText("欢迎注册技术论坛系统,此次注册验证码是:123");
        //发送邮件
        mailSender.send(message);
    }
}
