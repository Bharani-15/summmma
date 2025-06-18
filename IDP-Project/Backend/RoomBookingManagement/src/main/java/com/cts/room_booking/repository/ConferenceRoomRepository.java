package com.cts.room_booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cts.room_booking.dto.ConferenceRoomDTO;
import com.cts.room_booking.entities.ConferenceRoom;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ConferenceRoomRepository extends JpaRepository<ConferenceRoom, Long> {

    /** ✅ Newly Added Function */
    @Query("SELECT new com.cts.room_booking.dto.ConferenceRoomDTO(r.id, r.roomName, r.noOfSeats, r.building, r.availability, r.roomType) FROM ConferenceRoom r WHERE r.availability = true AND r.noOfSeats >= :requiredSeats ORDER BY r.noOfSeats")
    List<ConferenceRoomDTO> findAvailableConferenceRooms(@Param("requiredSeats") int requiredSeats);

    // Explicit update method for room availability via JSON request
    @Modifying
    @Transactional
    @Query("UPDATE ConferenceRoom r SET r.availability = :availability WHERE r.id = :roomId")
    void updateAvailability(@Param("roomId") Long roomId, @Param("availability") boolean availability);

    @Query("SELECT r FROM ConferenceRoom r WHERE r.id = :roomId")
    ConferenceRoom findRoomById(@Param("roomId") Long roomId);

    @Modifying
    @Transactional
    @Query("UPDATE ConferenceRoom r SET r.availability = true WHERE r.id IN (SELECT b.conferenceRoom.id FROM Booking b WHERE b.endTime < :now)")
    void updateAvailabilityForExpiredBookings(@Param("now") LocalDateTime now);
}
