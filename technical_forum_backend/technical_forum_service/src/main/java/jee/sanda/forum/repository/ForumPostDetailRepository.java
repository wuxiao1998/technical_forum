package jee.sanda.forum.repository;

import jee.sanda.forum.entity.ForumPostDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;


public interface ForumPostDetailRepository extends JpaRepository<ForumPostDetail, Long>, JpaSpecificationExecutor<ForumPostDetail> {
    //分页查询所有回帖信息
    @Query(value = "SELECT * FROM forum_post_detail WHERE forum_post_id = ?1",
            countQuery = "SELECT count(*) FROM forum_post_detail WHERE forum_post_id = ?1",
            nativeQuery = true)
    Page<ForumPostDetail> findByPostId(Long PostId, Pageable pageable);


}
