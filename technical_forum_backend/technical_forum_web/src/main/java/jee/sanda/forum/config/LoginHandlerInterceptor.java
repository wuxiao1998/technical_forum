package jee.sanda.forum.config;


import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Component
public class LoginHandlerInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
       response.setContentType("application/json;charset=utf-8");
        HttpSession session = request.getSession();
        Long userId = (Long)session.getAttribute("userId");
        if(userId == null) {
             response.setStatus(401);
             response.getWriter().print("未登录或登录失效,请重新登录");
            return false;
        }else{
            return true;
        }
    }














}
