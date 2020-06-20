package jee.sanda.forum.service.impl;

import jee.sanda.forum.em.InfoKindEnum;
import jee.sanda.forum.em.InfoStatusEnum;
import jee.sanda.forum.entity.User;
import jee.sanda.forum.entity.UserInformation;
import jee.sanda.forum.repository.UserInformationRepository;
import jee.sanda.forum.repository.UserRepository;
import jee.sanda.forum.service.InformationService;
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
public class InformationServiceImpl implements InformationService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInformationRepository userInformationRepository;
    @Override
    public Page<UserInformation> searchInformation(Long userId, Integer pageNo, Integer pageSize) {
        Sort sortKey = Sort.by(Sort.Direction.ASC, "createtime");
        Pageable pageable =  PageRequest.of(pageNo - 1, pageSize, sortKey);
        Page<UserInformation> pages=userInformationRepository.searchUnreadInformation(userId,pageable);
        return pages;
    }

    @Override
    public boolean changeStatus(Long informationId) {
        if(userInformationRepository.changeStatus(informationId)>0){
            return true;
        }
        return false;
    }

    @Override
    public boolean createInformation(Long userId, String content, InfoKindEnum kind) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return false;
        }
        User user = userOptional.get();
        UserInformation userInformation=new UserInformation();
        userInformation.setContent(content);
        userInformation.setStatus(InfoStatusEnum.未读);
        userInformation.setKind(kind);
        userInformation.setUser(user);
        userInformationRepository.save(userInformation);
        return true;
    }

}
