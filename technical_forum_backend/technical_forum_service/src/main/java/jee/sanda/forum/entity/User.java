package jee.sanda.forum.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import jee.sanda.forum.em.GenderEnum;
import jee.sanda.forum.em.RoleEnum;
import jee.sanda.forum.em.LoginStatusEnum;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/***
 * 用户实体类
 */
@Entity
@Table(name = "user")
@EntityListeners(AuditingEntityListener.class)
@ApiModel("用户实体类")
public class User implements Serializable {
    /***
     * 主键id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty("用户id")
    private Long id;
    /***
     * 用户名
     */
    @ApiModelProperty("用户名")
    private String username;
    /***
     * 密码
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ApiModelProperty("登录密码")
    private String password;
    /***
     * 邮箱
     */
    @ApiModelProperty("邮箱")
    private String email;
    /***
     * 昵称
     */
    @ApiModelProperty("昵称")
    private String nickname;
    /***
     * 电话
     */
    @ApiModelProperty("电话")
    private String phone;
    /***
     * 性别
     */
    @ApiModelProperty("性别")
    @Enumerated(EnumType.ORDINAL)
    private GenderEnum gender;
    /***
     * 经验值
     */
    @ApiModelProperty("经验值")
    private Integer experience;
    /***
     * 等级
     */
    @ApiModelProperty("等级")
    private Integer level;
    /***
     * 称号
     */
    @ApiModelProperty("称号")
    private String designation;
    /***
     * 状态(封号,可用)
     */
    @ApiModelProperty("状态")
    @Enumerated(EnumType.ORDINAL)
    private LoginStatusEnum status;
    /***
     * 权限
     */
    @ApiModelProperty("权限")
    @Enumerated(EnumType.ORDINAL)
    private RoleEnum role;
    /***
     * 接收邮箱验证码
     */
    @ApiModelProperty("邮箱验证码")
    @Transient
    private String code;
    /***
     * 接收uuid
     */
    @ApiModelProperty("uuid")
    @Transient
    private String uuid;
    /***
     * 创建时间
     */
    @ApiModelProperty("注册时间")
    @CreatedDate
    private java.util.Date createtime;
    /***
     * 最后更新时间
     */
    @ApiModelProperty("最后更新时间")
    @LastModifiedDate
    @JsonIgnore
    private java.util.Date updatetime;

    @Transient
    private List<UserPlate> plateList;

    public List<UserPlate> getPlateList() {
        return plateList;
    }

    public void setPlateList(List<UserPlate> plateList) {
        this.plateList = plateList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

    public LoginStatusEnum getStatus() {
        return status;
    }

    public void setStatus(LoginStatusEnum status) {
        this.status = status;
    }

    public RoleEnum getRole() {
        return role;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
}
