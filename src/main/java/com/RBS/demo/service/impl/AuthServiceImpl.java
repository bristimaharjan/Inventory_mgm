package com.RBS.demo.service.impl;

import com.RBS.demo.model.User;
import com.RBS.demo.service.Authservice;
import com.RBS.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements Authservice {
    @Autowired
    private UserService userService;
    @Override
    public boolean login(String username, String password) {
        User user = userService.findByUsername(username);
        if (user.getPassword().equals(password)) {
            return true;
        } else {
            return false;
        }
    }
    //return user!=null&&user.getPassword().equals(password);

    @Override
    public boolean changePassword(String oldPassword, String newPassword) {
        return false;
    }
}
