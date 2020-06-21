package jee.sanda.forum.service;

import jee.sanda.forum.em.InfoKindEnum;
import jee.sanda.forum.entity.UserInformation;
import org.springframework.data.domain.Page;

public interface InformationService {
    /**
     * 查询用户相关消息
     * @param userId
     * @param pageNo
     * @param pageSize
     * @return
     */
    Page<UserInformation> searchInformation(Long userId,Integer pageNo, Integer pageSize);

    /**
     * 修改消息状态为已读
     * @param informationId
     * @return
     */
    boolean changeStatus(Long informationId);

    /**
     * 创建未读消息
     * @param userId
     * @param content
     * @param kind
     * @return
     */
    boolean createInformation(Long userId, String content, InfoKindEnum kind,Long forumPostId);
}
