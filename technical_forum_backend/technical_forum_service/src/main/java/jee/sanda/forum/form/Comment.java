package jee.sanda.forum.form;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/***
 * 用于接收用户评论的实体
 */
@Data
@ApiModel("用于接收用户评论的实体类")
public class Comment {
    /***
     * 评论内容
     */
    @ApiModelProperty("评论内容")
    private String content;
    /***
     * 主表id
     */
    @ApiModelProperty("帖子主表id")
    private Long forumPostId;
}
