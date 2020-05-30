package jee.sanda.forum.repository;


import jee.sanda.forum.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface UserRepository extends JpaRepository<User,Long>, JpaSpecificationExecutor<User> {

   User findByUsernameAndPassword(String username, String password);
}
