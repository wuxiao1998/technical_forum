package jee.sanda.forum.service;

import jee.sanda.forum.entity.ForumPost;
import jee.sanda.forum.entity.Plate;

import java.util.List;

public interface ForumPostService {

    List<ForumPost> findByPlateId(Integer plateId);
}
