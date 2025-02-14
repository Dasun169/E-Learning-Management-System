package com.example.lms.Repository;

import com.example.lms.Model.AdminHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminHistoryRepository extends MongoRepository<AdminHistory, String> {
    List<AdminHistory> findAllByOrderByActionTimeAsc(); 
}