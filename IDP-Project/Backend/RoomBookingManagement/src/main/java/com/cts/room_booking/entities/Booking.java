package com.cts.room_booking.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
public class Booking {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int requiredSeats;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long empId;

    @ManyToOne
    @JoinColumn(name = "conference_room_id")
    @JsonBackReference
    private ConferenceRoom conferenceRoom;
	
    public Booking(Long id, int requiredSeats, LocalDateTime startTime, LocalDateTime endTime, Long empId,
			ConferenceRoom conferenceRoom) {
		super();
		this.id = id;
		this.requiredSeats = requiredSeats;
		this.startTime = startTime;
		this.endTime = endTime;
		this.empId = empId;
		this.conferenceRoom = conferenceRoom;
	}
    
    public Booking() {
    	
    }

	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getRequiredSeats() {
		return requiredSeats;
	}

	public void setRequiredSeats(int requiredSeats) {
		this.requiredSeats = requiredSeats;
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}

	public Long getEmpId() {
		return empId;
	}

	public void setEmpId(Long empId) {
		this.empId = empId;
	}

	public ConferenceRoom getConferenceRoom() {
		return conferenceRoom;
	}

	public void setConferenceRoom(ConferenceRoom conferenceRoom) {
		this.conferenceRoom = conferenceRoom;
	}


    // No need for explicit getters, setters, and constructors with @Data, @NoArgsConstructor, @AllArgsConstructor
}