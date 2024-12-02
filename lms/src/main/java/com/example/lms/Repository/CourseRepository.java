package com.example.lms.Repository;

import com.example.lms.Model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepository extends MongoRepository<Course, Long> {

}
