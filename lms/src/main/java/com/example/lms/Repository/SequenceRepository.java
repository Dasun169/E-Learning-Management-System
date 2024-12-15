package com.example.lms.Repository;

import com.example.lms.Model.Sequence;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SequenceRepository extends MongoRepository<Sequence, String> {
  
}
