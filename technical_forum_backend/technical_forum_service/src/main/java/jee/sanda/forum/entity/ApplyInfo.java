package jee.sanda.forum.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import jee.sanda.forum.em.ApplyStatusEnum;
import jee.sanda.forum.em.ApplyTypeEnum;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "management_apply")
@ApiModel("管理员申请信息实体类")
@EntityListeners(AuditingEntityListener.class)
public class ApplyInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String content;

    @ApiModelProperty("申请人")
    @OneToOne
    @JoinColumn(name = "user_id")
    private User applyUser;

    @ApiModelProperty(" 申请时间")
    @CreatedDate
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createtime;

    @ApiModelProperty("处理状态")
    @Enumerated(EnumType.ORDINAL)
    private ApplyStatusEnum status;

    @ApiModelProperty("消息类型")
    @Enumerated(EnumType.ORDINAL)
    private ApplyTypeEnum type;

    @ApiModelProperty("处理人")
    @OneToOne
    @JoinColumn(name = "handler_id")
    private User handlerUser;

    @ApiModelProperty("处理时间")
    @LastModifiedDate
    @JsonIgnore
    @Column(name="handler_time")
    private java.util.Date handlerTime;
}
