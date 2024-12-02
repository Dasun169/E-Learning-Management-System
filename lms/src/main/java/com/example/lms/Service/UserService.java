package com.example.lms.Service;

import com.example.lms.Model.User;

import java.util.List;

public interface UserService {
    User createUser(User user);
    List<User> getAllUsers();
    User updateUser(long id, User user);
}
