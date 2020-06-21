package jee.sanda.forum.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jee.sanda.forum.entity.UserInformation;
import jee.sanda.forum.service.InformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/***
 * 邮件服务接口
 */
@RestController
@RequestMapping("/information")
@Api(value="消息提醒controller",tags={"消息提醒接口"})
public class InformationController {
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private InformationService informationService;

    /**
     * 根据用户id查看消息
     * @param pageNo
     * @param pageSize
     * @return
     */
    @ApiOperation("根据用户id查看消息")
    @GetMapping("/searchInformation")
    public ResponseEntity<Object> searchInformation(@RequestParam("pageNo") Integer pageNo,@RequestParam("pageSize") Integer pageSize)
    {
        HttpSession session=request.getSession();
        Long userId=(Long)session.getAttribute("userId");
        Page<UserInformation>userInformations=informationService.searchInformation(userId,pageNo,pageSize);
        return ResponseEntity.ok(userInformations);
    }

    /**
     * 将消息状态从未读改为已读
     * @param informationId
     * @return
     */
    @ApiOperation("将消息状态从未读改为已读")
    @GetMapping("/changeInformationStatus")
    public ResponseEntity<Object> changeInformationStatus(Long informationId){
        informationService.changeStatus(informationId);
        return ResponseEntity.ok("已读消息");
    }

    /**
     * 返回未读消息数量
     * @return
     */
    @ApiOperation("返回未读消息数量")
    @GetMapping("/unreadInformationQuantity")
    public ResponseEntity<Object> unreadInformationQuantity(){
        HttpSession session=request.getSession();
        Long userId=(Long)session.getAttribute("userId");
        int quantity=informationService.countUnreadInformationQuantity(userId);
        return ResponseEntity.ok(quantity);
    }

    /**
     * 删除消息
     * @param infoId
     * @return
     */
    @ApiOperation("删除消息")
    @GetMapping("/deleteInformation")
    public ResponseEntity<Object> deleteInformation(@RequestParam("infoId") Long infoId){
        if (informationService.deleteInformation(infoId)){
            return ResponseEntity.ok("删除成功");
        }
        return ResponseEntity.badRequest().body("删除失败");
    }
}
