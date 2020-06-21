package jee.sanda.forum.form;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

/***
 * 用于接收用户对帖子的回复信息
 */
@Data
@ApiModel("用于接收用户对帖子的回复信息")
public class Reply {
    /**
     * 回帖信息id
     */
    @ApiModelProperty("帖子细表id")
    private Long forumPostDetailId;
    /***
     * 评论内容
     */
    @ApiModelProperty("评论内容")
    private String content;

    @ApiModelProperty("父评论id")
    private Long parentId;
}
