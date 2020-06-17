package jee.sanda.forum.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/***
 * 论坛帖子实体类
 */
@Data
@Entity
@Table(name = "forum_post")
@EntityListeners(AuditingEntityListener.class)
public class ForumPost {
    /***
     * 主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /***
     * 帖子标题
     */
    private String title;
    /***
     * 帖子详情描述
     */
    private String description;
    /***
     * 访问量
     */
    private Integer count;
    /***
     * 板块id
     */
    @Column(name = "plate_id")
    private Integer plateId;
    /***
     * 种类(未使用)
     */
    private Integer type;
    /***
     * 发帖时间
     */
    @CreatedDate
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createtime;
    /***
     * 发帖人
     */
    @OneToOne
    @JoinColumn(name = "createby")
    private User user;
//    @OneToMany(cascade = CascadeType.REMOVE,fetch=FetchType.EAGER)
//    /***
//     * 帖子详细回帖内容
//     */
//    @JoinColumn(name="forum_post_id")
//    private Set<ForumPostDetail> forumPostDetails;
    @Transient
    private Long commentQuantity;
}
