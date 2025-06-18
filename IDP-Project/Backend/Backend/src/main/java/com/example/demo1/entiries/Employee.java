package com.example.demo1.entiries;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Changed from AUTO to IDENTITY
    @Column(name = "employee_id") // Explicitly naming the ID column
    private int id;

    @Column(name = "employee_name") // Explicitly naming the name column
    private String name;

    @Column(name = "employee_domain") // Explicitly naming the domain column
    private String domain;

    @ManyToOne
    @JoinColumn(name = "room_id") // Foreign key column linking to the room table
//    @JsonBackReference
    @JsonIgnoreProperties("employees") 
    private Room room;

    public Employee() {

    }
    
    public Employee(int id, String name, String domain,Room room) {
        super();
        this.id=id;
        this.name = name;
        this.domain = domain;
        this.room=room;
    }

    public Employee( String name, String domain,Room room) {
        super();
        this.name = name;
        this.domain = domain;
        this.room=room;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}