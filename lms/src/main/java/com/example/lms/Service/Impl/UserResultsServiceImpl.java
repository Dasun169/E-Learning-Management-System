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
    public UserResults updateUserResult(String userName, String result) {
        List<UserResults> results = userResultsRepository.findByUserName(userName);
        if (!results.isEmpty()) {
            UserResults userResult = results.get(0);
            userResult.setResult(result);
            return userResultsRepository.save(userResult);
        }
        return null;
    }

    @Override
    public List<UserResults> createMultipleUserResults(List<UserResults> userResults) {
        return userResultsRepository.insert(userResults); // Use insert for bulk operations
    }
}