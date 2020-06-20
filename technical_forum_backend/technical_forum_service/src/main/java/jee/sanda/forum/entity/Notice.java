package jee.sanda.forum.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.hibernate.engine.internal.Cascade;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "notice")
@EntityListeners(AuditingEntityListener.class)
@ApiModel("公告实体类")
public class Notice {
    /**
     * 公告id
     */
    @ApiModelProperty("公告id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     * 帖子标题
     */
    @ApiModelProperty("公告标题")
    private String title;
    /**
     * 公告内容
     */
    @ApiModelProperty("公告内容")
    private String content;
    /**
     * 公告范围（null为全站）
     */
    @ApiModelProperty("所属板块id")
    @OneToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name = "plate_id")
    private Plate plate;
    /**
     * 创建公告的人
     */
    @ApiModelProperty("发布人")
    @OneToOne
    @JoinColumn(name = "createby")
    private User createUser;
    /**
     * 创建公告的时间
     */
    @ApiModelProperty("发布时间")
    @CreatedDate
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createtime;
//    /**
//     * 修改公告的人
//     */
//    @OneToOne
//    @JoinColumn(name = "updateby")
//    private User updateUser;
//    /**
//     * 修改公告的时间
//     */
//    @LastModifiedDate
//    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
//    private Date updatetime;
}
