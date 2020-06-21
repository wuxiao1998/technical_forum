package jee.sanda.forum.repository;

import jee.sanda.forum.entity.DetailComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DetailCommentRepository extends JpaRepository<DetailComment,Long>, JpaSpecificationExecutor<DetailComment> {

}
