package jee.sanda.forum.controller;

import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.service.ForumPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/***
 * 帖子接口
 */
@RestController
@RequestMapping("/forumPost")
public class ForumPostController {

    @Autowired
    private ForumPostService forumPostService;

    /***
     * 根据板块id分页查询帖子信息
     * @param plateId
     * @param pageNo
     * @param pageSize
     * @return
     */
    @GetMapping("/findByPlateId")
    public ResponseEntity<Object> findByPlateId(@RequestParam("plateId") Integer plateId, @RequestParam("pageNo") Integer pageNo,
                                                @RequestParam("pageSize") Integer pageSize, @RequestParam("searchCondition") String searchCondition) {
        if (plateId == null) {
            return ResponseEntity.badRequest().body("参数错误");
        }
        Page<ForumPost> forumPosts = forumPostService.findByPlateId(plateId, pageNo, pageSize,searchCondition);
        return ResponseEntity.ok(forumPosts);
    }

    /***
     * 通过帖子主表id查询帖子的所有信息
     * @param postId
     * @return
     */
    @PostMapping("/findPostDetails")
    public ResponseEntity<Object> findAllByPostId(@RequestParam("postId") Long postId) {
        ForumPost forumPost = forumPostService.findAllByPostId(postId);
        return  ResponseEntity.ok(forumPost);
    }


    /***
     * 添加新帖
     * @param forumPost
     * @return
     */
    @PostMapping("/addPost")
    public ResponseEntity<Object> addPost(@RequestBody ForumPost forumPost) {
        forumPostService.saveForumPost(forumPost);
        return ResponseEntity.ok("success");
    }

    /**
     * 查找我的帖子
     * @param userId
     * @param pageNo
     * @param pageSize
     * @return
     */
    @GetMapping("/findByUserId")
    public ResponseEntity<Object>addPost(@RequestParam("userId") Long userId,@RequestParam("pageNo") Integer pageNo,@RequestParam("pageSize") Integer pageSize){
        if (userId == null) {
            return ResponseEntity.badRequest().body("userId为空");
        }
        Page<ForumPost> forumPosts = forumPostService.findByUserId(userId, pageNo, pageSize);
        return ResponseEntity.ok(forumPosts);
    }
}

