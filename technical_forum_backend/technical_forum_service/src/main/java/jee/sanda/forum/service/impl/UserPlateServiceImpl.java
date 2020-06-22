package jee.sanda.forum.service.impl;

import jee.sanda.forum.entity.UserPlate;
import jee.sanda.forum.repository.UserPlateRepository;
import jee.sanda.forum.service.UserPlateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserPlateServiceImpl implements UserPlateService {
    @Autowired
    private UserPlateRepository userPlateRepository;
    @Override
    public List<UserPlate> findByUserId(Long userId) {
        return userPlateRepository.findByUserId(userId);
    }
}
