package jee.sanda.forum.repository;

import jee.sanda.forum.entity.ForumPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ForumPostRepository extends JpaRepository<ForumPost,Long>, JpaSpecificationExecutor<ForumPost> {
    List<ForumPost> findByPlateId(Integer plateId);
}
