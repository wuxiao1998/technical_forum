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
    @Autowired
    private MailService mailService;
    @Override
    public User login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username,password);
    }

    @Override
    public void register(User user) {
        userRepository.save(user);
    }

    @Override
    public void sendEmail(String email) {
       mailService.sendSimpleMail(email);
    }


}
