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

    @PutMapping("/update/{userName}/{courseCode}/{result}")
    public ResponseEntity<UserResults> updateUserResult(
            @PathVariable String userName,
            @PathVariable String courseCode,
            @PathVariable String result) {

        UserResults updatedResult = userResultsService.updateUserResult(userName, courseCode, result);
        return updatedResult != null ? ResponseEntity.ok(updatedResult) : ResponseEntity.notFound().build();
    }

    @GetMapping("/exists/{userName}/{courseCode}")  // New endpoint
    public boolean checkExistence(@PathVariable String userName, @PathVariable String courseCode) {
        return userResultsService.checkIfExists(userName, courseCode);
    }

    @GetMapping("/result/{userName}/{courseCode}")  // New endpoint
    public ResponseEntity<UserResults> getUserResult(
            @PathVariable String userName,
            @PathVariable String courseCode) {

        UserResults userResult = userResultsService.getUserResultByUserNameAndCourseCode(userName, courseCode);
        if (userResult != null) {
            return ResponseEntity.ok(userResult); // Return the entire UserResults object
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if not found
        }
    }
}