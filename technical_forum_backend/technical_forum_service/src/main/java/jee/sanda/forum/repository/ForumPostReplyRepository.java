package jee.sanda.forum.repository;

import jee.sanda.forum.entity.ForumPostDetail;
import jee.sanda.forum.entity.ForumPostReply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;



public interface ForumPostReplyRepository extends JpaRepository<ForumPostReply, Long>, JpaSpecificationExecutor<ForumPostReply> {
    @Query(value = "SELECT * FROM forum_post_reply WHERE forum_post_detail_id = ?1",
            countQuery = "SELECT count(*) FROM forum_post_reply WHERE forum_post_detail_id = ?1",
            nativeQuery = true)
    Page<ForumPostReply> findByPostDetailId(Long postDetailId, Pageable pageable);

    //保存用户的评论信息
    @Query(value = "insert into forum_post_reply(createby,forum_post_detail_id,content,parent_id) values(?1,?2,?3,?4)", nativeQuery = true)
    @Modifying
    int insertForum_Post_reply(Long userId, Long forumPostDetailId, String Content, Long parentId);

}
