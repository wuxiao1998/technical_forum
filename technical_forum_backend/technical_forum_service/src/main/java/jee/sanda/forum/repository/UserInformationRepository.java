package jee.sanda.forum.repository;

import jee.sanda.forum.entity.UserInformation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserInformationRepository extends JpaRepository<UserInformation,Long>,JpaSpecificationExecutor<UserInformation> {
    //查询与用户相关的所有消息
    @Query(value = "select * from user_information where userid=?1",nativeQuery = true)
    Page<UserInformation> searchUnreadInformation(Long userId, Pageable pageable);
    //将消息状态改为已读
    @Query(value = "update user_information set status=0 where id=?1",nativeQuery = true)
    @Modifying
    int changeStatus(Long informationId);
}
