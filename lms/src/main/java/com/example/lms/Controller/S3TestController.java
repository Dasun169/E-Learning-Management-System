package com.example.lms.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/s3")
public class S3TestController {

    @Autowired
    private S3Client s3Client;

    @GetMapping("/buckets")
    public List<String> listBuckets() {
        return s3Client.listBuckets().buckets().stream()
                .map(bucket -> bucket.name())
                .collect(Collectors.toList());
    }
}