package jee.sanda.forum.service.impl;

import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.repository.ForumPostRepository;
import jee.sanda.forum.service.ForumPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import javax.persistence.criteria.*;
import java.util.Optional;


@Service
@Transactional
public class ForumPostServiceImpl implements ForumPostService {

    @Autowired
    private ForumPostRepository forumPostRepository;

    @Override
    public Page<ForumPost> findByPlateId(Integer plateId, Integer pageNo, Integer pageSize,String searchCondition) {

        Specification<ForumPost> spec = new Specification<ForumPost>() {
                @Override
                public Predicate toPredicate(Root<ForumPost> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                    //获取实体类属性
                    Path<Object> plate = root.get("plateId");
                    Path<Object> title = root.get("title");
                    //where条件设置
                    Predicate p1 = criteriaBuilder.equal(plate, plateId);
                    if(!StringUtils.isEmpty(searchCondition)){
                        Predicate p2 = criteriaBuilder.like(title.as(String.class), '%' + searchCondition + '%');
                        return criteriaBuilder.and(p1,p2);
                    }
                    return p1;
                }
        };
        //增加排序字段
        Sort sortKey = Sort.by(Sort.Direction.DESC, "createtime");
        //分页参数设置
        Pageable pageable =  PageRequest.of(pageNo - 1, pageSize, sortKey);
        Page<ForumPost> forumPosts = forumPostRepository.findAll(spec, pageable);
        return forumPosts;
    }

    @Override
    public void saveForumPost(ForumPost forumPost) {
        forumPostRepository.save(forumPost);
    }

    @Override
    public ForumPost findAllByPostId(Long postId) {
        Optional<ForumPost> optionalForumPost = forumPostRepository.findById(postId);
        if(!optionalForumPost.isPresent()){
            return null;
        }
        ForumPost forumPost = optionalForumPost.get();
        return forumPost;
    }

    @Override
    public Page<ForumPost> findByUserId(Long userId, Integer pageNo, Integer pageSize) {
        Specification<ForumPost> spec = new Specification<ForumPost>() {
            @Override
            public Predicate toPredicate(Root<ForumPost> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                //获取实体类属性
                Path<Object> user = root.get("user");
                //where条件设置
                Predicate p1 = criteriaBuilder.equal(user, userId);
                return p1;
            }
        };
        Sort sortKey = Sort.by(Sort.Direction.DESC, "createtime");
        //分页参数设置
        Pageable pageable =  PageRequest.of(pageNo - 1, pageSize, sortKey);
        Page<ForumPost> forumPosts = forumPostRepository.findAll(spec, pageable);
        return forumPosts;
    }

    @Override
    public boolean comment(Long userId, Long forumPostId, String content) {
        if(forumPostRepository.insertForum_Post_detail(userId,forumPostId,content)>0)
        {
            return true;
        }
        return false;
    }

    @Override
    public boolean reply(Long userId, Long forumPostDetailId, String content) {
        if(forumPostRepository.insertForum_Post_reply(userId,forumPostDetailId,content)>0)
        {
            return true;
        }
        return false;
    }
}
