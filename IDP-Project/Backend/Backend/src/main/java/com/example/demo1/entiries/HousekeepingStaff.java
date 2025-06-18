package com.example.demo1.entiries;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="house_keeping_staff")
public class HousekeepingStaff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name="name")
    private String name;

    @OneToMany(mappedBy = "housekeepingStaff")
    @JsonManagedReference
    private List<Room> rooms;
    
    public HousekeepingStaff() {
    	
    }

	public HousekeepingStaff(Long id, String name, List<Room> rooms) {
		super();
		this.id = id;
		this.name = name;
		this.rooms = rooms;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Room> getRooms() {
		return rooms;
	}

	public void setRooms(List<Room> rooms) {
		this.rooms = rooms;
	}

	@Override
	public String toString() {
		return "HousekeepingStaff [id=" + id + ", name=" + name + ", rooms=" + rooms + "]";
	}

    // Getters and Setters
}
