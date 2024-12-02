package com.example.lms.Service;

import com.example.lms.Model.Lecturer;

import java.util.List;

public interface LecturerService {
    Lecturer createLecturer(Lecturer lecturer);
    List<Lecturer> getAllLecturers();
    Lecturer updateLecturer(long id, Lecturer lecturer);
    void deleteLecturer(long id);
}
