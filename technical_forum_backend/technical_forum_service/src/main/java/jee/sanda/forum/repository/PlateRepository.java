package jee.sanda.forum.repository;

import jee.sanda.forum.entity.Plate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PlateRepository extends JpaRepository<Plate,Integer>, JpaSpecificationExecutor<Plate> {
}
