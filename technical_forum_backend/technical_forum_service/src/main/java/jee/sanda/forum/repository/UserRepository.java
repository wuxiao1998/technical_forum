package jee.sanda.forum.repository;


import jee.sanda.forum.em.RoleEnum;
import jee.sanda.forum.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    /***
     * 登录验证
     * @param username
     * @param password
     * @return
     */
    User findByUsernameAndPassword(String username, String password);

    /**
     * 用户名查重
     *
     * @param userName
     * @return
     */
    User findByUsername(String userName);

    /***
     * 修改用户状态为已激活
     * @param userId
     */
    @Modifying
    @Query("update User  set status = 1 where id = ?1")
    void updateStatus(Long userId);

    /**
     * 更新称号
     * @param experience,level,designation
     * @param
     */
    @Query(value = "update User set experience=?1,level=?2,designation=?3 where id=?4",nativeQuery = true)
    @Modifying
    void updateExperienceAndLevelAndDesignation(Integer experience,Integer level,String designation,Long userId);


//    /**
//     * 增加经验值
//     * @param increment
//     * @param userId
//     */
//    @Query(value = "update User set experience=experience+?1 where id=?2",nativeQuery = true)
//    @Modifying
//    void updateExprience(Integer increment,Long userId);
//
//    /**
//     * 查询经验值
//     * @param userId
//     */
//    @Query(value = "select experience from User where id=?1",nativeQuery = true)
//    Integer searchExprience(Long userId);
//
//    /**
//     * 更新等级
//     * @param level
//     * @param userId
//     * @return
//     */
//    @Query(value = "update User set level=?1 where id=?2",nativeQuery = true)
//    @Modifying
//    int updateLevel(Integer level,Long userId);
    /**
     * 通过id查找昵称
     * @param userId
     * @return
     */
    @Query(value ="select nickname from user where id=?1",nativeQuery = true)
    String findNickNameById(Long userId);

    /**
     * 通过用户名查找邮箱
     * @param userName
     * @return
     */
    @Query(value = "select email from user where username=?1",nativeQuery = true)
    String findEmailByUserName(String userName);

    /**
     * 通过用户名查找用户id
     * @param userName
     * @return
     */
    @Query(value = "select id from user where username=?1",nativeQuery = true)
    Long findIdByUserName(String userName);

    /**
     * 将用户角色设为版主
     * @param userId
     */
    @Query(value = "update user set role=1 where id=?1",nativeQuery = true)
    @Modifying
    void changeRoleToModerator(Long userId);
}
