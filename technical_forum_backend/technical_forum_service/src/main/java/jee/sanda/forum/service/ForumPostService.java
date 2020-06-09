package jee.sanda.forum.service;

import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.entity.Plate;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ForumPostService {

    Page<ForumPost> findByPlateId(Integer plateId,Integer pageNo,Integer pageSize);
    void saveForumPost(ForumPost forumPost);
}
