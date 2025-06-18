package com.example.demo1.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo1.entiries.Room;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepo extends JpaRepository<Room, Integer>{

}
