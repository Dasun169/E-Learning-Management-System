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

    @GetMapping({ "/{id}" })
    public ResponseEntity<Course> getCourseById(@PathVariable long id) {
        Course course = this.courseService.getCourseById(id);
        return course != null ? ResponseEntity.ok(course) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> course = this.courseService.getAllCourses();
        return ResponseEntity.ok(course);
    }

    @PutMapping({ "/{id}" })
    public ResponseEntity<Course> updateCourse(@PathVariable long id, @RequestBody Course course) {
        Course updatedCourse = this.courseService.updateCourse(id, course);
        return updatedCourse != null ? ResponseEntity.ok(updatedCourse) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{courseCode}")
    public String deleteCourse(@PathVariable String courseCode) {
        try {
            courseService.deleteCourseByCourseCode(courseCode);
            return "Course with code " + courseCode + " has been deleted successfully.";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }
    
}
