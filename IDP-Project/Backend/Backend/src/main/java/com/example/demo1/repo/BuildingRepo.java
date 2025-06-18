package com.example.demo1.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo1.entiries.Building;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepo extends JpaRepository<Building, Integer>{

}
