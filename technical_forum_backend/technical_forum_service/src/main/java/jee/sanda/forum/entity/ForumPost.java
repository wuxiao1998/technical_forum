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
    private Integer id;
    private String title;
    private String description;
    private Integer count;
    private Integer plate_id;
    private Integer type;
    @CreatedDate
    private Date createtime;
    private Integer createby;
}
