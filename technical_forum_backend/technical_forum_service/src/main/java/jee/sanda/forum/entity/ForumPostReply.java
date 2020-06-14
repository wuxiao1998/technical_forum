package jee.sanda.forum.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
/***
 * 论坛帖子回复实体类
 */
@Data
@Entity
@Table(name = "forum_post_reply")
@EntityListeners(AuditingEntityListener.class)
public class ForumPostReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /***
     * 主键
     */
    private Long id;
    private String content;
    @OneToOne
    @JoinColumn(name = "createby")
    private User user;
    @CreatedDate
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createtime;

}
