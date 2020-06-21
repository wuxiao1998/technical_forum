package jee.sanda.forum.repository;

import jee.sanda.forum.entity.ApplyInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ApplyInfoRepository  extends JpaRepository<ApplyInfo,Integer>, JpaSpecificationExecutor<ApplyInfo> {
}
