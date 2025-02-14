package com.example.lms.Service;

import com.example.lms.Model.AdminHistory;
import java.util.List;

public interface AdminHistoryService {
    AdminHistory saveAdminHistory(AdminHistory adminHistory);
    List<AdminHistory> getAdminHistoryByDateAsc();
}