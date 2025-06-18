package com.emailnotification.controller;

import com.emailnotification.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notify")
public class NotificationController {

    @Autowired
    private EmailSenderService emailSender;

    @GetMapping("/test")
    public String testEmail() {
        emailSender.sendEmail("jonan3666@gmail.com", "Test Subject", "Test Body");
        return "Test email sent!";
    }
}
