package jee.sanda.forum.service;


import jee.sanda.forum.entity.User;
import jee.sanda.forum.form.UpdateUserForm;

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
    Long register(User user);


    /***
     * 修改状态,激活用户
     * @param userId
     */
    void updateStatus(Long userId);

    /***
     * 检查用户名是否重名
     * @param username
     */
    boolean checkUserName(String username);

    /**
     * 更新用户信息
     *
     * @param userId
     * @param updateUserForm
     * @return
     */
    boolean updateUser(Long userId, UpdateUserForm updateUserForm);

    /***
     * 更改密码
     * @param userId
     * @param password
     * @return
     */
    boolean updatePassword(Long userId, String password);

    /***
     * 初始化用户bean
     * @param user
     */
    void initializeUser(User user);

    /**
     * 检查密码
     *
     * @param userId
     * @param password
     * @return
     */
    boolean checkPassword(Long userId, String password);
}
