package com.example.lms.Controller;

import com.example.lms.Model.Lecturer;
import com.example.lms.Service.LecturerService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({ "/api/lecturers" })
public class LecturerController {

    @Autowired
    private LecturerService lecturerService;

    public LecturerController() {
    }

    @PostMapping
    public ResponseEntity<Lecturer> createLecturer(@RequestBody Lecturer lecturer) {
        Lecturer createdLecturer = this.lecturerService.createLecturer(lecturer);
        return ResponseEntity.ok(createdLecturer);
    }

    @GetMapping
    public ResponseEntity<List<Lecturer>> getAllLecturers() {
        List<Lecturer> lecturer = this.lecturerService.getAllLecturers();
        return ResponseEntity.ok(lecturer);
    }

    @PutMapping({ "/{id}" })
    public ResponseEntity<Lecturer> updateLecturer(@PathVariable long id, @RequestBody Lecturer lecturer) {
        Lecturer updatedLecturer = this.lecturerService.updateLecturer(id, lecturer);
        return updatedLecturer != null ? ResponseEntity.ok(updatedLecturer) : ResponseEntity.notFound().build();
    }

    @DeleteMapping({ "/{id}" })
    public ResponseEntity<Void> deleteLecturer(@PathVariable long id) {
        this.lecturerService.deleteLecturer(id);
        return ResponseEntity.noContent().build();
    }
}
