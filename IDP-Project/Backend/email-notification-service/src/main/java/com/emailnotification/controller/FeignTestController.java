package com.emailnotification.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emailnotification.client.BookingClient;

@RestController
@RequestMapping("/test")
public class FeignTestController {

    @Autowired
    private BookingClient bookingClient;

    @GetMapping("/upcoming-bookings")
    public ResponseEntity<?> testFeignCall() {
        try {
            return ResponseEntity.ok(bookingClient.getUpcomingBookings());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                                 .body("❌ Feign call failed: " + e.getMessage());
        }
    }
}
