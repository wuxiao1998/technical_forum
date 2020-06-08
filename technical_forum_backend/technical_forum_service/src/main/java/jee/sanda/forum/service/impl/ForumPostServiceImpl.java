package jee.sanda.forum.service.impl;

import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.entity.Plate;
import jee.sanda.forum.repository.ForumPostRepository;
import jee.sanda.forum.repository.PlateRepository;
import jee.sanda.forum.service.ForumPostService;
import jee.sanda.forum.service.PlateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ForumPostServiceImpl implements ForumPostService {

    @Autowired
    private ForumPostRepository forumPostRepository;

    @Override
    public List<ForumPost> findByPlateId(Integer plateId) {
        List<ForumPost> forumPosts = forumPostRepository.findByPlateId(plateId);
        return forumPosts;
    }

    @Override
    public void saveForumPost(ForumPost forumPost) {
        forumPostRepository.save(forumPost);
    }
}
