package jee.sanda.forum.service;


import jee.sanda.forum.entity.User;
import jee.sanda.forum.form.UpdateUserForm;
import org.springframework.data.domain.Page;

import java.util.List;

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


    /**
     * 查找目前登录用户的id
     * @param id
     * @return
     */
    User findById(Long id);


    /***
     * 更改用户经验、等级、称号
     */
    void updateLevelAndExperienceAndDesignation(Long userId,Integer increment);

    /**
     * 查询所有用户
     * @return
     */
    Page<User> findAll(Integer pageNo, Integer pageSize);

    /**
     * 封禁用户
     * @param userId
     * @return
     */
    boolean banUser(Long userId);

    /**
     * 检查用户状态
     * @param user
     * @return
     */
    boolean checkStatus(User user);

    /**
     * 通过用户名查找邮箱
     * @param userName
     * @return
     */
    String findEmailByUserName(String userName);

    /**
     * 通过用户名查找用户id
     * @param userName
     * @return
     */
    Long findUserIdByUserName(String userName);
}
