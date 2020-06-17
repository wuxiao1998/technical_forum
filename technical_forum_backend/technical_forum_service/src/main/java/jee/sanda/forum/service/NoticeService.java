package jee.sanda.forum.service;

import jee.sanda.forum.entity.Notice;
import org.springframework.data.domain.Page;

public interface NoticeService {
    /**
     * 创建公告
     * @param notice
     * @return
     */
    boolean createNotice(Long userId,Notice notice);

    /**
     * 更新公告
     * @param notice
     * @return
     */
    boolean updateNotice(Long userId,Notice notice);

    /**
     * 删除公告
     * @param noticeId
     * @return
     */
    boolean deleteNotice(Integer noticeId);

    /**
     * 管理员查询公告
     * @param pageNo
     * @param pageSize
     * @return
     */
    Page<Notice> searchNoticeByAdmin(Integer pageNo, Integer pageSize);

    /**
     * 用户查询公告
     * @param plateId
     * @param pageNo
     * @param pageSize
     * @return
     */
    Page<Notice> searchNoticeByUser(Integer plateId,Integer pageNo, Integer pageSize);
}
