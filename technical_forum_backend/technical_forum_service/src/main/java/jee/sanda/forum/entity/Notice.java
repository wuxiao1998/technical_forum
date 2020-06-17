package jee.sanda.forum.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name = "notice")
public class Notice {
    /**
     * 公告id
     */
    private Integer id;
    /**
     * 公告内容
     */
    private String content;
    /**
     * 公告范围（null为全站）
     */
    @JoinColumn(name = "plate_id")
    private Integer plateId;
    /**
     * 创建公告的人
     */
    @OneToOne
    @JoinColumn(name = "createby")
    private User createUser;
    /**
     * 创建公告的时间
     */
    @CreatedDate
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createtime;
    /**
     * 修改公告的人
     */
    @OneToOne
    @JoinColumn(name = "updateby")
    private User updateUser;
    /**
     * 修改公告的时间
     */
    @CreatedDate
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date updatetime;
}
