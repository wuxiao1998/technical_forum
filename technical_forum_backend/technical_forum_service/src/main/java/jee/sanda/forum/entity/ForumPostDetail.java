package jee.sanda.forum.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

/***
 * 论坛帖子详情
 */
@Data
@Entity
@Table(name = "forum_post_detail")
@EntityListeners(AuditingEntityListener.class)
public class ForumPostDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "forum_post_id")
    private Long forumPostId;
    private String content;
    private Long createby;
    @CreatedDate
    private Date createtime;

}
