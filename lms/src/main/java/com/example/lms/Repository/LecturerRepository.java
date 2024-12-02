package com.example.lms.Repository;

import com.example.lms.Model.Lecturer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LecturerRepository extends MongoRepository<Lecturer, Long> {

}
