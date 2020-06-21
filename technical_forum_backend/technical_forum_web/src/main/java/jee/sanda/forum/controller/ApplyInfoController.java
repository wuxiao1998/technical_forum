package jee.sanda.forum.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jee.sanda.forum.form.Email;
import jee.sanda.forum.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;

/***
 * 管理员消息接口
 */
@RestController
@RequestMapping("/applyInfo")
@Api(value="管理员消息controller",tags={"管理员消息服务接口"})
public class ApplyInfoController {



}

