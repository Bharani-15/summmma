package com.cts.room_booking.repository;
 
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
 
import com.cts.room_booking.entities.Booking;
import com.cts.room_booking.entities.ConferenceRoom;
 
import jakarta.transaction.Transactional;
 
import java.time.LocalDateTime;
import java.util.List;
@Repository
public interface BookRepository extends JpaRepository<Booking, Long> {
    // Find all expired bookings where endTime has passed
    @Query("SELECT b FROM Booking b WHERE b.endTime < :now")
    List<Booking> findExpiredBookings(LocalDateTime now);
    // Find all bookings associated with a conference room
    List<Booking> findByConferenceRoom(ConferenceRoom conferenceRoom);

    @Modifying
    @Transactional
    @Query("UPDATE Booking b SET b.conferenceRoom.availability = true WHERE b.endTime < :now")
    void updateExpiredBookingAvailability(@Param("now") LocalDateTime now);

    @Query("SELECT b FROM Booking b LEFT JOIN FETCH b.conferenceRoom WHERE b.empId = :empId")
    List<Booking> findByEmpId(@Param("empId") Long empId);
    
    @Query("SELECT b FROM Booking b WHERE b.startTime BETWEEN :now AND :future")
    List<Booking> findUpcomingBookings(@Param("now") LocalDateTime now, @Param("future") LocalDateTime future);
 
 
 
}