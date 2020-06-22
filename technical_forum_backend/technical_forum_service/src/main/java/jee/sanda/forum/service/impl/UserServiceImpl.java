package jee.sanda.forum.service.impl;

import jee.sanda.forum.em.InfoKindEnum;
import jee.sanda.forum.em.RoleEnum;
import jee.sanda.forum.em.LoginStatusEnum;
import jee.sanda.forum.entity.User;
import jee.sanda.forum.form.UpdateUserForm;
import jee.sanda.forum.repository.UserRepository;
import jee.sanda.forum.service.InformationService;
import jee.sanda.forum.service.UserService;
import jee.sanda.forum.utils.ExperienceLevelUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InformationService informationService;

    @Override
    public User login(String username, String password) {
        User loginUser = userRepository.findByUsernameAndPassword(username, password);

        return loginUser;
    }

    @Override
    public Long register(User user) {
        String username = user.getUsername();
        if (!checkUserName(username)) {
            return 0L;
        }
        initializeUser(user);
        User user1=userRepository.save(user);
        Long userId=user1.getId();
        return userId;
    }

    @Override
    public void updateStatus(Long userId) {
        userRepository.updateStatus(userId);
    }

    @Override
    public boolean checkUserName(String username) {
        User result = userRepository.findByUsername(username);
        if (result == null) {
            return true;
        }
        log.info("checkUserName:{}", result);
        return false;
    }

    @Override
    public boolean updateUser(Long userId, UpdateUserForm updateUserForm) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return false;
        }
        User user = userOptional.get();
        user.setNickname(updateUserForm.getNickname());
        user.setGender(updateUserForm.getGender());
        user.setPhone(updateUserForm.getPhone());
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean updatePassword(Long userId, String password) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return false;
        }
        User user = userOptional.get();
        user.setPassword(password);
        userRepository.save(user);
        return true;
    }

    @Override
    public void initializeUser(User user) {
        //设置初始经验值为0
        user.setExperience(0);
        //设置初始等级为1
        user.setLevel(1);
        //设置初始称号
        user.setDesignation("萌新上路");
        //设置初始状态为激活
        user.setStatus(LoginStatusEnum.正常);
        //初始角色为普通用户
        user.setRole(RoleEnum.普通用户);
    }

    @Override
    public boolean checkPassword(Long userId, String password) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return false;
        }
        User user = userOptional.get();
        if (user.getPassword().equals(password)) {
            return true;
        }
        return false;
    }

    @Override
    public User findById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()){
            return null;
        }
        return  user.get();
    }

    @Override
    public void updateLevelAndExperienceAndDesignation(Long userId, Integer increment) {
        Optional<User> userOptional = userRepository.findById(userId);
        if(!userOptional.isPresent()){
            return;
        }
        User user = userOptional.get();
        Integer oldLevel = user.getLevel();
        //获取原有经验值
        Integer experience= user.getExperience();
        //增加经验值
        experience = experience + increment;
        //判断属于哪个等级
        Integer newLevel= ExperienceLevelUtils.judgeLevel(experience);
        //判断等级对应的称号
        String designation=ExperienceLevelUtils.judgeDesignation(newLevel);
        userRepository.updateExperienceAndLevelAndDesignation(experience,newLevel,designation,userId);
        if (newLevel != oldLevel){
            String content="恭喜你！你的账号升到了"+newLevel+"级，获得新称号："+designation+"。";
            informationService.createInformation(userId,content, InfoKindEnum.普通消息,null);
        }
    }


    @Override
    public Page<User> findAll(Integer pageNo, Integer pageSize) {
        Specification<User> spec = new Specification<User>() {
            @Override
            public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                Path<Object> username = root.get("username");
                Predicate p1 = criteriaBuilder.isNotNull(username);
                return p1;
            }
        };
        Sort sortKey = Sort.by(Sort.Direction.DESC, "role");
        Pageable pageable =  PageRequest.of(pageNo - 1, pageSize, sortKey);
        return userRepository.findAll(spec,pageable);
    }

    @Override
    public boolean banUser(Long userId) {
        User user=findById(userId);
        if(user!=null){
            user.setStatus(LoginStatusEnum.封号);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public boolean checkStatus(User user) {
        if(user.getStatus()== LoginStatusEnum.正常)
        {
            return true;
        }
        return false;
    }

    @Override
    public Long findUserIdByUserName(String userName) {
        Long userId=userRepository.findIdByUserName(userName);
        return userId;
    }

    @Override
    public boolean checkLevel(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()){
            return  false;
        }
        Integer level = user.get().getLevel();
        return level >= 7;
    }

    @Override
    public String findEmailByUserName(String userName) {
        String email=userRepository.findEmailByUserName(userName);
        return email;
    }


}
