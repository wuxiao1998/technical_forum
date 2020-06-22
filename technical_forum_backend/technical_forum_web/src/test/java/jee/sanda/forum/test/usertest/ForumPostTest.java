package jee.sanda.forum.test.usertest;

import jee.sanda.forum.boot.TechnicalForumApplication;
import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.entity.ForumPostDetail;
import jee.sanda.forum.service.ForumPostService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest(classes = TechnicalForumApplication.class)
@Slf4j
@RunWith(SpringRunner.class)
public class ForumPostTest {
    @Autowired
    private ForumPostService forumPostService;

    /**
     * 测试分页并按板块查询对应帖子
     */
    @Test
    public void testFindByPlateId(){
        Page<ForumPost>forumPosts= forumPostService.findByPlateId(1,1,3,"test");
        System.out.println(forumPosts);
    }
    /**
     * 测试根据帖子主表的id,分页查询帖子详情
     */
    @Test
    public void testFindDetailByPostId(){
        Page<ForumPostDetail>forumPostDetails=forumPostService.findDetailByPostId(32L,2,5);
        System.out.println(forumPostDetails);
    }
    /**
     * 测试根据userId查询所有帖子
     */
    @Test
    public void testFindByUserId(){
        Page<ForumPost>forumPosts=forumPostService.findByUserId(30L,2,5);
        System.out.println();
    }
    /**
     * 测试计算回帖数量
     */
    @Test
    public void testCountCommentQuantity(){
        Long num=forumPostService.countCommentQuantity(20L);
        System.out.println(num);
    }
    /**
     * 测试查询访问量最多的前n条帖子
     */
    @Test
    public void testfindTopPost(){
        List<ForumPost>forumPosts=forumPostService.findTopPost(1,5);
        System.out.println(forumPosts);
    }
}
