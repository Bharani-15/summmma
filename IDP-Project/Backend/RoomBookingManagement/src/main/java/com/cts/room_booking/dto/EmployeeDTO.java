package com.cts.room_booking.dto;
 
 
 
public class EmployeeDTO {
    private int id;
    private String name;
    private String domain;
 
    public EmployeeDTO() {
    }
 
    public EmployeeDTO(int id, String name, String domain) {
        this.id = id;
        this.name = name;
        this.domain = domain;
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
}
 
 