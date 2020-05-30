package jee.sanda.forum.repository;


import jee.sanda.forum.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User,Long>, JpaSpecificationExecutor<User> {

   User findByUsernameAndPassword(String username, String password);

   @Modifying
   @Query(value = "insert into user(username,password,email,phone,gender)" +
           " values(:#{#user.username},:#{#user.password},:#{#user.email},:#{#user.phone},:#{#user.gender})",nativeQuery = true)
   void saveUser(@Param("user") User user);
}
