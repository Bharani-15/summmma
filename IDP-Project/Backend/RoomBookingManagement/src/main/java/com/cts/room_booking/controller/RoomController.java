package com.cts.room_booking.controller;
 
 
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cts.room_booking.dto.BookingDTO;
import com.cts.room_booking.dto.BookingRequest;
import com.cts.room_booking.dto.UpdateAvailabilityRequest;
import com.cts.room_booking.entities.Booking;
import com.cts.room_booking.entities.ConferenceRoom;
import com.cts.room_booking.service.RoomService;
 
import java.util.List;
import java.util.Map;
 
@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/roombooking")
public class RoomController {
 
    @Autowired
    private RoomService roomService;
 
   
    @GetMapping("/available/{requiredSeats}")
    public List<?> getConferenceRooms(@PathVariable int requiredSeats) {
        return roomService.getAvailableConferenceRooms(requiredSeats);
    }
    @PostMapping("/book/{roomId}")
    public String bookConferenceRoom(@PathVariable Long roomId, @RequestBody BookingRequest bookingRequest) {
        return roomService.bookConferenceRoom(
                roomId,
                bookingRequest.getRequiredSeats(),
                bookingRequest.getStartTime(),
                bookingRequest.getEndTime(),
                bookingRequest.getEmpId()
        );
    }
 
   
    @PutMapping("/update-availability")
    public String updateRoomAvailability(@RequestBody UpdateAvailabilityRequest request) {
        roomService.updateRoomAvailability(request.getRoomId(), request.getAvailability());
        return "Room availability updated to " + request.getAvailability();
    }
 
    @DeleteMapping("/cancel/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId) {
        String response = roomService.cancelBooking(bookingId);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/upcoming-bookings")
    public List<BookingDTO> getUpcomingBookings() {
        return roomService.getUpcomingBookings();
    }

    @GetMapping("/rooms-booked/{empId}")
    public List<Map<String, Object>> getRoomsByEmployee(@PathVariable Long empId) {
        return roomService.getRoomsBookedByEmployee(empId);
    }
}