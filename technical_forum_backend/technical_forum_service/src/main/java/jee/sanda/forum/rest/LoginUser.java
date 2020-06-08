package jee.sanda.forum.rest;

import lombok.Data;
@Data
public class LoginUser {
    private Long id;
    private String username;
    private String email;
    private String nickname;
    private String phone;
    private Integer gender;
    private Integer experience;
    private Integer level;
    private String designation;
    private Integer status;
    private Integer role;
    private java.util.Date createtime;

}
