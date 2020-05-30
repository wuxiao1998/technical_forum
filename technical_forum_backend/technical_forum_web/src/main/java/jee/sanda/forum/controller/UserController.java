package jee.sanda.forum.controller;


import jee.sanda.forum.entity.User;
import jee.sanda.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
//test
    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> login(@RequestBody User user, HttpServletRequest request){
        User loginUser = userService.login(user.getUsername(), user.getPassword());
        Map<String,Object> response = new HashMap<>();
        if(loginUser == null){
           response.put("message","用户名或密码错误");
        }else{
            response.put("user",loginUser);
            HttpSession session = request.getSession();
            session.setAttribute("userId",loginUser.getId());
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user){
        userService.register(user);
        return  ResponseEntity.ok("注册成功");
    }


    

}
