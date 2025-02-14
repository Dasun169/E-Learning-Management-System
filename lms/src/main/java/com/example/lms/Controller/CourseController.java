package com.example.lms.Controller;

import com.example.lms.Model.Course;
import com.example.lms.Service.CourseService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping({ "/api/courses" })
public class CourseController {

    @Autowired
    private CourseService courseService;

    public CourseController() {
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course createdCourse = this.courseService.createCourse(course);
        return ResponseEntity.ok(createdCourse);
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> course = this.courseService.getAllCourses();
        return ResponseEntity.ok(course);
    }

    @GetMapping("/exists/{courseCode}")
    public ResponseEntity<String> checkIfCourseExists(@PathVariable String courseCode) {
        boolean exists = courseService.doesCourseExistByCourseCode(courseCode);
        if (exists) {
            return ResponseEntity.ok("Course with code " + courseCode + " exists.");
        } else {
            return ResponseEntity.status(404).body("Course with code " + courseCode + " not found.");
        }
    }

    @DeleteMapping("/delete/{courseCode}")
    public ResponseEntity<String> deleteCourse(@PathVariable String courseCode) {
        try {
            courseService.deleteCourseByCourseCode(courseCode);
            return ResponseEntity.ok("Course with code " + courseCode + " has been deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/search/{courseNamePrefix}/{yearLevel}")
    public ResponseEntity<List<Course>> getCoursesByNamePrefixAndYearLevel(
            @PathVariable String courseNamePrefix, @PathVariable String yearLevel) {
        List<Course> courses = courseService.getCoursesByNamePrefixAndYearLevel(courseNamePrefix, yearLevel);
        return courses.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(courses);
    }

    @PutMapping("/update-description/{courseCode}")
    public ResponseEntity<Course> updateDescriptionByCourseCode(
            @PathVariable String courseCode, @RequestBody String description) {
        try {
            Course updatedCourse = courseService.updateDescriptionByCourseCode(courseCode, description);
            return ResponseEntity.ok(updatedCourse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/description/{courseCode}")
    public ResponseEntity<String> getDescriptionByCourseCode(@PathVariable String courseCode) {
        try {
            String description = courseService.getDescriptionByCourseCode(courseCode);
            return ResponseEntity.ok(description);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/search-by-name/{courseNamePrefix}")
    public ResponseEntity<List<Course>> getCoursesByNamePrefix(@PathVariable String courseNamePrefix) {
        List<Course> courses = courseService.getCoursesByNamePrefix(courseNamePrefix);
        return courses.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(courses);
    }

    @GetMapping("/search-by-code/{courseCodePrefix}/{yearLevel}")
    public ResponseEntity<List<Course>> getCoursesByCodePrefixAndYearLevel(
            @PathVariable String courseCodePrefix, @PathVariable String yearLevel) {
        List<Course> courses = courseService.getCoursesByCodePrefixAndYearLevel(courseCodePrefix, yearLevel);
        return courses.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(courses);
    }

    @GetMapping("/by-code/{courseCode}")
    public ResponseEntity<Course> getCourseByCode(@PathVariable String courseCode) {
        Course course = courseService.getCourseByCourseCode(courseCode);
        if (course != null) {
            return ResponseEntity.ok(course);
        } else {
            return ResponseEntity.notFound().build(); // 404 if not found
        }
    }

    @GetMapping("/enrollment-key/{courseCode}")
    public ResponseEntity<String> getEnrollmentKeyAlt(@PathVariable String courseCode) {
        String enrollmentKey = courseService.getEnrollmentKeyByCourseCodeAlt(courseCode);
        if (enrollmentKey != null) {
            return ResponseEntity.ok(enrollmentKey);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/yearLevel/{courseCode}") // New endpoint
    public ResponseEntity<String> getYearLevelByCourseCodeAlt(@PathVariable String courseCode) {
        String yearLevel = courseService.getYearLevelByCourseCode(courseCode);
        if (yearLevel != null) {
            return ResponseEntity.ok(yearLevel);
        } else {
            return ResponseEntity.notFound().build(); // 404 if not found
        }
    }
}
