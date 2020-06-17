package jee.sanda.forum.service;

import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.entity.ForumPostDetail;
import jee.sanda.forum.entity.ForumPostReply;
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
     * 根据帖子主表的id,分页查询帖子详情
     * @param postId
     * @return
     */
    Page<ForumPostDetail> findDetailByPostId(Long postId,Integer pageNo,Integer PageSize);

    /**
     * 根据userId查询所有帖子
     * @param userId
     * @param pageNo
     * @param pageSize
     * @return
     */
    Page<ForumPost>findByUserId(Long userId, Integer pageNo, Integer pageSize);

    /**
     * 回帖功能
     * @param userId
     * @param forumPostId
     * @param content
     * @return
     */
    boolean comment(Long userId,Long forumPostId,String content);

    /**
     * 评论功能
     * @param userId
     * @param forumPostDetailId
     * @param content
     * @return
     */
    boolean reply(Long userId,Long forumPostDetailId,String content);


    /***
     * 根据帖子表主键id查找帖子楼主信息
     * @param postId
     * @return
     */
    ForumPost findById(Long postId);


    /***
     * 分页查询所有回复信息
     * @param postDetailId
     * @param pageNo
     * @param PageSize
     * @return
     */
    Page<ForumPostReply> findReplyByPostDetailId(Long postDetailId, Integer pageNo, Integer PageSize);

    /**
     * 计算回帖数量
     * @param forumPostId
     * @return
     */
    Long countCommentQuantity(Long forumPostId);
}
