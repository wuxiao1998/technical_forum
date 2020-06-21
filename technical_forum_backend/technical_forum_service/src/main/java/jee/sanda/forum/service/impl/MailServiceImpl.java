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
    public String sendSimpleMail(String email,String info) {
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
        message.setText(info + code +",验证码将在五分钟之内失效,请您尽快使用!!!");
        //发送邮件
        mailSender.send(message);
        return code;
    }

    @Override
    public boolean validateCode(String uuidCode, String code) {
        return code.equalsIgnoreCase(uuidCode);
    }
}
