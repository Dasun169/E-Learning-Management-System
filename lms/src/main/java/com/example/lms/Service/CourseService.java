package com.example.lms.Service;

import com.example.lms.Model.Course;

import java.util.List;

public interface CourseService {
    Course createCourse(Course course);
    Course getCourseById(long id);
    List<Course> getAllCourses();
    Course updateCourse(long id, Course course);
}
