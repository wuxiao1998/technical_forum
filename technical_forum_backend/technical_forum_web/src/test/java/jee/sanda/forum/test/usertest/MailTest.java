package jee.sanda.forum.test.usertest;

import jee.sanda.forum.boot.TechnicalForumApplication;
import jee.sanda.forum.service.MailService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(classes = TechnicalForumApplication.class)
@Slf4j
@RunWith(SpringRunner.class)
public class MailTest {
    @Autowired
    private MailService mailService;

    /**
     * 测试发送邮件验证码
     */
    @Test
    public void testSendSimpleMail(){
        mailService.sendSimpleMail("1971730142@qq.com","单元测试：");
    }
}
