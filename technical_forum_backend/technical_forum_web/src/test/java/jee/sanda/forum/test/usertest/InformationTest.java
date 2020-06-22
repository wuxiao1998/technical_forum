package jee.sanda.forum.test.usertest;

import jee.sanda.forum.boot.TechnicalForumApplication;
import jee.sanda.forum.entity.UserInformation;
import jee.sanda.forum.service.InformationService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(classes = TechnicalForumApplication.class)
@Slf4j
@RunWith(SpringRunner.class)
public class InformationTest {
    @Autowired
    private InformationService informationService;

    /**
     * 测试查找某用户的所有的消息
     */
    @Test
    public void testSearchInformation(){
        Page<UserInformation>informations=informationService.searchInformation(58L,2,5);
        System.out.println(informations);
    }

    /**
     * 测试查找某用户的未读消息数量
     */
    @Test
    public void testCountUnreadInformationQuantity(){
        int num=informationService.countUnreadInformationQuantity(58L);
        System.out.println(num);
    }
}
