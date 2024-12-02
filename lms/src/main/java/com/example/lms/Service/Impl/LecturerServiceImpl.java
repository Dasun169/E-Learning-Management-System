package com.example.lms.Service.Impl;

import com.example.lms.Model.Lecturer;
import com.example.lms.Repository.LecturerRepository;
import com.example.lms.Service.LecturerService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LecturerServiceImpl implements LecturerService {

    @Autowired
    private LecturerRepository lecturerRepository;

    @Override
    public Lecturer createLecturer(Lecturer lecturer) {
        return lecturerRepository.save(lecturer);
    }

    @Override
    public List<Lecturer> getAllLecturers() {
        return lecturerRepository.findAll();
    }

    @Override
    public Lecturer updateLecturer(long id, Lecturer lecturer) {
        if (lecturerRepository.existsById(id)) {
            lecturer.setId(id);
            return lecturerRepository.save(lecturer);
        }
        return null;
    }

    @Override
    public void deleteLecturer(long id) {
        lecturerRepository.deleteById(id);
    }
}
