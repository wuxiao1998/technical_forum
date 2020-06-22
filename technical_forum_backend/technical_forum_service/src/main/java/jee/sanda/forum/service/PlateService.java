package jee.sanda.forum.service;

import jee.sanda.forum.entity.Plate;

import java.util.List;

public interface PlateService {
    /**
     * 查找所有板块
     * @return
     */
    List<Plate> findAll();

    String getNameById(Integer plateId);
}
