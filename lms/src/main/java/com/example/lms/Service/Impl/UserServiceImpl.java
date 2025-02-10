package com.example.lms.Service.Impl;

import com.example.lms.Model.User;
import com.example.lms.Repository.UserRepository;
import com.example.lms.Service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SequenceService sequenceService;

    @Override
    public User createUser(User user) {
        long id = sequenceService.getNextSequenceId("user_sequence");
        user.setId(id); 
        return userRepository.save(user);
    }


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(long id, User user) {
        if (userRepository.existsById(id)) {
            user.setId(id);
            return userRepository.save(user);
        }
        return null;
    }

    @Override
    public boolean deleteUserByUserName(String userName) {
        if (userRepository.existsByUserName(userName)) {
            userRepository.deleteByUserName(userName);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public User getUserByUserName(String userName) {
        return userRepository.findByUserName(userName); 
    }

    @Override
    public User getUserById(long id) {
        return userRepository.findById(id).orElse(null); 
    }

    @Override
    public User getUserByRoleAndUserName(String role, String userName) {
        return userRepository.findByRoleAndUserName(role, userName); 
    }

    @Override
    public boolean deleteUserByUserNameAndRole(String userName, String role) {
        if(userRepository.existsByUserNameAndRole(userName, role)){ //Check if user exists with userName and role.
            try {
                userRepository.deleteByUserNameAndRole(userName, role);
                return true; // Successfully deleted
            } catch (Exception e) {
                return false; // Deletion failed (e.g., user not found)
            }
        }else{
            return false; // User not found with userName and role.
        }
    }

    @Override
    public User updateUserByUserNameAndRole(String userName, String role, String hashPassword, String fullName, String contactNumber, String email) {
        User user = userRepository.findByRoleAndUserName(role, userName); // Use the new method

        if (user != null) {
            user.update(userName, role, hashPassword, fullName, email, contactNumber); // Use the update method in the User model
            return userRepository.save(user);
        }
        return null;
    }
}
