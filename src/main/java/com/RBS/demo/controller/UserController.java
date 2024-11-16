package com.RBS.demo.controller;

import com.RBS.demo.model.User;
import com.RBS.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/list")
    public List<User> getAllUser() {
        return userService.getAll();
    }

    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return userService.add(user);
    }
    @PutMapping ("/update/{id}")
    public User updateUser(@RequestBody User user,@PathVariable int id){
        return userService.updateUser(user,id);
    }
    @GetMapping("/{id}")
    public User getById(@PathVariable int id){
        return userService.getById(id);
    }
    @DeleteMapping("{id}")
    public void deleteById(@PathVariable int id) {
        userService.deleteById(id);

    }

    }


