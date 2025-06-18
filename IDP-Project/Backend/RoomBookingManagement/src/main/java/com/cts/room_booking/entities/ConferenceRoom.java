package com.cts.room_booking.entities;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.ToString;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "bookings") 
public class ConferenceRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomName;
    private int noOfSeats;
    private String building;
    private boolean availability;
    private String roomType;

    @OneToMany(mappedBy = "conferenceRoom", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Booking> bookings;
    
    

	public ConferenceRoom(Long id, String roomName, int noOfSeats, String building, boolean availability,
			String roomType, List<Booking> bookings) {
		super();
		this.id = id;
		this.roomName = roomName;
		this.noOfSeats = noOfSeats;
		this.building = building;
		this.availability = availability;
		this.roomType = roomType;
		this.bookings = bookings;
	}
	
	public ConferenceRoom() {
		
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

	public List<Booking> getBookings() {
		return bookings;
	}

	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}

	

}