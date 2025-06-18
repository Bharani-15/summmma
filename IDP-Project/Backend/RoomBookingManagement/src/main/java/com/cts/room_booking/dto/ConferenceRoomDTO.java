package com.cts.room_booking.dto;



import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ConferenceRoomDTO {
    private Long id;
    public ConferenceRoomDTO() {
		super();
	}

	public ConferenceRoomDTO(Long id, String roomName, int noOfSeats, String building, boolean availability,
			String roomType) {
		super();
		this.id = id;
		this.roomName = roomName;
		this.noOfSeats = noOfSeats;
		this.building = building;
		this.availability = availability;
		this.roomType = roomType;
	}

	@Override
	public String toString() {
		return "ConferenceRoomDTO [id=" + id + ", roomName=" + roomName + ", noOfSeats=" + noOfSeats + ", building="
				+ building + ", availability=" + availability + ", roomType=" + roomType + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public int getNoOfSeats() {
		return noOfSeats;
	}

	public void setNoOfSeats(int noOfSeats) {
		this.noOfSeats = noOfSeats;
	}

	public String getBuilding() {
		return building;
	}

	public void setBuilding(String building) {
		this.building = building;
	}

	public boolean isAvailability() {
		return availability;
	}

	public void setAvailability(boolean availability) {
		this.availability = availability;
	}

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	private String roomName;
    private int noOfSeats;
    private String building;
    private boolean availability;
    private String roomType;

    
    
    
}
