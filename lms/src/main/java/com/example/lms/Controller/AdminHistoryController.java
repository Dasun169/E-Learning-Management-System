package com.example.lms.Controller;

import com.example.lms.Model.AdminHistory;
import com.example.lms.Service.AdminHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({ "/api/adminHistory" })
@CrossOrigin(origins = "http://localhost:5173")
public class AdminHistoryController {

    @Autowired
    private AdminHistoryService adminHistoryService;

    @PostMapping 
    public ResponseEntity<AdminHistory> createAdminHistory(
            @RequestParam String userName,
            @RequestParam String role,
            @RequestParam String action
    ) {
        AdminHistory adminHistory = new AdminHistory(userName, role, action); 
        AdminHistory savedHistory = adminHistoryService.saveAdminHistory(adminHistory);
        return new ResponseEntity<>(savedHistory, HttpStatus.CREATED);
    }

    @GetMapping("/byDate") 
    public ResponseEntity<List<AdminHistory>> getAdminHistoryByDate() {
        List<AdminHistory> historyList = adminHistoryService.getAdminHistoryByDateAsc();
        return new ResponseEntity<>(historyList, HttpStatus.OK);
    }
}
