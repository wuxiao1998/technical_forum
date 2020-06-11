package jee.sanda.forum.service.impl;

import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.repository.ForumPostRepository;
import jee.sanda.forum.service.ForumPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import java.util.List;

@Service
@Transactional
public class ForumPostServiceImpl implements ForumPostService {

    @Autowired
    private ForumPostRepository forumPostRepository;

    @Override
    public Page<ForumPost> findByPlateId(Integer plateId, Integer pageNo, Integer pageSize) {

        Specification<ForumPost> spec = new Specification<ForumPost>() {
            @Override
            public Predicate toPredicate(Root<ForumPost> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                Path<Object> plate = root.get("plateId");
                Predicate p1 = criteriaBuilder.equal(plate, plateId);
                return p1;
            }
        };
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<ForumPost> forumPosts = forumPostRepository.findAll(spec, pageable);
        return forumPosts;
    }

    @Override
    public void saveForumPost(ForumPost forumPost) {
        forumPostRepository.save(forumPost);
    }
}
