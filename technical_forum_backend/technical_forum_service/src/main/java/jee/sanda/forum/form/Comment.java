package jee.sanda.forum.form;

import lombok.Data;

/***
 * 用于接收用户评论的实体
 */
@Data
public class Comment {
    /***
     * 评论内容
     */
    String content;
    /***
     * 主表id
     */
    Long forumPostId;
}
