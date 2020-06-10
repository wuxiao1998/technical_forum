package jee.sanda.forum.service.impl;

import jee.sanda.forum.entity.User;
import jee.sanda.forum.form.UpdateUserForm;
import jee.sanda.forum.repository.UserRepository;
import jee.sanda.forum.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public User login(String username, String password) {
        User loginUser = userRepository.findByUsernameAndPassword(username, password);

        return loginUser;
    }

    @Override
    public boolean register(User user) {
        String username=user.getUsername();
        if (!checkUserName(username)){
            return false;
        }
        initializeUser(user);
        userRepository.save(user);
        return true;
    }

    @Override
    public void updateStatus(Long userId) {
        userRepository.updateStatus(userId);
    }

    @Override
    public boolean checkUserName(String username) {
        User result=userRepository.findByUsername(username);
        if(result == null){
            return true;
        }
        log.info("checkUserName:{}",result);
        return false;
    }

    @Override
    public boolean updateUser(Long userId, UpdateUserForm updateUserForm) {
        Optional<User> userOptional=userRepository.findById(userId);
        if(!userOptional.isPresent()){
            return false;
        }
        User user=userOptional.get();
        user.setNickname(updateUserForm.getNickname());
        user.setGender(updateUserForm.getGender());
        user.setPhone(updateUserForm.getPhone());
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean updatePassword(Long userId, String password) {
        Optional<User> userOptional=userRepository.findById(userId);
        if(!userOptional.isPresent()){
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
        user.setStatus(1);
        //初始角色为普通用户
        user.setRole(1);
    }

    @Override
    public boolean checkPassword(Long userId, String password) {
        Optional<User> userOptional=userRepository.findById(userId);
        if(!userOptional.isPresent()){
            return false;
        }
        User user = userOptional.get();
        if(user.getPassword()==password){
            return true;
        }
        return false;
    }


}
