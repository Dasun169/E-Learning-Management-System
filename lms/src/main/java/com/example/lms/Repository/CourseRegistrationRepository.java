package com.example.lms.Repository;

import com.example.lms.Model.CourseRegistration;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRegistrationRepository extends MongoRepository<CourseRegistration, String> {

}