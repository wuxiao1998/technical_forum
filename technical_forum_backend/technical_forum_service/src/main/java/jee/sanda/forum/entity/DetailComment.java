package jee.sanda.forum.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Data
@Table(name = "forum_post_detail")
@EntityListeners(AuditingEntityListener.class)
@ApiModel("回帖实体类")
public class DetailComment {
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
     * 回帖人id
     */
    @ApiModelProperty("回帖人id")
    @Column(name = "createby")
    private Long userId;
    /**
     * 回复的帖子id
     */
    @ApiModelProperty("回复的帖子id")
    @Column(name = "forum_post_id")
    private Long postId;
}
