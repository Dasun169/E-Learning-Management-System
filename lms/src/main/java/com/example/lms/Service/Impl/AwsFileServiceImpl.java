package com.example.lms.Service.Impl;

import com.example.lms.Model.AwsFile;
import com.example.lms.Repository.AwsFileRepository;
import com.example.lms.Service.AwsFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class AwsFileServiceImpl implements AwsFileService {

    @Autowired
    private S3Client s3Client;

    @Autowired
    private AwsFileRepository awsFileRepository;

    private static final String BUCKET_NAME = "lmsawsstorage";

    @Override
    public String uploadFile(MultipartFile file, String courseCode, String header) {
        try {
            // Upload file to S3
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            s3Client.putObject(
                PutObjectRequest.builder()
                    .bucket(BUCKET_NAME)
                    .key(fileName)
                    .build(),
                RequestBody.fromInputStream(file.getInputStream(), file.getSize())
            );

            // Generate file URL
            String fileUrl = "https://" + BUCKET_NAME + ".s3.amazonaws.com/" + fileName;

            // Save file metadata to MongoDB
            AwsFile awsFile = new AwsFile();
            awsFile.setCourseCode(courseCode);
            awsFile.setHeader(header);
            awsFile.setFileUrl(fileUrl);
            awsFileRepository.save(awsFile);

            return fileUrl;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file", e);
        }
    }

    @Override
    public List<AwsFile> getFilesByCourseCode(String courseCode) {
        return awsFileRepository.findByCourseCode(courseCode);
    }

    @Override
    public List<AwsFile> getFilesByCourseCodeAndHeader(String courseCode, String header) {
        return awsFileRepository.findByCourseCodeAndHeader(courseCode, header);
    }
}