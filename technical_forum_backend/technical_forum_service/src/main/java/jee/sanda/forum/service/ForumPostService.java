package jee.sanda.forum.service;

import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.entity.Plate;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ForumPostService {
    /***
     * 分页并按板块查询对应帖子
     * @param plateId
     * @param pageNo
     * @param pageSize
     * @return
     */
    Page<ForumPost> findByPlateId(Integer plateId, Integer pageNo, Integer pageSize);

    /***
     * 保存帖子信息
     * @param forumPost
     */
    void saveForumPost(ForumPost forumPost);
}
