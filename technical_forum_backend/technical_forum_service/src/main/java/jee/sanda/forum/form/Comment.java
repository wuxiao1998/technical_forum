package jee.sanda.forum.form;

import lombok.Data;

@Data
public class Comment {
    String content;
    Long forumPostId;
}
