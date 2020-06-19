package jee.sanda.forum.form;

import lombok.Data;

//用于接收邮箱和验证码
@Data
public class Email {
    private String email;
    private String uuid;
}
