package jee.sanda.forum.controller;

import jee.sanda.forum.entity.Notice;
import jee.sanda.forum.entity.User;
import jee.sanda.forum.service.NoticeService;
import jee.sanda.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/notice")
public class NoticeController {
    @Autowired
    private NoticeService noticeService;
    @Autowired
    private UserService userService;
    @Autowired
    private HttpServletRequest request;

    /**
     * 创建公告
     * @param notice
     * @return
     */
    @PostMapping("/create")
    public ResponseEntity<Object> createNotice(Notice notice){
        HttpSession session=request.getSession();
        Long userId=(Long) session.getAttribute("userId");
        if (noticeService.createNotice(userId,notice)){
            return ResponseEntity.ok("创建公告成功");
        }
        return ResponseEntity.badRequest().body("创建公告失败");
    }

    /**
     * 修改公告
     * @param notice
     * @return
     */
    @PostMapping("/update")
    public ResponseEntity<Object> updateNotice(Notice notice){
        HttpSession session=request.getSession();
        Long userId=(Long) session.getAttribute("userId");
        if (noticeService.createNotice(userId,notice)){
            return ResponseEntity.ok("修改公告成功");
        }
        return ResponseEntity.badRequest().body("修改公告失败");
    }

    /**
     * 删除公告
     * @param noticeId
     * @return
     */
    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteNotice(Integer noticeId){
        if (noticeService.deleteNotice(noticeId))
        {
            return ResponseEntity.ok("删除公告成功");
        }
        return ResponseEntity.badRequest().body("删除公告失败");
    }

    /**
     * 管理员查询公告
     * @param pageNo
     * @param pageSize
     * @return
     */
    @GetMapping("/searchByAdmin")
    public ResponseEntity<Object> searchByAdmin(@RequestParam("pageNo") Integer pageNo,@RequestParam("pageSize") Integer pageSize){
        Page<Notice> notices=noticeService.searchNoticeByAdmin(pageNo,pageSize);
        return ResponseEntity.ok(notices);
    }

    /**
     * 用户查询公告
     * @param pageNo
     * @param pageSize
     * @return
     */
    public ResponseEntity<Object> searchByUser(@RequestParam("plateId") Integer plateId,@RequestParam("pageNo") Integer pageNo,@RequestParam("pageSize") Integer pageSize){
        if (plateId==null){
            return ResponseEntity.badRequest().body("plateId");
        }
        Page<Notice> notices=noticeService.searchNoticeByUser(plateId,pageNo,pageSize);
        return ResponseEntity.ok(notices);
    }
}