package com.RBS.demo.service.impl;

import com.RBS.demo.model.User;
import com.RBS.demo.repository.UserRepository;
import com.RBS.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public User add(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User findByUsername(String username) {

        return userRepository.findByUsername(username);
    }

    @Override
    public void deleteById(int id) {
        getById(id);
        userRepository.deleteById(id);
    }

    @Override
    public User updateUser(User user,int id) {
        getById(id);//check id
        user.setId(id);
        return userRepository.save(user);
    }

    @Override
    public User getById(int id) {
        Optional<User> optionalUser = userRepository.findById(id);
       User user= optionalUser.orElseThrow((()->new RuntimeException("User not found")));
        return user;
    }

}
