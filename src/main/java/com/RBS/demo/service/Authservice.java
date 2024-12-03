package com.RBS.demo.service;

public interface Authservice {
    String login(String username,String password);
    boolean changePassword(String oldPassword,String newPassword);
}
