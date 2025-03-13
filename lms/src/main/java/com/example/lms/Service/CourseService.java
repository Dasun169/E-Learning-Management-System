package com.example.lms.Service;

import com.example.lms.Model.Course;

import java.util.List;

public interface CourseService {
    Course createCourse(Course course);
    List<Course> createCoursesBatch(List<Course> courses);
    List<Course> getAllCourses();
    boolean doesCourseExistByCourseCode(String courseCode);
    void deleteCourseByCourseCode(String courseCode);
    Course getCourseByCourseCode(String courseCode);
    List<Course> getCoursesByNamePrefixAndYearLevel(String courseNamePrefix, String yearLevel);
    Course updateDescriptionByCourseCode(String courseCode, String description);
    String getDescriptionByCourseCode(String courseCode);
    List<Course> getCoursesByNamePrefix(String courseNamePrefix);
    List<Course> getCoursesByCodePrefixAndYearLevel(String courseCodePrefix, String yearLevel);
    String getEnrollmentKeyByCourseCodeAlt(String courseCode);
    String getYearLevelByCourseCode(String courseCode);
}