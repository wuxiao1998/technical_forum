package jee.sanda.forum.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jee.sanda.forum.entity.ApplyInfo;
import jee.sanda.forum.form.Email;
import jee.sanda.forum.service.ApplyInfoService;
import jee.sanda.forum.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

    /**
     * 提交申请/举报
     * @param applyInfo
     * @return
     */
    @ApiOperation("提交申请/举报")
    @PostMapping("/saveApplyInfo")
    public ResponseEntity<Object> saveApplyInfo(@RequestBody ApplyInfo applyInfo){
        applyInfoService.saveApplyInfo(applyInfo);
        return ResponseEntity.ok("success");
    }

    /**
     * 显示所有申请/举报
     * @param pageNo
     * @param pageSize
     * @return
     */
    @ApiOperation("显示所有申请/举报")
    @GetMapping("/showApplyInfo")
    public ResponseEntity<Object> showApplyInfo(@RequestParam("pageNo") Integer pageNo, @RequestParam("pageSize") Integer pageSize){
        Page<ApplyInfo>applyInfos=applyInfoService.showApplyInfo(pageNo,pageSize);
        return ResponseEntity.ok(applyInfos);
    }
}

