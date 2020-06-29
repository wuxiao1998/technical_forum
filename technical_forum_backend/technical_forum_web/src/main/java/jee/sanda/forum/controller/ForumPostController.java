package jee.sanda.forum.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.auth.In;
import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.entity.ForumPostDetail;
import jee.sanda.forum.entity.ForumPostReply;
import jee.sanda.forum.form.Comment;
import jee.sanda.forum.form.Reply;
import jee.sanda.forum.service.ForumPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

/***
 * 帖子接口
 */
@RestController
@RequestMapping("/forumPost")
@Api(value="帖子controller",tags={"帖子服务接口"})
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
    @ApiOperation("根据板块id分页查询帖子信息")
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
    @ApiOperation("通过帖子主表id查询帖子的所有信息")
    @GetMapping("/findPostDetails")
    public ResponseEntity<Object> findDetailByPostId(@RequestParam("postId") Long postId,
                                                  @RequestParam("pageNo") Integer pageNo,
                                                  @RequestParam("pageSize") Integer Size) {
        Page<ForumPostDetail> forumPost = forumPostService.findDetailByPostId(postId,pageNo,Size);
        return  ResponseEntity.ok(forumPost);
    }

    /***
     * 通过帖子子表查询帖子的所有评论信息(暂不使用)
     * @param postDetailId
     * @return
     */
    @ApiOperation("通过帖子子表查询帖子的所有评论信息")
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
    @ApiOperation("发布新帖")
    @PostMapping("/addPost")
    public ResponseEntity<Object> addPost(@RequestBody ForumPost forumPost) {
        Long forumPostId = forumPostService.saveForumPost(forumPost);
        HttpSession session = request.getSession();
        //保存主键id,在完成附件上传后移除
        session.setAttribute("forumPostId",forumPostId);
        return ResponseEntity.ok("success");
    }

    /**
     * 查找我的帖子
     * @param userId
     * @param pageNo
     * @param pageSize
     * @return
     */
    @ApiOperation("查找我的帖子")
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
    @ApiOperation("保存回帖信息")
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
    @ApiOperation("保存回复信息")
    @PostMapping("/reply")
    public ResponseEntity<Object>reply(@RequestBody Reply reply){
        HttpSession session=request.getSession();
        Long userId=(Long)session.getAttribute("userId");
        Long forumPostDetailId=reply.getForumPostDetailId();
        String content=reply.getContent();
        Long parentId = reply.getParentId();
        if(forumPostService.reply(userId,forumPostDetailId,content,parentId)){
            return ResponseEntity.ok("评论成功");
        }
        return ResponseEntity.badRequest().body("评论失败");
    }

    /***
     *通过帖子ID查找帖子详情
     * @param postId
     * @return
     */
    @ApiOperation("通过帖子主表id查询子表详情")
    @GetMapping("/findById")
    public ResponseEntity<Object> findById(@RequestParam("postId") Long postId){

        ForumPost forumPost = forumPostService.findById(postId);
        if(forumPost == null){
            return ResponseEntity.badRequest().body("查询失败");
        }
        return ResponseEntity.ok(forumPost);
    }

    /**
     * 通过帖子id删除帖子
     * @param postId
     * @return
     */
    @ApiOperation("通过帖子主表id级联删除帖子")
    @DeleteMapping("/deletePostById")
    public ResponseEntity<Object> deletePostById(@RequestParam("postId") Long postId){
        HttpSession session=request.getSession();
        Long userId=(Long)session.getAttribute("userId");
        if (forumPostService.deleteForumPost(userId,postId)){
            return ResponseEntity.ok("删除帖子成功");
        }
        return ResponseEntity.badRequest().body("删除失败,没有权限删除该帖子");
    }


    /**
     * 查询访问量最多的前n条帖子
     * @param plateId
     * @return
     */
    @ApiOperation("查询访问量最多的前n条帖子")
    @GetMapping("/findTopPost/{plateId}/{size}")
    public ResponseEntity<Object> findTopPost(@PathVariable("plateId") Integer plateId,
                                              @PathVariable("size") Integer size){
        List<ForumPost> forumPosts = forumPostService.findTopPost(plateId, size);
        return ResponseEntity.ok(forumPosts);
    }


    /***
     * 附件上传
     * @param file,uploadType
     * @return
     * @throws IOException
     */
    @ApiOperation("帖子附件上传")
    @PostMapping("/upload")
    public String fileUpload(MultipartFile file) throws IOException {
        HttpSession session = request.getSession();
        Long forumPostId = (Long)session.getAttribute("forumPostId");
        session.removeAttribute("forumPostId");
        if(file == null){
            //不上传附件，终止方法运行
            return "";
        }
        File upload = new File("upload");
        //获取源文件名
        String originalFilename = file.getOriginalFilename();
        //查找文件后缀名位置
        int i = originalFilename.lastIndexOf(".");
        //获取该文件前缀
        String prefix = originalFilename.substring(0,i);
        //获取后缀名
        String suffix = originalFilename.substring(i);
        if(!upload.exists()){
            upload.mkdirs();
        }
        //获取当前时间戳
        Date date = new Date();
        //拼接文件名
        StringBuffer  fileName = new StringBuffer();
        fileName.append(prefix);
        fileName.append("-");
        fileName.append(date.getTime());
        fileName.append(suffix);
        System.out.println(fileName.toString());
        //拼接文件路径
        StringBuffer path = new StringBuffer();
        path.append(upload.getAbsolutePath());
        path.append(File.separator);
        path.append(fileName);
        file.transferTo(new File(path.toString()));
        //上传成功后移除session
        forumPostService.updateFileName(fileName.toString(),forumPostId);

        return "success";
    }
}

