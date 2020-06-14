package jee.sanda.forum.entity;

import lombok.Data;

import javax.persistence.*;

/***
 * 板块实体类
 */
@Data
@Entity
@Table(name = "plate")
public class Plate {
    /***
     * 主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /***
     * 板块名
     */
    private String name;
}
