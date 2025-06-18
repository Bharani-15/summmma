package com.example.demo1.dto;

public class RoomAssignDto {
	
	private int roomId;
	
	private String domain;

	public RoomAssignDto(int roomId, String domain) {
		super();
		this.roomId = roomId;
		this.domain = domain;
	}
	
	public RoomAssignDto() {
		
	}

	public int getRoomId() {
		return roomId;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}
	
	

}
