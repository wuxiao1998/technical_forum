package jee.sanda.forum.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/***
 * 论坛帖子详情
 */
@Data
@Entity
@Table(name = "forum_post_detail")
@EntityListeners(AuditingEntityListener.class)
@ApiModel("帖子详情实体类")
public class ForumPostDetail {
    /***
     * 主键
     */
    @ApiModelProperty("帖子详情id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /***
     * 回帖内容
     */
    @ApiModelProperty("回帖内容")
    private String content;
    /***
     * 回帖人信息
     */
    @ApiModelProperty("回帖人信息")
    @OneToOne
    @JoinColumn(name = "createby")
    private User user;
    /***
     * 回帖时间
     */
    @ApiModelProperty("回帖时间")
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @CreatedDate
    private Date createtime;
    /***
     * 评论信息
     */
    @ApiModelProperty("对应的评论信息")
    @OrderBy("createtime ASC ")
    @OneToMany(cascade = CascadeType.REMOVE,fetch=FetchType.EAGER)
    @JoinColumn(name="forum_post_detail_id")
    private Set<ForumPostReply> ForumPostReply;


}
