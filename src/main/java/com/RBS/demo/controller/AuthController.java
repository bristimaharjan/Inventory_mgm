package com.RBS.demo.controller;

import com.RBS.demo.dto.LoginDto;
import com.RBS.demo.model.User;
import com.RBS.demo.service.Authservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private Authservice authService;
    @PostMapping("/login")
    public Map<String,String> login (@RequestBody LoginDto loginDto){
        String token  = authService.login(loginDto.username(),loginDto.password());
        return Map.of("Token",token);
    }

}
