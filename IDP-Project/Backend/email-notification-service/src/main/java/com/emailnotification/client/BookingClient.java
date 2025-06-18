package com.emailnotification.client;

import com.emailnotification.dto.BookingDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "RoomBookingManagement")
public interface BookingClient {
    @GetMapping("/roombooking/upcoming-bookings")
    List<BookingDTO> getUpcomingBookings();
}
