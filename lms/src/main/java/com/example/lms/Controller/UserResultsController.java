package com.example.lms.Controller;

import com.example.lms.Model.UserResults;
import com.example.lms.Service.UserResultsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/userResults")
@CrossOrigin(origins = "http://localhost:5173")
public class UserResultsController {

    @Autowired
    private UserResultsService userResultsService;

    @PostMapping
    public ResponseEntity<UserResults> createUserResult(@RequestBody UserResults userResult) {
        return ResponseEntity.ok(userResultsService.createUserResult(userResult));
    }

    @PostMapping("/bulk") 
    public ResponseEntity<List<UserResults>> createMultipleUserResults(@RequestBody List<UserResults> userResults) {
        List<UserResults> createdResults = userResultsService.createMultipleUserResults(userResults);
        return ResponseEntity.ok(createdResults);
    }

    @GetMapping("/userName/{userName}")
    public ResponseEntity<List<UserResults>> getUserResultsByUserName(@PathVariable String userName) {
        return ResponseEntity.ok(userResultsService.getUserResultsByUserName(userName));
    }

    @PutMapping("/update/{userName}")
    public ResponseEntity<UserResults> updateUserResult(@PathVariable String userName, @RequestParam String result) {
        UserResults updatedResult = userResultsService.updateUserResult(userName, result);
        return updatedResult != null ? ResponseEntity.ok(updatedResult) : ResponseEntity.notFound().build();
    }
}