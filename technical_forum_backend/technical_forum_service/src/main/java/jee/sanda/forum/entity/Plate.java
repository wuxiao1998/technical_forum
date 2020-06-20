package jee.sanda.forum.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;

/***
 * 板块实体类
 */
@Data
@Entity
@Table(name = "plate")
@ApiModel("板块实体类")
public class Plate {
    /***
     * 主键
     */
    @ApiModelProperty("板块id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /***
     * 板块名
     */
    @ApiModelProperty("板块名")
    private String name;
}
