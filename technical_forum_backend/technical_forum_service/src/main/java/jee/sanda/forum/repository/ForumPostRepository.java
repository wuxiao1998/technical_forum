package jee.sanda.forum.repository;

import jee.sanda.forum.entity.ForumPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ForumPostRepository extends JpaRepository<ForumPost, Long>, JpaSpecificationExecutor<ForumPost> {
    //根据板块查找帖子
    List<ForumPost> findByPlateId(Integer plateId);

    //帖子浏览量+1
    @Query(value="update forum_post set count=count+1 where id=?1",nativeQuery=true)
    @Modifying
    int updateForum_Post_Count(Long postId);

    @Query(value = "SELECT id,title,description,plate_id,type,createby,createtime,MAX(COUNT) AS COUNT FROM forum_post " +
            " WHERE plate_id=?1 GROUP BY id " +
            " ORDER BY COUNT DESC LIMIT ?2",nativeQuery = true)
    List<ForumPost> findTopPost(Integer plateId, Integer size);
    //根据帖子id查找帖子标题
    @Query(value = "select title from forum_post where id=?1",nativeQuery = true)
    String findTitleById(Long postId);
    //通过帖子id查找发帖人
    @Query(value = "select createby from forum_post where id=?1",nativeQuery = true)
    Long findUserIdByPostId(Long postId);
}
