package jee.sanda.forum.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel("帖子评论实体类")
public class ForumPostReply {
    /***
     * 主键
     */
    @ApiModelProperty("帖子评论id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /***
     * 评论内容
     */
    @ApiModelProperty("评论内容")
    private String content;
    /***
     * 评论人信息
     */
    @ApiModelProperty("评论人信息")
    @OneToOne
    @JoinColumn(name = "createby")
    private User user;
    /***
     * 评论时间
     */
    @ApiModelProperty("评论时间")
    @CreatedDate
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createtime;

}
