package jee.sanda.forum.repository;

import jee.sanda.forum.entity.UserPlate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface UserPlateRepository extends JpaRepository<UserPlate,Integer>, JpaSpecificationExecutor<UserPlate> {
    /**
     * 通过用户id和板块id查找是否存在
     * @param userId
     * @param plateId
     * @return
     */
    @Query(value = "select id from user_plate where user_id=?1 and plate_id=?2",nativeQuery = true)
    Integer findByUserIdAndPlateId(Long userId,Integer plateId);
}
