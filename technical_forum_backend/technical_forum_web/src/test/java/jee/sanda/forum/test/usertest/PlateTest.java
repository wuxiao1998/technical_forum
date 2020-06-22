package jee.sanda.forum.test.usertest;

import jee.sanda.forum.boot.TechnicalForumApplication;
import jee.sanda.forum.entity.Plate;
import jee.sanda.forum.service.PlateService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest(classes = TechnicalForumApplication.class)
@Slf4j
@RunWith(SpringRunner.class)
public class PlateTest {
    @Autowired
    private PlateService plateService;

    /**
     * 查找所有板块测试
     */
    @Test
    public void testFindAll(){
        List<Plate> plates=plateService.findAll();
        System.out.println(plates);
    }
}
