package com.example.lms.Repository;

import com.example.lms.Model.AwsFile;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AwsFileRepository extends MongoRepository<AwsFile, String> {
    List<AwsFile> findByCourseCodeAndHeader(String courseCode, String header);
    List<AwsFile> findByCourseCode(String courseCode);
}