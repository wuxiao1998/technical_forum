package jee.sanda.forum.service.impl;

import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.entity.Notice;
import jee.sanda.forum.entity.User;
import jee.sanda.forum.repository.NoticeRepository;
import jee.sanda.forum.repository.UserRepository;
import jee.sanda.forum.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NoticeServiceImpl implements NoticeService {
    @Autowired
    private NoticeRepository noticeRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public boolean createNotice(Long userId,Notice notice) {
//        Optional<User> userOptional = userRepository.findById(userId);
//        if (!userOptional.isPresent()) {
//            return false;
//        }
//        User user = userOptional.get();
//        notice.setCreateUser(user);
//        notice.setUpdateUser(user);
        noticeRepository.saveNotice(notice.getTitle(),notice.getContent(),
                                    notice.getPlate().getId(),userId);
        return true;
    }

    @Override
    public boolean updateNotice(Long userId,Notice notice) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return false;
        }
        User user = userOptional.get();
        notice.setUpdateUser(user);
        noticeRepository.save(notice);
        return true;
    }

    @Override
    public boolean deleteNotice(Integer noticeId) {
        noticeRepository.deleteById(noticeId);
        return true;
    }

    @Override
    public Page<Notice> searchNoticeByAdmin(Integer pageNo, Integer pageSize) {
        Sort sortKey = Sort.by(Sort.Direction.DESC, "updatetime");
        Pageable pageable =  PageRequest.of(pageNo - 1, pageSize, sortKey);
        Page<Notice> notices = noticeRepository.findAll(pageable);
        return notices;
    }

    @Override
    public Page<Notice> searchNoticeByUser(Integer plateId,Integer pageNo, Integer pageSize) {
        Specification<Notice> spec = new Specification<Notice>() {
            @Override
            public Predicate toPredicate(Root<Notice> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                Path<Object> plate=root.get("plate");
                Predicate p1=criteriaBuilder.equal(plate,plateId);
                Predicate p2=criteriaBuilder.equal(plate,null);
                return criteriaBuilder.and(p1,p2);
            }
        };
        Sort sortKey = Sort.by(Sort.Direction.DESC, "updatetime");
        Pageable pageable =  PageRequest.of(pageNo - 1, pageSize, sortKey);
        Page<Notice> notices = noticeRepository.findAll(spec,pageable);
        return notices;
    }

}
