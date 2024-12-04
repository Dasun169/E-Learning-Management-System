package com.example.lms.Service;

import com.example.lms.Model.CourseRegistration;

public interface CourseRegistrationService {
    CourseRegistration createEnrollment(CourseRegistration courseRegistration);
}