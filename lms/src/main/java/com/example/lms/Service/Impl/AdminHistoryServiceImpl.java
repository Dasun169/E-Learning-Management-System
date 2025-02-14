package com.example.lms.Service.Impl;

import com.example.lms.Model.AdminHistory;
import com.example.lms.Repository.AdminHistoryRepository;
import com.example.lms.Service.AdminHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminHistoryServiceImpl implements AdminHistoryService {

    @Autowired
    private AdminHistoryRepository adminHistoryRepository;

    @Override
    public AdminHistory saveAdminHistory(AdminHistory adminHistory) {
        return adminHistoryRepository.save(adminHistory);
    }

    @Override
    public List<AdminHistory> getAdminHistoryByDateAsc() {
        return adminHistoryRepository.findAllByOrderByActionTimeAsc();
    }
}