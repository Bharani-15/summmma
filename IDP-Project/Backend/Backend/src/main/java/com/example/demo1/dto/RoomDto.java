package com.example.demo1.dto;



public class RoomDto {
	
private int buildingId;
private String roomName;
private int noOfSeats;

public RoomDto() {
	
}



public RoomDto(int buildingId, String roomName, int noOfSeats) {
	super();
	this.buildingId = buildingId;
	this.roomName = roomName;
	this.noOfSeats = noOfSeats;
}



public int getBuildingId() {
	return buildingId;
}

public void setBuildingId(int buildingId) {
	this.buildingId = buildingId;
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


}

