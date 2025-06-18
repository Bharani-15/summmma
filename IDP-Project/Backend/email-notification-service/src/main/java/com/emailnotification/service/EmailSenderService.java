package com.emailnotification.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Service class responsible for sending email notifications.
 */
@Service
public class EmailSenderService {

    // Injecting the JavaMailSender bean to handle email sending
    @Autowired
    private JavaMailSender mailSender;

    /**
     * Sends a simple email message.
     *
     * @param toEmail Recipient's email address
     * @param subject Subject of the email
     * @param body    Body content of the email
     */
    public void sendEmail(String toEmail, String subject, String body) {
        // Create a simple mail message object
        SimpleMailMessage message = new SimpleMailMessage();
        
        // Set recipient email address
        message.setTo(toEmail);
        
        // Set email subject
        message.setSubject(subject);
        
        // Set email body
        message.setText(body);
        
        // Set sender email address (must match the configured email in application properties)
        message.setFrom("mailsenderidp@gmail.com"); // Replace with your actual sender email
        
        // Send the email
        mailSender.send(message);
    }
}
