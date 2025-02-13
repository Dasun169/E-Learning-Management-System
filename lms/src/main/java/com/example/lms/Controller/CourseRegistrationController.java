package com.example.lms.Controller;

import com.example.lms.Model.CourseRegistration;
import com.example.lms.Service.CourseRegistrationService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({ "/api/courseRegistrations" })
@CrossOrigin(origins = "http://localhost:5173")
public class CourseRegistrationController {

    @Autowired
    private CourseRegistrationService courseRegistrationService;

    public CourseRegistrationController() {
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

    @GetMapping("/user/{userName}")
    public ResponseEntity<List<CourseRegistration>> getRegistrationsByUserName(@PathVariable String userName) {
        List<CourseRegistration> registrations = courseRegistrationService.getAllRegistrationsByUserName(userName);
        return ResponseEntity.ok(registrations);
    }

    @GetMapping("/exists/{userName}/{courseCode}")
    public boolean checkExistence(@PathVariable String userName, @PathVariable String courseCode) {
        return courseRegistrationService.checkIfExists(userName, courseCode);
    }

    @GetMapping("/single/{courseCode}/{role}")
    public ResponseEntity<String> getUserNameByCourseAndRole(
            @PathVariable String courseCode, @PathVariable String role) {
        String userName = courseRegistrationService.getUserNameByCourseCodeAndRole(courseCode, role);
        return ResponseEntity.ok(userName);
    }

    @DeleteMapping("/{userName}/{role}/{courseCode}")
    public ResponseEntity<Void> deleteRegistration(
            @PathVariable String userName, @PathVariable String role, @PathVariable String courseCode) {
        courseRegistrationService.deleteRegistration(userName, role, courseCode);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userName}/{role}")
    public ResponseEntity<List<CourseRegistration>> getRegistrationsByUserNameAndRole(
            @PathVariable String userName,
            @PathVariable String role) {
        List<CourseRegistration> registrations = courseRegistrationService
                .getAllRegistrationsByUserNameAndRole(userName, role);
        return ResponseEntity.ok(registrations);
    }
}