package com.example.lms.Service;

import java.util.List;
import java.util.Optional;

import com.example.lms.Model.LecturerRegistration;

public interface LecturerRegistrationService {
    LecturerRegistration save(LecturerRegistration lecturerRegistration); 
    Optional<Long> retrieveLecturerId(String courseCode);
    List<String> getCourseCodesByLecturerId(long lecturerId); 
}