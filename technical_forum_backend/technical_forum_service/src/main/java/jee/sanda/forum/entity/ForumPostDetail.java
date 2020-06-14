package jee.sanda.forum.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

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
    private Long id;
    private String content;
    @OneToOne
    @JoinColumn(name = "createby")
    private User user;
    @CreatedDate
    private Date createtime;
    @OneToMany(cascade = CascadeType.REMOVE,fetch=FetchType.EAGER)
    @JoinColumn(name="forum_post_detail_id")
    private List<ForumPostReply> ForumPostReply;


}
