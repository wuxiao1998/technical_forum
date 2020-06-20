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
 * 论坛帖子实体类
 */
@Data
@Entity
@Table(name = "forum_post")
@ApiModel("帖子实体类")
@EntityListeners(AuditingEntityListener.class)
public class ForumPost {
    /***
     * 主键
     */
    @ApiModelProperty("帖子id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /***
     * 帖子标题
     */
    @ApiModelProperty("帖子标题")
    private String title;
    /***
     * 帖子详情描述
     */
    @ApiModelProperty("帖子描述")
    private String description;
    /***
     * 访问量
     */
    @ApiModelProperty("访问量")
    private Integer count;
    /***
     * 板块id
     */
    @ApiModelProperty("所属板块")
    @Column(name = "plate_id")
    private Integer plateId;
    /***
     * 种类(未使用)
     */
    @ApiModelProperty("种类")
    private Integer type;
    /***
     * 发帖时间
     */
    @ApiModelProperty("发帖时间")
    @CreatedDate
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createtime;
    /***
     * 发帖人
     */
    @ApiModelProperty("发帖人信息")
    @OneToOne
    @JoinColumn(name = "createby")
    private User user;
//    @OneToMany(cascade = CascadeType.REMOVE,fetch=FetchType.EAGER)
//    /***
//     * 帖子详细回帖内容
//     */
//    @JoinColumn(name="forum_post_id")
//    private Set<ForumPostDetail> forumPostDetails;
    @ApiModelProperty("回帖数量")
    @Transient
    private Long commentQuantity;
}
