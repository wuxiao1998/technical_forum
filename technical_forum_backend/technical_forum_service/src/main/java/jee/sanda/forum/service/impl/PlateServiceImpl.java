package jee.sanda.forum.service.impl;

import jee.sanda.forum.entity.Plate;
import jee.sanda.forum.repository.PlateRepository;
import jee.sanda.forum.service.PlateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PlateServiceImpl implements PlateService {

    @Autowired
    private PlateRepository plateRepository;

    @Override
    public List<Plate> findAll() {
        return plateRepository.findAll();
    }
}
