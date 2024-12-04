package com.example.lms.Service.Impl;

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
}