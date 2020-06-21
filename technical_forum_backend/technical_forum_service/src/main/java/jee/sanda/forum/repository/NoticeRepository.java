package jee.sanda.forum.repository;

import jee.sanda.forum.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface NoticeRepository extends JpaRepository<Notice,Integer>, JpaSpecificationExecutor<Notice> {

    @Query(value="insert into notice(title,content,plate_id,createby)" +
            " values(?1,?2,?3,?4)",nativeQuery = true)
    @Modifying
    void saveNotice(String title,String content,Integer plate_id,Long userId);



}
