package com.example.lms.Controller;

import com.example.lms.Model.CourseRegistration;
import com.example.lms.Service.CourseRegistrationService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/courseRegistrations"})
public class CourseRegistrationController {

    @Autowired
    private CourseRegistrationService courseRegistrationService;

    public CourseRegistrationController(){
    }

    @PostMapping
    public ResponseEntity<CourseRegistration> createEnrollment(@RequestBody CourseRegistration courseRegistration) {
        CourseRegistration createdEnrollment = this.courseRegistrationService.createEnrollment(courseRegistration);
        return ResponseEntity.ok(createdEnrollment);
    }

    @GetMapping("/course/{courseCode}")
    public ResponseEntity<List<CourseRegistration>> getRegistrationsByCourseCode(@PathVariable String courseCode) {
        List<CourseRegistration> registrations = courseRegistrationService.getAllRegistrationsByCourseCode(courseCode);
        return ResponseEntity.ok(registrations);
    }
}