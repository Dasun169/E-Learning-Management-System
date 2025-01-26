package com.example.lms.Service;

import java.util.List;

import com.example.lms.Model.CourseRegistration;

public interface CourseRegistrationService {
    CourseRegistration createEnrollment(CourseRegistration courseRegistration);
    List<CourseRegistration> getAllRegistrationsByCourseCode(String courseCode);
    List<CourseRegistration> getAllRegistrationsByUserName(String userName);
    boolean checkIfExists(String userName, String courseCode);
}