package jee.sanda.forum.entity;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="user")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private Integer gender;
    private Integer experience;
    private Integer level;
    private String designation;
    private Integer status;
    private Integer role;
    private String createtime;
    private String updatetime;
}
