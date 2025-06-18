package com.cts.room_booking.service;

import com.cts.room_booking.client.EmployeeClient;
import com.cts.room_booking.dto.BookingDTO;
import com.cts.room_booking.dto.ConferenceRoomDTO;
import com.cts.room_booking.dto.EmployeeDTO;
import com.cts.room_booking.entities.Booking;
import com.cts.room_booking.entities.ConferenceRoom;
import com.cts.room_booking.repository.BookRepository;
import com.cts.room_booking.repository.ConferenceRoomRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    private ConferenceRoomRepository conferenceRoomRepository;

    @Autowired
    private BookRepository bookingRepository;

    @Autowired
    private TaskScheduler taskScheduler; 
    
    @Autowired
    private EmployeeClient employeeClient;

    private void sendReminderNotification(Booking booking) {
        Long employeeId = booking.getEmpId();
        String employeeEmail = employeeId + "@cts.com";
        LocalDateTime startTime = booking.getStartTime();
        String roomName = booking.getConferenceRoom().getRoomName();

        String reminderMessage = String.format(
                "Reminder: You have a booking for '%s' starting at %s.",
                roomName,
                startTime.toString()
        );

        System.out.println("Sending notification to: " + employeeEmail);
        System.out.println("Message: " + reminderMessage);
    }

    private void scheduleImmediateReminder(Booking booking) {
        LocalDateTime sendAt = LocalDateTime.now(java.time.Clock.system(java.time.ZoneId.of("Asia/Kolkata")))
                .plus(2, ChronoUnit.MINUTES);

        taskScheduler.schedule(() -> sendReminderNotification(booking),
                sendAt.atZone(java.time.ZoneId.of("Asia/Kolkata")).toInstant());
        System.out.println("Scheduled immediate reminder for booking ID " + booking.getId() + " to be sent at " + sendAt);
    }

    public List<ConferenceRoomDTO> getAvailableConferenceRooms(int requiredSeats) {
        return conferenceRoomRepository.findAvailableConferenceRooms(requiredSeats);
    }

    public String bookConferenceRoom(Long roomId, int requiredSeats, LocalDateTime startTime, LocalDateTime endTime, Long empId) {
    	try {
    	    ResponseEntity<EmployeeDTO> response = employeeClient.getEmployeeById(empId);
    	    if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
    	        return "Invalid employee ID: " + empId;
    	    }
 
    	    EmployeeDTO employee = response.getBody();
    	    System.out.println("Booking requested by employee: " + employee.getName() + " (" + employee.getDomain() + ")");
    	} catch (Exception e) {
    	    return "Employee validation failed: Enter a Valid Employee " ;
    	}
    	
    	Optional<ConferenceRoom> optionalRoom = conferenceRoomRepository.findById(roomId);
        if (optionalRoom.isEmpty()) {
            return "Room not found.";
        }

        ConferenceRoom room = optionalRoom.get();
        if (!room.isAvailability() || !room.getRoomType().equalsIgnoreCase("Conference")) {
            return "Only available conference rooms can be booked.";
        }

        if (startTime.isBefore(LocalDateTime.now(java.time.Clock.system(java.time.ZoneId.of("Asia/Kolkata")))) ||
                endTime.isBefore(startTime)) {
            return "Invalid booking times.";
        }

        Booking booking = new Booking(null, requiredSeats, startTime, endTime, empId, room);
        bookingRepository.save(booking);

        room.setAvailability(false);
        conferenceRoomRepository.save(room);

        scheduleImmediateReminder(booking);

        LocalDateTime releaseTime = endTime.plus(60, ChronoUnit.SECONDS);
        scheduleRoomRelease(roomId, releaseTime);

        return "Booking ID: " + booking.getId() + " Conference room booked: " + room.getRoomName() + " from " + startTime + " to " + endTime + ". A reminder will be sent in 2 minutes.";
    }

    private void scheduleRoomRelease(Long roomId, LocalDateTime releaseTime) {
        taskScheduler.schedule(() -> {
            Optional<ConferenceRoom> optionalRoom = conferenceRoomRepository.findById(roomId);
            if (optionalRoom.isPresent()) {
                ConferenceRoom room = optionalRoom.get();
                room.setAvailability(true);
                conferenceRoomRepository.save(room);
                System.out.println("✅ Room ID " + roomId + " automatically released at " +
                        LocalDateTime.now(java.time.Clock.system(java.time.ZoneId.of("Asia/Kolkata"))));
            } else {
                System.out.println("⚠️ Room ID " + roomId + " not found when trying to release automatically.");
            }
        }, releaseTime.atZone(java.time.ZoneId.of("Asia/Kolkata")).toInstant());
    }

    @Transactional
    public void updateRoomAvailability(Long roomId, boolean availability) {
        Optional<ConferenceRoom> optionalRoom = conferenceRoomRepository.findById(roomId);
        if (optionalRoom.isPresent()) {
            conferenceRoomRepository.updateAvailability(roomId, availability);
            System.out.println("✅ Updated availability for Room ID " + roomId);
        } else {
            System.out.println("⚠️ Room ID " + roomId + " not found.");
        }
    }
    
    @Scheduled(fixedRate = 60000) // Runs every 1 minute
    @Transactional
    public void updateRoomAvailabilityAutomatically() {
        LocalDateTime now = LocalDateTime.now(java.time.Clock.system(java.time.ZoneId.of("Asia/Kolkata")));
        
        System.out.println("🔍 Checking for expired bookings at " + now);
        
        List<Booking> expiredBookings = bookingRepository.findExpiredBookings(now);
        System.out.println("➡️ Expired bookings count: " + expiredBookings.size());

        bookingRepository.updateExpiredBookingAvailability(now);
        System.out.println("✅ Booking availability updated in database.");

        for (Booking booking : expiredBookings) {
            ConferenceRoom room = booking.getConferenceRoom();

            if (room != null) {
                bookingRepository.delete(booking);
                System.out.println("❌ Deleted expired booking ID: " + booking.getId());

                Optional<ConferenceRoom> optionalRoom = conferenceRoomRepository.findById(room.getId());
                if (optionalRoom.isPresent()) {
                    ConferenceRoom updatedRoom = optionalRoom.get();
                    updatedRoom.setAvailability(true);
                    conferenceRoomRepository.save(updatedRoom);
                    System.out.println("✅ Room ID " + updatedRoom.getId() + " is now available.");
                } else {
                    System.out.println("⚠️ Room ID " + room.getId() + " not found.");
                }
            }
        }

        System.out.println("🚀 Automatic room availability update completed.");
    }



   
    
    public String cancelBooking(Long bookingId) {
        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        
        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();
            ConferenceRoom room = booking.getConferenceRoom();
            
            // Set room availability back to true
            room.setAvailability(true);
            conferenceRoomRepository.save(room);
            
            // Delete the booking from the database
            bookingRepository.deleteById(bookingId);

            return "Booking cancelled successfully!";
        } else {
            return "Booking not found!";
        }
    }

    public List<Map<String, Object>> getRoomsBookedByEmployee(Long empId) {
        List<Booking> bookings = bookingRepository.findByEmpId(empId);

        return bookings.stream().map(booking -> {
            Map<String, Object> bookingDetails = new HashMap<>();
            bookingDetails.put("id", booking.getId()); // ✅ Add Booking ID
            bookingDetails.put("roomName", booking.getConferenceRoom().getRoomName());
            bookingDetails.put("noOfSeats", booking.getConferenceRoom().getNoOfSeats());
            bookingDetails.put("building", booking.getConferenceRoom().getBuilding());
            bookingDetails.put("startTime", booking.getStartTime());
            bookingDetails.put("endTime", booking.getEndTime());
            return bookingDetails;
        }).collect(Collectors.toList());
    }
    
    public List<BookingDTO> getUpcomingBookings() {
        LocalDateTime now = LocalDateTime.now(java.time.Clock.system(java.time.ZoneId.of("Asia/Kolkata")));
        LocalDateTime future = now.plusMinutes(15);
 
        List<Booking> bookings = bookingRepository.findUpcomingBookings(now, future);
 
        return bookings.stream()
                .map(b -> new BookingDTO(
                        b.getId(),
                        b.getEmpId(),
                        b.getConferenceRoom().getRoomName(),
                        b.getStartTime(), future))
                .toList();
    }





}