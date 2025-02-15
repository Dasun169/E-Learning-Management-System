package com.example.lms.Model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "adminHistory")
public class AdminHistory {

  @Id
  private String id;
  private String userName;
  private String role;
  private String action;
  private LocalDateTime actionTime;

  public AdminHistory() {} 

  public AdminHistory(String userName, String role, String action) {  
    this.userName = userName;
    this.role = role;
    this.action = action;
    this.actionTime = LocalDateTime.now(); 
  }

  public String getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getAction() {
        return action;
    }

    public LocalDateTime getActionTime() {
        return actionTime;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setActionTime(LocalDateTime actionTime) {
        this.actionTime = actionTime;
    }
}