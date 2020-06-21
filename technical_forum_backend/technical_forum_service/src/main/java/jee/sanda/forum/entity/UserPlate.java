package jee.sanda.forum.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

/**
 * 版主实体类
 */
@Entity
@Data
@Table(name = "user_plate")
@EntityListeners(AuditingEntityListener.class)
@ApiModel("版主实体类")
public class UserPlate {
    /***
     * 主键id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty("用户id")
    private Integer id;

    @Column(nullable = false,name = "user_id")
    @ApiModelProperty("用户id")
    private Long userId;

    @Column(nullable = false,name = "plate_id")
    @ApiModelProperty("板块id")
    private Integer plateId;
}
