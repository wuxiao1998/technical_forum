package jee.sanda.forum.repository;

import jee.sanda.forum.em.ApplyStatusEnum;
import jee.sanda.forum.entity.ApplyInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ApplyInfoRepository  extends JpaRepository<ApplyInfo,Integer>, JpaSpecificationExecutor<ApplyInfo> {
    /**
     * 将申请状态改为已处理
     * @param applyId
     */
    @Query(value = "update management_apply set status=1 where id=?1",nativeQuery = true)
    @Modifying
    void changeStatusToAccept(Long applyId);


    /**
     * 将申请状态改为已处理
     * @param applyId
     */
    @Query(value = "update management_apply set status=2 where id=?1",nativeQuery = true)
    @Modifying
    void changeStatusToReject(Long applyId);
}
