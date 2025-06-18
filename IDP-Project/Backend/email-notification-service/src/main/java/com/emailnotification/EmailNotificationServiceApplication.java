package com.emailnotification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main class for the Email Notification Service application.
 * Enables Feign clients for REST communication and scheduling for periodic tasks.
 */
@SpringBootApplication
@EnableFeignClients
@EnableScheduling
public class EmailNotificationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmailNotificationServiceApplication.class, args);
    }
}
