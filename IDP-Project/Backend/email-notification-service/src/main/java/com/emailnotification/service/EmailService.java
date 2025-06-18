package com.emailnotification.service;

import com.emailnotification.client.BookingClient;
import com.emailnotification.dto.BookingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EmailService {

    @Autowired
    private BookingClient bookingClient;

    @Autowired
    private EmailSenderService emailSender;

    // Track reminders already sent (in-memory)
    private final Set<Long> remindedBookingIds = ConcurrentHashMap.newKeySet();

    @Scheduled(fixedRate = 60000) // Every 1 minute
    public void sendReminders() {
        LocalDateTime now = LocalDateTime.now();
        System.out.println("⏰ Scheduled reminder check triggered at: " + now);

        List<BookingDTO> bookings = bookingClient.getUpcomingBookings();

        for (BookingDTO booking : bookings) {
            LocalDateTime startTime = booking.getStartTime();

            // Check if the booking starts in exactly 5 minutes (±30 seconds buffer)
            long minutesUntilStart = ChronoUnit.MINUTES.between(now, startTime);
//            long secondsUntilStart = ChronoUnit.SECONDS.between(now, startTime);

            if (minutesUntilStart <= 5 ) {
                if (!remindedBookingIds.contains(booking.getBookingId())) {
                    String email = "jonan3666@gmail.com"; // Replace with dynamic logic if needed
                    String message = String.format(
                    	    "Hello,\n\nThis is a friendly reminder that your booking for '%s' is scheduled to start at %s.\n\n" +
                    	    "Please ensure you're ready ahead of time. If you have any questions or need to make changes, feel free to reach out.\n\n" +
                    	    "Thank you,\nConference Team.",
                    	    booking.getRoomName(), booking.getStartTime()
                    	);


                    emailSender.sendEmail(email, "Conference Room Booking Reminder", message);
                    remindedBookingIds.add(booking.getBookingId());

                    System.out.println("📧 Reminder sent for booking ID: " + booking.getBookingId());
                }
            //}
        }
    }
    }
}


