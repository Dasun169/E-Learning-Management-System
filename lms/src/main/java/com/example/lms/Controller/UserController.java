package com.example.lms.Controller;

import com.example.lms.Model.User;
import com.example.lms.Service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({ "/api/users" })
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    public UserController() {

    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = this.userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> user = this.userService.getAllUsers();
        return ResponseEntity.ok(user);
    }

    @PutMapping({ "/{id}" })
    public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User user) {
        User updatedUser = this.userService.updateUser(id, user);
        return updatedUser != null ? ResponseEntity.ok(updatedUser) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{userName}")
    public ResponseEntity<User> getUserByUserName(@PathVariable String userName) {
        User user = userService.getUserByUserName(userName); // Add this method in your service to fetch the user by username.
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.status(404).build(); // Return 404 if not found
    }

    @DeleteMapping("/{userName}")
    public ResponseEntity<String> deleteUserByUserName(@PathVariable String userName) {
        boolean deleted = userService.deleteUserByUserName(userName); // Returns boolean for success or failure
        if (deleted) {
            return ResponseEntity.status(204).body("Lecturer account deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Error: Lecturer not found.");
        }
    }
}
