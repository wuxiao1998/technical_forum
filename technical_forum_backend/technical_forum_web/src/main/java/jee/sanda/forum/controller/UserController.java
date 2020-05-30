package jee.sanda.forum.controller;


import jee.sanda.forum.entity.User;
import jee.sanda.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/***
 * 用户接口
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> login(@RequestBody User user){
        User loginUser = userService.login(user.getUsername(), user.getPassword());
        Map<String,Object> response = new HashMap<>();
        if(loginUser == null){
           response.put("message","用户名或密码错误");
        }else{
            response.put("user",loginUser);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public String register(@RequestBody User user){
        userService.register(user);
        return "注册成功!!!";
    }
    
    @PostMapping("/sendCode")
    public String sendCode(@RequestBody Map<String,String> email){
        userService.sendEmail(email.get("email"));
        return "success";
    }
}
