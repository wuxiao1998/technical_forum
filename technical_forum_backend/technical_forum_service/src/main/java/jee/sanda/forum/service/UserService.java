package jee.sanda.forum.service;


import jee.sanda.forum.entity.User;

public interface UserService {
    /***
     * 用户登录
     * @param username
     * @param password
     * @return
     */
    User login(String username, String password);

    /***
     * 用户注册
     * @param user
     * @return
     */
    void register(User user);


    /***
     * 修改状态,激活用户
     * @param userId
     */
    void updateStatus(Long userId);


}
