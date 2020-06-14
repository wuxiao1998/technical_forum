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
    /***
     * 用户昵称
     */
    private String nickname;
    /***
     * 用户电话
     */
    private String phone;
    /***
     * 用户性别
     */
    private Integer gender;
}
