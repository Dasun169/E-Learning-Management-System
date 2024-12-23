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
        return userRepository.findByUserName(userName); // Fetch the user by username
    }

    @Override
    public User getUserById(long id) {
        return userRepository.findById(id).orElse(null); // Fetch the user by id, or return null if not found
    }
}
