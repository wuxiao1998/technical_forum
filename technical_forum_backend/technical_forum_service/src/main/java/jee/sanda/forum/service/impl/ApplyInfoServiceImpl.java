package jee.sanda.forum.service.impl;

import jee.sanda.forum.entity.ApplyInfo;
import jee.sanda.forum.repository.ApplyInfoRepository;
import jee.sanda.forum.service.ApplyInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ApplyInfoServiceImpl implements ApplyInfoService {

    @Autowired
    private ApplyInfoRepository applyInfoRepository;

    @Override
    public void saveApplyInfo(ApplyInfo applyInfo) {
        applyInfoRepository.save(applyInfo);
    }

    @Override
    public Page<ApplyInfo> showApplyInfo(Integer pageNo, Integer pageSize) {
        Sort sortKey = Sort.by(Sort.Direction.DESC, "createtime");
        Pageable pageable =  PageRequest.of(pageNo - 1, pageSize, sortKey);
        Page<ApplyInfo>applyInfos=applyInfoRepository.findAll(pageable);
        return applyInfos;
    }
}
