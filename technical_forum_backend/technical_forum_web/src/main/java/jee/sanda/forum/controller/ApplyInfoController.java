package jee.sanda.forum.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jee.sanda.forum.em.ApplyStatusEnum;
import jee.sanda.forum.entity.ApplyInfo;
import jee.sanda.forum.entity.User;
import jee.sanda.forum.entity.UserPlate;
import jee.sanda.forum.form.Email;
import jee.sanda.forum.service.ApplyInfoService;
import jee.sanda.forum.service.MailService;
import jee.sanda.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.concurrent.TimeUnit;

/***
 * 管理员消息接口
 */
@RestController
@RequestMapping("/applyInfo")
@Api(value="管理员消息controller",tags={"管理员消息服务接口"})
public class ApplyInfoController {
    @Autowired
    private ApplyInfoService applyInfoService;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private UserService userService;

    /**
     * 提交申请
     * @param applyInfo
     * @return
     */
    @ApiOperation("提交申请")
    @PostMapping("/saveApplyInfo")
    public ResponseEntity<Object> saveApplyInfo(@RequestBody ApplyInfo applyInfo){
        HttpSession session = request.getSession();
        Long userId = (Long)session.getAttribute("userId");
        boolean checkResult = userService.checkLevel(userId);
        if(checkResult){
        User user = new User();
        user.setId(userId);
        //获取当前登录用户
        applyInfo.setApplyUser(user);
        applyInfoService.saveApplyInfo(applyInfo);
        return ResponseEntity.ok("success");
        }else{
            return  ResponseEntity.badRequest().body("抱歉,申请版主的功能只对7级及以上的玩家开放");
        }
    }

    /**
     * 显示所有申请
     * @param pageNo
     * @param pageSize
     * @return
     */
    @ApiOperation("显示所有申请")
    @GetMapping("/showApplyInfo")
    public ResponseEntity<Object> showApplyInfo(@RequestParam("pageNo") Integer pageNo, @RequestParam("pageSize") Integer pageSize){
        Page<ApplyInfo>applyInfos=applyInfoService.showApplyInfo(pageNo,pageSize);
        return ResponseEntity.ok(applyInfos);
    }

    /**
     * 授权用户成为版主
     * @param userPlate
     * @return
     */
    @ApiOperation("授权用户成为版主")
    @PostMapping("/grantModeratorToUser/{applyId}")
    public ResponseEntity<Object> grantModeratorToUser(@PathVariable Long applyId,@RequestBody UserPlate userPlate){
        if(applyInfoService.grantModeratorToUser(userPlate,applyId)){
            return ResponseEntity.ok("授权成功");
        }
        return ResponseEntity.badRequest().body("授权失败");
    }

    /**
     * 将申请状态改为已处理
     * @param
     * @return
     */
    @ApiOperation("将申请状态改为已处理")
    @PostMapping("/rejectApply")
    public ResponseEntity<Object> changeApplyStatusToProcessed(@RequestBody ApplyInfo applyInfo){
        applyInfoService.rejectApply(applyInfo);
        return ResponseEntity.ok("success");
    }
}

