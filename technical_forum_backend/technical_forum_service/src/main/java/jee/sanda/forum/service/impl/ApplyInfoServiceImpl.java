package jee.sanda.forum.service.impl;

import jee.sanda.forum.entity.ApplyInfo;
import jee.sanda.forum.entity.UserPlate;
import jee.sanda.forum.repository.ApplyInfoRepository;
import jee.sanda.forum.repository.UserPlateRepository;
import jee.sanda.forum.repository.UserRepository;
import jee.sanda.forum.service.ApplyInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class ApplyInfoServiceImpl implements ApplyInfoService {

    @Autowired
    private ApplyInfoRepository applyInfoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPlateRepository userPlateRepository;

    @Override
    public void saveApplyInfo(ApplyInfo applyInfo) {
        applyInfoRepository.save(applyInfo);
    }

    @Override
    public Page<ApplyInfo> showApplyInfo(Integer pageNo, Integer pageSize) {
        Sort sortKey = Sort.by(Sort.Direction.DESC, "status");
        Pageable pageable =  PageRequest.of(pageNo - 1, pageSize, sortKey);
        Page<ApplyInfo>applyInfos=applyInfoRepository.findAll(pageable);
        return applyInfos;
    }

    @Override
    public boolean grantModeratorToUser(UserPlate userPlate) {
        Long userId=userPlate.getUserId();
        userRepository.changeRoleToModerator(userId);
        userPlateRepository.save(userPlate);
        return true;
    }

    @Override
    public void changeStatusToProcessed(Long applyId) {
        applyInfoRepository.changeStatusToProcessed(applyId);
    }
}
