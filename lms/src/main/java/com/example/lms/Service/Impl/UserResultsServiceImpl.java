package com.example.lms.Service.Impl;

import com.example.lms.Model.UserResults;
import com.example.lms.Repository.UserResultsRepository;
import com.example.lms.Service.UserResultsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserResultsServiceImpl implements UserResultsService {

    @Autowired
    private UserResultsRepository userResultsRepository;

    @Override
    public UserResults createUserResult(UserResults userResult) {
        return userResultsRepository.save(userResult);
    }

    @Override
    public List<UserResults> getUserResultsByUserName(String userName) {
        return userResultsRepository.findByUserName(userName);
    }

    @Override
    public UserResults updateUserResult(String userName, String courseCode, String result) {
        UserResults userResult = userResultsRepository.findByUserNameAndCourseCode(userName, courseCode);
        if (userResult != null) {
            userResult.setResult(result);
            return userResultsRepository.save(userResult);
        }
        return null;
    }

    @Override
    public List<UserResults> createMultipleUserResults(List<UserResults> userResults) {
        return userResultsRepository.insert(userResults); // Use insert for bulk operations
    }

    @Override
    public boolean checkIfExists(String userName, String courseCode) {
        return userResultsRepository.existsByUserNameAndCourseCode(userName, courseCode);
    }

    @Override
    public UserResults getUserResultByUserNameAndCourseCode(String userName, String courseCode) {
        return userResultsRepository.findByUserNameAndCourseCode(userName, courseCode);
    }
}