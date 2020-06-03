package jee.sanda.forum.controller;

import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.entity.Plate;
import jee.sanda.forum.service.ForumPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/forumPost")
public class ForumPostController {

    @Autowired
    private ForumPostService forumPostService;
    @GetMapping("/findByPlateId")
    public ResponseEntity<Object> findByPlateId(@RequestParam Integer id){
        if(id == null)
        {
            return ResponseEntity.badRequest().body("参数错误");
        }
        return ResponseEntity.ok(forumPostService.findByPlateId(id));
    }
}
