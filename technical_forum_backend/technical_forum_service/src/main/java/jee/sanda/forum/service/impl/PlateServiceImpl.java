package jee.sanda.forum.service.impl;

import jee.sanda.forum.entity.Plate;
import jee.sanda.forum.repository.PlateRepository;
import jee.sanda.forum.service.PlateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PlateServiceImpl implements PlateService {

    @Autowired
    private PlateRepository plateRepository;

    @Override
    public List<Plate> findAll() {
        return plateRepository.findAll();
    }

    @Override
    public String getNameById(Integer plateId) {
        Optional<Plate> plate = plateRepository.findById(plateId);
        if(!plate.isPresent()){
            return "";
        }
        return plate.get().getName();
    }
}
