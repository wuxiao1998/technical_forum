package jee.sanda.forum.form;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import jee.sanda.forum.em.GenderEnum;
import jee.sanda.forum.entity.User;
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
@ApiModel("用于接收用户的修改信息")
public class UpdateUserForm {
    /***
     * 用户昵称
     */
    @ApiModelProperty("用户昵称")
    private String nickname;
    /***
     * 用户电话
     */
    @ApiModelProperty("电话")
    private String phone;
    /***
     * 用户性别
     */
    @ApiModelProperty("性别")
    private GenderEnum gender;
}
