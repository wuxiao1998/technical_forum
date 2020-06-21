package jee.sanda.forum.service;

import jee.sanda.forum.entity.ApplyInfo;
import org.springframework.data.domain.Page;

public interface ApplyInfoService {
    /**
     * 保存申请/举报
     * @param applyInfo
     */
    void saveApplyInfo(ApplyInfo applyInfo);

    /**
     * 显示申请/举报
     * @return
     */
    Page<ApplyInfo> showApplyInfo(Integer pageNo, Integer pageSize);
}
