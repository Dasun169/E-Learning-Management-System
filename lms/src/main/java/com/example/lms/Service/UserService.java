package com.example.lms.Service;

import com.example.lms.Model.User;

import java.util.List;

public interface UserService {
    User createUser(User user);
    List<User> getAllUsers();
    User updateUser(long id, User user);
    boolean deleteUserByUserName(String userName);
    User getUserByUserName(String userName); 
    User getUserById(long id);
    User getUserByRoleAndUserName(String role, String userName);
    boolean deleteUserByUserNameAndRole(String userName, String role);
    User updateUserByUserNameAndRole(String userName, String role, String fullName, String contactNumber, String email);
}
