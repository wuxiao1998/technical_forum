package jee.sanda.forum.service;

import jee.sanda.forum.entity.ApplyInfo;
import jee.sanda.forum.entity.UserPlate;
import org.springframework.data.domain.Page;

public interface ApplyInfoService {
    /**
     * 保存申请
     * @param applyInfo
     */
    void saveApplyInfo(ApplyInfo applyInfo);

    /**
     * 显示申请
     * @return
     */
    Page<ApplyInfo> showApplyInfo(Integer pageNo, Integer pageSize);

    /**
     * 授权用户为版主
     * @param userPlate
     * @return
     */
    boolean grantModeratorToUser(UserPlate userPlate);

    /**
     * 将申请状态改为已处理
     * @param applyId
     */
   void changeStatusToProcessed(Long applyId);
}
