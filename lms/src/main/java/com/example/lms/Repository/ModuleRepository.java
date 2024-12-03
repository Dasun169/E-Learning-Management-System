package com.example.lms.Repository;

import com.example.lms.Model.Module;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ModuleRepository extends MongoRepository<Module, Long> {

}
