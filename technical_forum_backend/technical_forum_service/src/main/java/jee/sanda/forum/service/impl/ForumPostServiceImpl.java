package jee.sanda.forum.service.impl;
import jee.sanda.forum.em.InfoKindEnum;
import jee.sanda.forum.em.RoleEnum;
import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.entity.ForumPostDetail;
import jee.sanda.forum.entity.ForumPostReply;
import jee.sanda.forum.entity.User;
import jee.sanda.forum.repository.ForumPostDetailRepository;
import jee.sanda.forum.repository.ForumPostReplyRepository;
import jee.sanda.forum.repository.ForumPostRepository;
import jee.sanda.forum.repository.UserRepository;
import jee.sanda.forum.service.ForumPostService;
import jee.sanda.forum.service.InformationService;
import jee.sanda.forum.service.UserService;
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
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class ForumPostServiceImpl implements ForumPostService {

    @Autowired
    private ForumPostRepository forumPostRepository;

    @Autowired
    private ForumPostDetailRepository forumPostDetailRepository;

    @Autowired
    private ForumPostReplyRepository forumPostReplyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private InformationService informationService;

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
        forumPosts.getContent().forEach(item->{
            Long postId=item.getId();
            Long quantity=countCommentQuantity(postId);
            item.setCommentQuantity(quantity);
        });
        return forumPosts;
}

    @Override
    public void saveForumPost(ForumPost forumPost) {
        forumPostRepository.save(forumPost);
        User user = forumPost.getUser();
        Long userId = user.getId();
        userService.updateLevelAndExperienceAndDesignation(userId, 10);
    }
    @Override
    public Page<ForumPostDetail> findDetailByPostId(Long postId,Integer pageNo,Integer pageSize) {
        Sort sortKey = Sort.by(Sort.Direction.ASC, "createtime");
        Pageable pageable =  PageRequest.of(pageNo - 1, pageSize, sortKey);

        Page<ForumPostDetail> pages = forumPostDetailRepository.findByPostId(postId, pageable);
        return pages;
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
        if(forumPostDetailRepository.insertForum_Post_detail(userId,forumPostId,content)>0)
        {
            userService.updateLevelAndExperienceAndDesignation(userId, 5);
            String nickname=userRepository.findNickNameById(userId);
            String title=forumPostRepository.findTitleById(forumPostId);
            String content1=nickname+"在\""+title+"\"这篇帖子中评论了你";
            Long uId=forumPostRepository.findUserIdByPostId(forumPostId);
            informationService.createInformation(uId,content1, InfoKindEnum.帖子消息,forumPostId);
            return true;
        }
        return false;
    }

    @Override
    public boolean reply(Long userId, Long forumPostDetailId, String content) {
        if(forumPostReplyRepository.insertForum_Post_reply(userId,forumPostDetailId,content)>0)
        {
            userService.updateLevelAndExperienceAndDesignation(userId, 3);
            String nickname=userRepository.findNickNameById(userId);
            String content1=nickname+"对你的\""+content+"\"这段回帖进行了评论";
            Long uId=forumPostDetailRepository.findUserIdByPostDetailId(forumPostDetailId);
            Long postId=forumPostDetailRepository.findPostIdIdByPostDetailId(forumPostDetailId);
            informationService.createInformation(uId,content1, InfoKindEnum.帖子消息,postId);
            return true;
        }
        return false;
    }

    @Override
    public ForumPost findById(Long postId) {
        forumPostRepository.updateForum_Post_Count(postId);
        Optional<ForumPost> forumPost = forumPostRepository.findById(postId);
        if(!forumPost.isPresent()){
            return null;
        }
        return forumPost.get();
    }

    @Override
    public Page<ForumPostReply> findReplyByPostDetailId(Long postDetailId, Integer pageNo, Integer pageSize) {
        Sort sortKey = Sort.by(Sort.Direction.ASC, "createtime");
        Pageable pageable =  PageRequest.of(pageNo - 1, pageSize, sortKey);
        Page<ForumPostReply> pages = forumPostReplyRepository.findByPostDetailId(postDetailId, pageable);
        return pages;
    }

    @Override
    public Long countCommentQuantity(Long forumPostId) {
        Long quantity=forumPostDetailRepository.countByPostId(forumPostId);
        return quantity;
    }

    @Override
    public boolean deleteForumPost(Long userId, Long forumPostId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return false;
        }
        User user = userOptional.get();
        final RoleEnum role = user.getRole();
        if (role==RoleEnum.管理员||user.getId()==userId){
            forumPostDetailRepository.deleteByPostId(forumPostId);
            forumPostRepository.deleteById(forumPostId);
            return true;
        }
        return false;
    }

    @Override
    public List<ForumPost> findTopPost(Integer plateId, Integer size) {
        return forumPostRepository.findTopPost(plateId,size);
    }
}
