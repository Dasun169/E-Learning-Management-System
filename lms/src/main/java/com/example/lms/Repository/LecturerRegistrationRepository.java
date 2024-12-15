package com.example.lms.Repository;

import com.example.lms.Model.LecturerRegistration;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LecturerRegistrationRepository extends MongoRepository<LecturerRegistration, Long> {

}
