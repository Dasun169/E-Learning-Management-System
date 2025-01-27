package com.example.lms.Repository;

import com.example.lms.Model.Course;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface CourseRepository extends MongoRepository<Course, Long> {
  Course findByCourseCode(String courseCode); 
  void deleteByCourseCode(String courseCode); 

  @Query("{ 'courseName': { $regex: '^?0', $options: 'i' }, 'yearLevel': ?1 }")
  List<Course> findByCourseNameStartingWithAndYearLevel(String courseNamePrefix, String yearLevel);
}
