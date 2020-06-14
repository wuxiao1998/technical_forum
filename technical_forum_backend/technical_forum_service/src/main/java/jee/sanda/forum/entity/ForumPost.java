package jee.sanda.forum.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/***
 * 论坛帖子实体类
 */
@Data
@Entity
@Table(name = "forum_post")
@EntityListeners(AuditingEntityListener.class)
public class ForumPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /***
     * 主键
     */
    private Long id;
    /***
     * 帖子标题
     */
    private String title;
    private String description;
    private Integer count;
    @Column(name = "plate_id")
    private Integer plateId;
    private Integer type;
    @CreatedDate
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createtime;
    @OneToOne
    @JoinColumn(name = "createby")
    private User user;
    @OneToMany(cascade = CascadeType.REMOVE,fetch=FetchType.EAGER)
    @JoinColumn(name="forum_post_id")
    private List<ForumPostDetail> forumPostDetails;

}
