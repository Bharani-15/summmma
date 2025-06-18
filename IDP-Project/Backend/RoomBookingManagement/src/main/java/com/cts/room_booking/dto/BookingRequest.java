package com.cts.room_booking.dto;



import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
public class BookingRequest {
    private int requiredSeats;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long empId;
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
    
    
}