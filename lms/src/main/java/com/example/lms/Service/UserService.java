package com.example.lms.Service;

import com.example.lms.Model.User;

import java.util.List;

public interface UserService {
    User createUser(User user);
    List<User> getAllUsers();
    User updateUser(long id, User user);
    boolean deleteUserByUserName(String userName); // Return boolean to indicate if user was deleted
    User getUserByUserName(String userName); // Add method to fetch user by username
}
