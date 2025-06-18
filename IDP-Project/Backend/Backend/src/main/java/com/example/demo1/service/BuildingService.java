package com.example.demo1.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo1.entiries.Building;
import com.example.demo1.entiries.Room;
import com.example.demo1.repo.BuildingRepo;

@Service
public class BuildingService {
	
	@Autowired
	private BuildingRepo buildingRepo;
	
	public List<Building> buildingList(){
		return buildingRepo.findAll(); 
	}
	
	public List<String> buildingNames(){
		List<Building> list=buildingRepo.findAll();
		List<String> buildingNames=new ArrayList<>();
		
		for(Building building :list) {
			buildingNames.add(building.getBuildingName());
		}
		
		return buildingNames;
	}
	
	public List<Room> rooms(){
		List<Building> list=buildingRepo.findAll();
		List<Room> roomList=new ArrayList<>();
		
		for(Building building :list) {
			roomList.addAll(building.getRooms());
		}
		return roomList;
	}

	public Optional<Building> findById(int buildingId) {
		// TODO Auto-generated method stub
		return buildingRepo.findById(buildingId);
	}
	
	

}
