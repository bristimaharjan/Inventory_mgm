package com.RBS.demo.service;

public interface Authservice {
    boolean login(String username,String password);
    boolean changePassword(String oldPassword,String newPassword);
}
