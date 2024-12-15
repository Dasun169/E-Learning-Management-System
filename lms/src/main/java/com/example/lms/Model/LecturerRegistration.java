package com.example.lms.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lecturer-registration")
public class LecturerRegistration {

    private long lecturerId;
    private String courseCode;

    public long getLecturerId() {
        return lecturerId;
    }

    public void setLecturerId(long lecturerId) {
        this.lecturerId = lecturerId;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }
}
