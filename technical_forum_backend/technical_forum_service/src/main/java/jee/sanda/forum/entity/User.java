package jee.sanda.forum.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="user")
@EntityListeners(AuditingEntityListener.class)
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private Integer gender;
    private Integer experience=0;
    private Integer level=1;
    private String designation="萌新上路";
    private Integer status=0;
    private Integer role=1;
    @CreatedDate
    private java.util.Date createtime;
    @LastModifiedDate
    private java.util.Date updatetime;
}
