package com.example.demo1.entiries;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "building")
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Changed from AUTO to IDENTITY for better auto-increment handling
    @Column(name = "id") // It's good practice to name your ID column
    private int id;

    @Column(name = "building_name") // Renamed to be more descriptive
    private String buildingName; // Changed from roomName to buildingName to reflect the entity

    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Room> rooms;

    public Building() {

    }

    public Building(int id, String buildingName) {
        super();
        this.id = id;
        this.buildingName = buildingName;
    }

    public Building(int id, String buildingName, List<Room> rooms) {
        super();
        this.id = id;
        this.buildingName = buildingName;
        this.rooms = rooms;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }
}