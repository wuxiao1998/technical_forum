package jee.sanda.forum.repository;


import jee.sanda.forum.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User,Long>, JpaSpecificationExecutor<User> {

   /***
    * 登录验证
    * @param username
    * @param password
    * @return
    */
   User findByUsernameAndPassword(String username, String password);

   /***
    * 修改用户状态为已激活
    * @param userId
    */
   @Modifying
   @Query("update User  set status = 1 where id = ?1")
   void updateStatus(Long userId);
}
