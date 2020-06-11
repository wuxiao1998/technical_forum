package jee.sanda.forum.repository;

import jee.sanda.forum.entity.ForumPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ForumPostRepository extends JpaRepository<ForumPost, Long>, JpaSpecificationExecutor<ForumPost> {
    //根据板块查找帖子
    List<ForumPost> findByPlateId(Integer plateId);
}
