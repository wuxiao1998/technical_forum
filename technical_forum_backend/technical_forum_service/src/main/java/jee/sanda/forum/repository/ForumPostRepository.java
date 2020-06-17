package jee.sanda.forum.repository;

import jee.sanda.forum.entity.ForumPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ForumPostRepository extends JpaRepository<ForumPost, Long>, JpaSpecificationExecutor<ForumPost> {
    //根据板块查找帖子
    List<ForumPost> findByPlateId(Integer plateId);

    //保存用户的回帖信息
    @Query(value="insert into forum_post_detail(createby,forum_post_id,content) values(?1,?2,?3)",nativeQuery=true)
    @Modifying
    int insertForum_Post_detail(Long userId,Long forumPostId,String Content);

    //保存用户的评论信息
    @Query(value="insert into forum_post_reply(createby,forum_post_detail_id,content) values(?1,?2,?3)",nativeQuery=true)
    @Modifying
    int insertForum_Post_reply(Long userId,Long forumPostDetailId,String Content);

    //帖子浏览量+1
    @Query(value="update forum_post set count=count+1 where id=?1",nativeQuery=true)
    @Modifying
    int updateForum_Post_Count(Long postId);
}
