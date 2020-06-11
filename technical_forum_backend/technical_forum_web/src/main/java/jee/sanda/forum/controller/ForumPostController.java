package jee.sanda.forum.controller;

import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.entity.Plate;
import jee.sanda.forum.service.ForumPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<Object> findByPlateId(@RequestParam("plateId") Integer plateId, @RequestParam("pageNo") Integer pageNo, @RequestParam("pageSize") Integer pageSize) {
        if (plateId == null) {
            return ResponseEntity.badRequest().body("参数错误");
        }
        return ResponseEntity.ok(forumPostService.findByPlateId(plateId, pageNo, pageSize));
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
}

