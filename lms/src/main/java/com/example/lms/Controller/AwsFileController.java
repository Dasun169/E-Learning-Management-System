package com.example.lms.Controller;

import com.example.lms.Model.AwsFile;
import com.example.lms.Service.AwsFileService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/aws")
public class AwsFileController {

    @Autowired
    private AwsFileService awsFileService;

    @PostMapping("/upload")
    public String uploadFile(
        @RequestParam("file") MultipartFile file,
        @RequestParam("courseCode") String courseCode,
        @RequestParam("header") String header
    ) {
        return awsFileService.uploadFile(file, courseCode, header);
    }

    @GetMapping("/files/{courseCode}")
    public List<AwsFile> getFilesByCourseCode(@PathVariable String courseCode) {
        return awsFileService.getFilesByCourseCode(courseCode);
    }

    @GetMapping("/files/{courseCode}/{header}")
    public List<AwsFile> getFilesByCourseCodeAndHeader(
        @PathVariable String courseCode,
        @PathVariable String header
    ) {
        return awsFileService.getFilesByCourseCodeAndHeader(courseCode, header);
    }
}