package com.emailnotification.dto;


import java.time.LocalDateTime;


public class BookingDTO {
	private Long bookingId;
    private Long empId;
    private String roomName;
    private LocalDateTime startTime;
	public Long getBookingId() {
		return bookingId;
	}
	public void setBookingId(Long id) {
		this.bookingId = id;
	}
	public Long getEmpId() {
		return empId;
	}
	public void setEmpId(Long empId) {
		this.empId = empId;
	}
	public String getRoomName() {
		return roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	public LocalDateTime getStartTime() {
		return startTime;
	}
	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}
	public BookingDTO(Long id, Long empId, String roomName, LocalDateTime startTime) {
		super();
		this.bookingId = id;
		this.empId = empId;
		this.roomName = roomName;
		this.startTime = startTime;
	}
    
    
}
