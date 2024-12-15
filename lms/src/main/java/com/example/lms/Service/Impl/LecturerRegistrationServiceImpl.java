package com.example.lms.Service.Impl;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lms.Model.LecturerRegistration;
import com.example.lms.Repository.LecturerRegistrationRepository;
import com.example.lms.Service.LecturerRegistrationService;

@Service
public class LecturerRegistrationServiceImpl implements LecturerRegistrationService {

    @Autowired
    private LecturerRegistrationRepository lecturerRegistrationRepository;

    @Override
    public LecturerRegistration save(LecturerRegistration lecturerRegistration) {
        return lecturerRegistrationRepository.save(lecturerRegistration);
    }

    @Override
    public Optional<Long> retrieveLecturerId(String courseCode) {
        return lecturerRegistrationRepository.findAll().stream()
            .filter(registration -> registration.getCourseCode().equals(courseCode))
            .map(LecturerRegistration::getLecturerId)
            .findFirst();
    }

    @Override
    public List<String> getCourseCodesByLecturerId(long lecturerId) {
        return lecturerRegistrationRepository.findAll().stream()
            .filter(registration -> registration.getLecturerId() == lecturerId)
            .map(LecturerRegistration::getCourseCode)
            .collect(Collectors.toList());
    }
}
