package jee.sanda.forum.form;

import lombok.Data;

/***
 * 用于接收用户对帖子的回复信息
 */
@Data
public class Reply {
    /**
     * 回帖信息id
     */
    private Long forumPostDetailId;
    /***
     * 评论内容
     */
    private String content;
}
