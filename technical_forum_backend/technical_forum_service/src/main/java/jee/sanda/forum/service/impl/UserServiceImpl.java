package jee.sanda.forum.service.impl;

import jee.sanda.forum.entity.User;
import jee.sanda.forum.repository.UserRepository;
import jee.sanda.forum.service.MailService;
import jee.sanda.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public User login(String username, String password) {
        User loginUser = userRepository.findByUsernameAndPassword(username, password);

        return loginUser;
    }

    @Override
    public Long register(User user) {
        user = userRepository.save(user);
        return user.getId();
    }

    @Override
    public void updateStatus(Long userId) {
        userRepository.updateStatus(userId);
    }


}
