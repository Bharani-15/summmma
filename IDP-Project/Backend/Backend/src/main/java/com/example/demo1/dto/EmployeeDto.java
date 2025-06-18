package com.example.demo1.dto;

public class EmployeeDto {
	private String name;
    private String domain;
    private int roomId; 
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDomain() {
		return domain;
	}
	public EmployeeDto(String name, String domain, int roomId) {
		super();
		this.name = name;
		this.domain = domain;
		this.roomId = roomId;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public int getRoomId() {
		return roomId;
	}
	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

}
