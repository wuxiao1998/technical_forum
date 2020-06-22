package jee.sanda.forum.test.usertest;

import jee.sanda.forum.boot.TechnicalForumApplication;
import jee.sanda.forum.entity.Notice;
import jee.sanda.forum.service.NoticeService;
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
public class NoticeTest {
    @Autowired
    private NoticeService noticeService;

    /**
     * 管理员查看所有公告测试
     */
    @Test
    public void testSearchNoticeByAdmin(){
        Page<Notice>notices=noticeService.searchNoticeByAdmin(2,5);
        System.out.println(notices);
    }

    /**
     * 用户查看公告测试
     */
    @Test
    public void testSearchNoticeByUser(){
        Page<Notice>notices=noticeService.searchNoticeByUser(1,2,5);
        System.out.println(notices);
    }
}
