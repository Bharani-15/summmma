package com.cts.room_booking.dto;



import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UpdateAvailabilityRequest {
    private Long roomId;
    private boolean availability;
    public Long getRoomId() {
        return roomId;
    }

    public boolean getAvailability() {
        return availability;
    }
}