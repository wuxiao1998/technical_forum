package jee.sanda.forum.service;


import jee.sanda.forum.entity.User;

public interface UserService {
    /***
     * 登录
     * @return
     */
    User login(String username, String password);

    /***
     *  注册
     * @return
     */
    void register(User user);

    void sendEmail(String email);
}
