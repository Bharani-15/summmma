package com.cts.room_booking.dto;

import java.time.LocalDateTime;

public class BookingDTO {
   private Long bookingId;
   private Long empId;
   private String roomName;
   private LocalDateTime startTime;
   private LocalDateTime endTime;

   public BookingDTO() {}

   public BookingDTO(Long bookingId, Long empId, String roomName, LocalDateTime startTime, LocalDateTime endTime) {
       this.bookingId = bookingId;
       this.empId = empId;
       this.roomName = roomName;
       this.startTime = startTime;
       this.endTime = endTime;
   }

   public Long getBookingId() {
       return bookingId;
   }

   public void setBookingId(Long bookingId) {
       this.bookingId = bookingId;
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

   public LocalDateTime getEndTime() {
       return endTime;
   }

   public void setEndTime(LocalDateTime endTime) {
       this.endTime = endTime;
   }
}