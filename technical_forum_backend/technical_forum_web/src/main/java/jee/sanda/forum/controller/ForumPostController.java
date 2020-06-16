package jee.sanda.forum.controller;

import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.entity.ForumPostDetail;
import jee.sanda.forum.entity.ForumPostReply;
import jee.sanda.forum.form.Comment;
import jee.sanda.forum.form.Reply;
import jee.sanda.forum.service.ForumPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/***
 * 帖子接口
 */
@RestController
@RequestMapping("/forumPost")
public class ForumPostController {

    @Autowired
    private ForumPostService forumPostService;
    @Autowired
    private HttpServletRequest request;
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
     * 通过帖子主表id查询帖子的所有信息(回帖+评论,回帖为分页查询)
     * @param postId
     * @return
     */
    @GetMapping("/findPostDetails")
    public ResponseEntity<Object> findDetailByPostId(@RequestParam("postId") Long postId,
                                                  @RequestParam("pageNo") Integer pageNo,
                                                  @RequestParam("pageSize") Integer Size) {
        Page<ForumPostDetail> forumPost = forumPostService.findDetailByPostId(postId,pageNo,Size);
        return  ResponseEntity.ok(forumPost);
    }

    /***
     * 通过帖子主表id查询帖子的所有信息(暂不使用)
     * @param postDetailId
     * @return
     */
    @GetMapping("/findPostReply")
    public ResponseEntity<Object> findReplyByPostDetailId(@RequestParam("postDetailId") Long postDetailId,
                                                  @RequestParam("pageNo") Integer pageNo,
                                                  @RequestParam("pageSize") Integer Size) {
        Page<ForumPostReply> forumPostReplies = forumPostService.findReplyByPostDetailId(postDetailId,pageNo,Size);
        return  ResponseEntity.ok(forumPostReplies);
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

    /**
     * 保存用户的回帖信息
     * @param comment
     * @return
     */
    @PostMapping("/comment")
    public ResponseEntity<Object>comment(@RequestBody Comment comment){
        HttpSession session=request.getSession();
        Long userId=(Long)session.getAttribute("userId");
        Long forumPostId=comment.getForumPostId();
        String content=comment.getContent();
        if(forumPostService.comment(userId,forumPostId,content)){
            return ResponseEntity.ok("回帖成功");
        }
        return ResponseEntity.badRequest().body("回帖失败");
    }

    /**
     * 保存用户的回复
     * @param reply
     * @return
     */
    @PostMapping("/reply")
    public ResponseEntity<Object>reply(@RequestBody Reply reply){
        HttpSession session=request.getSession();
        Long userId=(Long)session.getAttribute("userId");
        Long forumPostDetailId=reply.getForumPostDetailId();
        String content=reply.getContent();
        if(forumPostService.reply(userId,forumPostDetailId,content)){
            return ResponseEntity.ok("评论成功");
        }
        return ResponseEntity.badRequest().body("评论失败");
    }

    /***
     *
     * @param postId
     * @return
     */
    @GetMapping("/findById")
    public ResponseEntity<Object> findById(@RequestParam("postId") Long postId){

        ForumPost forumPost = forumPostService.findById(postId);
        if(forumPost == null){
            return ResponseEntity.badRequest().body("查询失败");
        }
        return ResponseEntity.ok(forumPost);
    }
}

