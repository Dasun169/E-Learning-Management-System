package com.example.lms.Service;

import com.example.lms.Model.UserResults;
import java.util.List;

public interface UserResultsService {
    UserResults createUserResult(UserResults userResult);
    List<UserResults> getUserResultsByUserName(String userName);
    UserResults updateUserResult(String userName, String courseCode, String result);
    List<UserResults> createMultipleUserResults(List<UserResults> userResults);
    boolean checkIfExists(String userName, String courseCode);
    UserResults getUserResultByUserNameAndCourseCode(String userName, String courseCode); 
}