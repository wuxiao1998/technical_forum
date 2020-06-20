package jee.sanda.forum.form;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

//用于接收邮箱和验证码
@Data
@ApiModel("用于接收邮箱和验证码")
public class Email {
    @ApiModelProperty("邮箱")
    private String email;
    @ApiModelProperty("uuid")
    private String uuid;
}
