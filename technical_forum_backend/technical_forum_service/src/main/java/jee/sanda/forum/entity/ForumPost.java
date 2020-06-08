package jee.sanda.forum.entity;


import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

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
    private Date createtime;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="createby")
    private User user;
}
