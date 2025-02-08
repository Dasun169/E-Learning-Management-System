package com.example.lms.Repository;

import com.example.lms.Model.User;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, Long> {
    void deleteByUserName(String userName);
    boolean existsByUserName(String userName);
    User findByUserName(String userName); 
    User findByRoleAndUserName(String role, String userName);
    void deleteByUserNameAndRole(String userName, String role);
    boolean existsByUserNameAndRole(String userName, String role);
    List<User> findByRole(String role); 
}