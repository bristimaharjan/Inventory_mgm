package com.RBS.demo.service.impl;

import com.RBS.demo.model.User;
import com.RBS.demo.service.Authservice;
import com.RBS.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.RBS.demo.util.JwtUtil;

@Service
public class AuthServiceImpl implements Authservice {
    @Autowired
    private UserService userService;
    @Override
    public String login(String username, String password) {
        User user = userService.findByUsername(username);
        if (user == null || !user.getPassword().equals(password)) {
            throw new RuntimeException("login Failed");
        }
        if (!password.matches("^[A-Za-z\\d]{8,}$")) {
            throw new RuntimeException("Password must be at least 8 characters and contain only letters or digits");
        }

        return JwtUtil.generateToken(user);
    }
    //return user!=null&&user.getPassword().equals(password);

    @Override
    public boolean changePassword(String oldPassword, String newPassword) {

        return false;
    }
}
