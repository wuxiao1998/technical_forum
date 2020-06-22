package jee.sanda.forum.test.usertest;

import jee.sanda.forum.boot.TechnicalForumApplication;
import jee.sanda.forum.entity.User;
import jee.sanda.forum.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(classes = TechnicalForumApplication.class)
@Slf4j
@RunWith(SpringRunner.class)
public class UserTest {
    @Autowired
    private UserService userService;

    /***
     * 用户登录测试
     * @return
     */
    @Test
    public void testLogin(){
        User user = userService.login("user1", "123");
        System.out.println(user);
    }
}
