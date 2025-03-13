package com.example.lms.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.lms.Model.AwsFile;

public interface AwsFileService {
    String uploadFile(MultipartFile file, String courseCode, String header);
    List<AwsFile> getFilesByCourseCode(String courseCode);
    List<AwsFile> getFilesByCourseCodeAndHeader(String courseCode, String header);
}