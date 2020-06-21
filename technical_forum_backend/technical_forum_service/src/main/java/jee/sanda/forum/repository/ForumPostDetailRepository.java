package jee.sanda.forum.repository;

import jee.sanda.forum.entity.ForumPostDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


public interface ForumPostDetailRepository extends JpaRepository<ForumPostDetail, Long>, JpaSpecificationExecutor<ForumPostDetail> {
    //分页查询所有回帖信息
    @Query(value = "SELECT * FROM forum_post_detail WHERE forum_post_id = ?1",
            countQuery = "SELECT count(*) FROM forum_post_detail WHERE forum_post_id = ?1",
            nativeQuery = true)
    Page<ForumPostDetail> findByPostId(Long PostId, Pageable pageable);

    //计算回帖数量
    @Query(value="SELECT count(*) FROM forum_post_detail WHERE forum_post_id=?1",nativeQuery = true)
    Long countByPostId(Long PostId);

    @Query(value="DELETE FROM forum_post_detail WHERE forum_post_id=?1",nativeQuery = true)
    @Modifying
    void deleteByPostId(Long forumPostId);

    //保存用户的回帖信息
    @Query(value="insert into forum_post_detail(createby,forum_post_id,content) values(?1,?2,?3)",nativeQuery=true)
    @Modifying
    int insertForum_Post_detail(Long userId,Long forumPostId,String Content);
    //通过回帖id查找回帖人
    @Query(value = "select createby from forum_post_detail where id=?1",nativeQuery = true)
    Long findUserIdByPostDetailId(Long postDetailId);
    //通过回帖id查找帖子id
    @Query(value = "select forum_post_id from forum_post_detail where id=?1",nativeQuery = true)
    Long findPostIdIdByPostDetailId(Long postDetailId);
}
