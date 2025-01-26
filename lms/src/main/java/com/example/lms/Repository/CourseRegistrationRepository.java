package com.example.lms.Repository;

import com.example.lms.Model.CourseRegistration;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRegistrationRepository extends MongoRepository<CourseRegistration, String> {
  List<CourseRegistration> findAllByUserName(String userName);
  List<CourseRegistration> findAllByCourseCode(String courseCode);
  boolean existsByUserNameAndCourseCode(String userName, String courseCode);
}