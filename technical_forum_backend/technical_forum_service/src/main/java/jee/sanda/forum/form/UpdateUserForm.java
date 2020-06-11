package jee.sanda.forum.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/***
 * 用于接收用户的修改信息
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UpdateUserForm {
    private String nickname;
    private String phone;
    private Integer gender;
}
