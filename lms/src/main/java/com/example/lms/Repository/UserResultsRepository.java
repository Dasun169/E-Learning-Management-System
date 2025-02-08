package com.example.lms.Repository;

import com.example.lms.Model.UserResults;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface UserResultsRepository extends MongoRepository<UserResults, String> {
    List<UserResults> findByUserName(String userName);
    UserResults findByUserNameAndCourseCode(String userName, String courseCode);
}