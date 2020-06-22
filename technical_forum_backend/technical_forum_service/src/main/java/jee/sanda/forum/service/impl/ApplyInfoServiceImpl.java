package jee.sanda.forum.service.impl;

import jee.sanda.forum.em.InfoKindEnum;
import jee.sanda.forum.entity.ApplyInfo;
import jee.sanda.forum.entity.UserPlate;
import jee.sanda.forum.repository.ApplyInfoRepository;
import jee.sanda.forum.repository.UserPlateRepository;
import jee.sanda.forum.repository.UserRepository;
import jee.sanda.forum.service.ApplyInfoService;
import jee.sanda.forum.service.InformationService;
import jee.sanda.forum.service.PlateService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;

@Service
@Transactional
public class ApplyInfoServiceImpl implements ApplyInfoService {

    @Autowired
    private ApplyInfoRepository applyInfoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPlateRepository userPlateRepository;
    @Autowired
    private InformationService informationService;

    @Autowired
    private PlateService plateService;

    @Override
    public void saveApplyInfo(ApplyInfo applyInfo) {
        applyInfoRepository.save(applyInfo);
    }

    @Override
    public Page<ApplyInfo> showApplyInfo(Integer pageNo, Integer pageSize) {
        Specification<ApplyInfo> spec = new Specification<ApplyInfo>() {
            @Override
            public Predicate toPredicate(Root<ApplyInfo> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                Path<Object> applyUser = root.get("applyUser");
                Predicate p1 = criteriaBuilder.gt(applyUser.get("id").as(Long.class), 0);
                return p1;
            }
        };
        Sort sortKey =  Sort.by(Sort.Direction.ASC, "status");
        sortKey.and(Sort.by(Sort.Direction.DESC, "createtime"));
        Pageable pageable =  PageRequest.of(pageNo - 1, pageSize, sortKey);
        Page<ApplyInfo>applyInfos=applyInfoRepository.findAll(spec,pageable);
        return applyInfos;
    }

    @Override
    public boolean grantModeratorToUser(UserPlate userPlate,Long applyId) {
        Long userId=userPlate.getUserId();
        Integer plateId = userPlate.getPlateId();
        String name = plateService.getNameById(plateId);
        userRepository.changeRoleToModerator(userId);
        userPlateRepository.save(userPlate);
        //修改状态为申请通过
        changeStatusToAccept(applyId);
        informationService.createInformation(userId,"管理员通过了您的版主申请,恭喜您成为"
                        +name+"板块的版主",
                InfoKindEnum.普通消息,null);
        return true;
    }

    @Override
    public void changeStatusToAccept(Long applyId) {
        applyInfoRepository.changeStatusToAccept(applyId);
    }

    @Override
    public void rejectApply(ApplyInfo applyInfo) {
        //更改为驳回状态
        Long userId = applyInfo.getApplyUser().getId();
        String plateName = applyInfo.getPlate().getName();
        applyInfoRepository.changeStatusToReject(applyInfo.getId());
        informationService.createInformation(userId,"抱歉,管理员拒绝了您的\""+plateName+"版主\"的申请,请继续努力升级",
                InfoKindEnum.普通消息,null);
    }
}
