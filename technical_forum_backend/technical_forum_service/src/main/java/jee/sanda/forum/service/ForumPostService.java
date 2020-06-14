package jee.sanda.forum.service;

import jee.sanda.forum.entity.ForumPost;
import org.springframework.data.domain.Page;


public interface ForumPostService {
    /***
     * 分页并按板块查询对应帖子
     * @param plateId
     * @param pageNo
     * @param pageSize
     * @return
     */
    Page<ForumPost> findByPlateId(Integer plateId, Integer pageNo, Integer pageSize,String searchCondition);

    /***
     * 保存帖子信息
     * @param forumPost
     */
    void saveForumPost(ForumPost forumPost);

    /***
     * 根据帖子主表的id,查询帖子所有内容,包括回帖,评论
     * @param postId
     * @return
     */
    ForumPost findAllByPostId(Long postId);
}
