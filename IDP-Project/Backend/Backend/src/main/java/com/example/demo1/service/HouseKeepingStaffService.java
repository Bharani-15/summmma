package com.example.demo1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo1.repo.HouseKeepingStaffRepo;
import com.example.demo1.entiries.HousekeepingStaff;

@Service
public class HouseKeepingStaffService {

	 @Autowired
	    private HouseKeepingStaffRepo housekeepingStaffRepository;

	    public List<HousekeepingStaff> getAllStaff() {
	        return housekeepingStaffRepository.findAll();
	    }

	    public HousekeepingStaff saveStaff(HousekeepingStaff staff) {
	        return housekeepingStaffRepository.save(staff);
	    }
}
