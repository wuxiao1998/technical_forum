package jee.sanda.forum.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import jee.sanda.forum.em.InfoKindEnum;
import jee.sanda.forum.em.InfoStatusEnum;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

/**
 * 消息实体类
 */
@Entity
@Data
@Table(name = "user_information")
@EntityListeners(AuditingEntityListener.class)
@ApiModel("消息实体类")
public class UserInformation {
    /***
     * 主键id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty("消息id")
    private Long id;
    /**
     * 消息内容
     */
    @ApiModelProperty("消息内容")
    private String content;
    /**
     * 创建消息的时间
     */
    @ApiModelProperty("创建消息的时间")
    @CreatedDate
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createtime;
    /**
     * 消息状态
     */
    @ApiModelProperty("消息状态")
    @Enumerated(EnumType.ORDINAL)
    private InfoStatusEnum status;
    /**
     * 消息种类
     */
    @ApiModelProperty("消息种类")
    @Enumerated(EnumType.ORDINAL)
    private InfoKindEnum kind;
    /***
     * 消息相关人
     */
    @ApiModelProperty("消息相关人")
    @OneToOne
    @JoinColumn(name = "userid")
    private User user;
    /**
     * 消息相关帖子id
     */
    @ApiModelProperty("消息相关帖子id")
    @Column(name="forum_post_id")
    private Long forumPostId;
}
