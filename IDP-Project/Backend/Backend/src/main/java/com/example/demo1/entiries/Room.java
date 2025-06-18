package com.example.demo1.entiries;
import java.time.LocalDateTime;
import java.util.*;

//import com.cognizant.entity.HousekeepingStaff;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="room")
public class Room {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="room_name")
	private String roomName;
	
	@Column(name="no_of_seats")
	private int noOfSeats;
	
	@Column(name="occupied")
	private int occupied;
	
	@Column(name="not_occupied")
	private int notOccupied;
	
	@Column(name="status")
	private String status;
	
	@Column(name="last_cleaned_time")
    private LocalDateTime lastCleanedTime;
	
	@Column(name="has_projector")
    private boolean hasProjector;
	
	@Column(name="has_black_board")
    private boolean hasBlackboard;

    @ManyToOne
    @JoinColumn(name = "housekeeping_staff_id")
    @JsonIgnoreProperties("rooms")
    private HousekeepingStaff housekeepingStaff;
	
//	@Column(name="availability")
//	private boolean availability;

	@ManyToOne
	@JoinColumn(name="building_id")
	@JsonBackReference
	private Building building;
	
	public Room() {
		
	}
	
	
	
	public Room(int id, String roomName, int noOfSeats, int occupied, int notOccupied, String status,
			LocalDateTime lastCleanedTime, boolean hasProjector, boolean hasBlackboard,
			com.example.demo1.entiries.HousekeepingStaff housekeepingStaff, Building building,
			List<Employee> employees) {
		super();
		this.id = id;
		this.roomName = roomName;
		this.noOfSeats = noOfSeats;
		this.occupied = occupied;
		this.notOccupied = notOccupied;
		this.status = status;
		this.lastCleanedTime = lastCleanedTime;
		this.hasProjector = hasProjector;
		this.hasBlackboard = hasBlackboard;
		this.housekeepingStaff = housekeepingStaff;
		this.building = building;
		this.employees = employees;
	}

	public Room(String roomName, int noOfSeats, Building building) {
		super();
		this.roomName = roomName;
		this.noOfSeats = noOfSeats;
		this.building = building;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getLastCleanedTime() {
		return lastCleanedTime;
	}

	public void setLastCleanedTime(LocalDateTime lastCleanedTime) {
		this.lastCleanedTime = lastCleanedTime;
	}

	public boolean isHasProjector() {
		return hasProjector;
	}

	public void setHasProjector(boolean hasProjector) {
		this.hasProjector = hasProjector;
	}

	public boolean isHasBlackboard() {
		return hasBlackboard;
	}

	public void setHasBlackboard(boolean hasBlackboard) {
		this.hasBlackboard = hasBlackboard;
	}

	public HousekeepingStaff getHousekeepingStaff() {
		return housekeepingStaff;
	}

	public void setHousekeepingStaff(HousekeepingStaff housekeepingStaff) {
		this.housekeepingStaff = housekeepingStaff;
	}

	@OneToMany(mappedBy="room",cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Employee> employees;
	
//	public boolean isAvailability() {
//		return availability;
//	}
//
//	public void setAvailability(boolean availability) {
//		this.availability = availability;
//	}

	public List<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(List<Employee> employees) {
		this.employees = employees;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
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

	public int getOccupied() {
		return occupied;
	}

	public void setOccupied(int occupied) {
		this.occupied = occupied;
	}

	public int getNotOccupied() {
		return notOccupied;
	}

	public void setNotOccupied(int notOccupied) {
		this.notOccupied = notOccupied;
	}

	public Building getBuilding() {
		return building;
	}

	public void setBuilding(Building building) {
		this.building = building;
	}

}
