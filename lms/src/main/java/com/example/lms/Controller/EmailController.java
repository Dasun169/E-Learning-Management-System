package com.example.lms.Controller;

import com.example.lms.Model.UserRegistrationDto;
import com.example.lms.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public String sendEmail(@RequestBody UserRegistrationDto userRegistrationDto) {
        // Extract necessary fields from the DTO (UserRegistrationDto)
        String email = userRegistrationDto.getEmail();
        String fullName = userRegistrationDto.getFullName();
        String userName = userRegistrationDto.getUserName();
        String contactNumber = userRegistrationDto.getContactNumber();

        // Compose the email content
        String subject = "Registration Confirmation";
        String text = "Hello " + fullName + ",\n\n"
                + "Thank you for registering!\n\n"
                + "Here are your registration details:\n"
                + "- Full Name: " + fullName + "\n"
                + "- Username: " + userName + "\n"
                + "- Contact Number: " + contactNumber + "\n\n"
                + "Welcome to our platform!\n\n"
                + "Best regards,\nThe Team";

        try {
            // Send the email
            emailService.sendEmail(email, subject, text);
            return "Email sent successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send email.";
        }
    }
}
