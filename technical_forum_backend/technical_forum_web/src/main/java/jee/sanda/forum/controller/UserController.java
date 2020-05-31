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

    /***
     * 用户登录接口
     * @param user
     * @param request
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody User user, HttpServletRequest request){
        User loginUser = userService.login(user.getUsername(), user.getPassword());
        if(loginUser == null){
           return ResponseEntity.ok("用户名或密码错误");
        }else{
            HttpSession session = request.getSession();
            //将userId存入session域
            session.setAttribute("userId",loginUser.getId());
            return ResponseEntity.ok(loginUser);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user,HttpServletRequest request){
        Long userId = userService.register(user);
        HttpSession session = request.getSession();
        //注册成功,返回自增主键将userId存入session域
        session.setAttribute("userId",userId);
        return  ResponseEntity.ok("注册成功");
    }


    

}
