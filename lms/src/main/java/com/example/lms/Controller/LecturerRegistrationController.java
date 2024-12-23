package com.example.lms.Controller;

import com.example.lms.Model.LecturerRegistration;
import com.example.lms.Service.LecturerRegistrationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/lecturerRegistration")
public class LecturerRegistrationController {

    @Autowired
    private LecturerRegistrationService lecturerService;

    @PostMapping("/save")
    public ResponseEntity<LecturerRegistration> save(@RequestBody LecturerRegistration lecturerRegistration) {
        return ResponseEntity.ok(lecturerService.save(lecturerRegistration));
    }

    @GetMapping("/lecturerId/{courseCode}")
    public ResponseEntity<Long> retrieveLecturerId(@PathVariable String courseCode) {
        Optional<Long> lecturerId = lecturerService.retrieveLecturerId(courseCode);
        return lecturerId.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/courseCodes/{lecturerId}")
    public ResponseEntity<List<String>> getCourseCodesByLecturerId(@PathVariable long lecturerId) {
        return ResponseEntity.ok(lecturerService.getCourseCodesByLecturerId(lecturerId));
    }
}
