package com.example.lms.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lms.Model.CourseRegistration;
import com.example.lms.Repository.CourseRegistrationRepository;
import com.example.lms.Service.CourseRegistrationService;

@Service
public class CourseRegistrationServiceImpl implements CourseRegistrationService {

    @Autowired
    private CourseRegistrationRepository courseRegistrationRepository;

    @Override
    public CourseRegistration createEnrollment(CourseRegistration courseRegistration) {
        return courseRegistrationRepository.save(courseRegistration);
    }

    @Override
    public List<CourseRegistration> getAllRegistrationsByCourseCode(String courseCode) {
        return courseRegistrationRepository.findAllByCourseCode(courseCode);
    }

    @Override
    public List<CourseRegistration> getAllRegistrationsByUserName(String userName) {
        return courseRegistrationRepository.findAllByUserName(userName);
    }

    @Override
    public boolean checkIfExists(String userName, String courseCode) {
        return courseRegistrationRepository.existsByUserNameAndCourseCode(userName, courseCode);
    }

    @Override
    public String getUserNameByCourseCodeAndRole(String courseCode, String role) {
        CourseRegistration registration = courseRegistrationRepository.findByCourseCodeAndRole(courseCode, role);
        return registration != null ? registration.getUserName() : null;
    }
}