package com.example.lms.Repository;

import com.example.lms.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, Long> {
    void deleteByUserName(String userName);
    boolean existsByUserName(String userName);
    User findByUserName(String userName); // Add this method to find by userName
}
