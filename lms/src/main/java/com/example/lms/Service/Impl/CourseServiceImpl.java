package com.example.lms.Service.Impl;

import com.example.lms.Model.Course;
import com.example.lms.Repository.CourseRepository;
import com.example.lms.Service.CourseService;

import java.util.List;
//import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;


    @Override
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public List<Course> createCoursesBatch(List<Course> courses) {
        return courseRepository.saveAll(courses); // Batch saving
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public boolean doesCourseExistByCourseCode(String courseCode) {
        Course course = courseRepository.findByCourseCode(courseCode);
        return course != null; 
    }

    @Override
    public void deleteCourseByCourseCode(String courseCode) {
        Course course = courseRepository.findByCourseCode(courseCode);
        if (course != null) {
            courseRepository.deleteByCourseCode(courseCode);
        } else {
            throw new RuntimeException("Course with code " + courseCode + " not found.");
        }
    }

    @Override
    public Course getCourseByCourseCode(String courseCode) {
        return courseRepository.findByCourseCode(courseCode);
    }

    @Override
    public List<Course> getCoursesByNamePrefixAndYearLevel(String courseNamePrefix, String yearLevel) {
        return courseRepository.findByCourseNameStartingWithAndYearLevel(courseNamePrefix, yearLevel);
    }

    @Override
    public Course updateDescriptionByCourseCode(String courseCode, String description) {
        Course course = courseRepository.findByCourseCode(courseCode);
        if (course != null) {
            course.setDescription(description);
            return courseRepository.save(course);
        }
        throw new RuntimeException("Course with code " + courseCode + " not found.");
    }

    @Override
    public String getDescriptionByCourseCode(String courseCode) {
        Course course = courseRepository.findDescriptionByCourseCode(courseCode);
        if (course != null) {
            return course.getDescription();
        }
        throw new RuntimeException("Course with code " + courseCode + " not found.");
    }

    @Override
    public List<Course> getCoursesByNamePrefix(String courseNamePrefix) {
        return courseRepository.findByCourseCodeStartingWith(courseNamePrefix);
    }

    @Override
    public List<Course> getCoursesByCodePrefixAndYearLevel(String courseCodePrefix, String yearLevel) {
        return courseRepository.findByCourseCodeStartingWithAndYearLevel(courseCodePrefix, yearLevel);
    }

    @Override
    public String getEnrollmentKeyByCourseCodeAlt(String courseCode) {
      Course course = courseRepository.findByCourseCode(courseCode);
      return course != null ? course.getEnrollmentKey() : null;
    }

    @Override
    public String getYearLevelByCourseCode(String courseCode) {
        Course course = courseRepository.findByCourseCode(courseCode);
        if(course != null){
            return course.getYearLevel();
        }
        return null; // Or throw an exception if you prefer
    }
}
