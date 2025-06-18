package com.example.demo1.controller;
 
import java.time.LocalDateTime;
 
import org.springframework.format.annotation.DateTimeFormat;
 
import java.util.ArrayList;
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
 
import com.example.demo1.entiries.Building;
import com.example.demo1.entiries.HousekeepingStaff;
import com.example.demo1.entiries.Room;
import com.example.demo1.service.BuildingService;
import com.example.demo1.service.EmployeeService;
import com.example.demo1.service.HouseKeepingStaffService;
import com.example.demo1.service.RoomService;
 
@RestController
@RequestMapping("/api")
public class HouseKeepingStaffController {
 
	    @Autowired
	    private RoomService roomService;
 
	    @Autowired
	    private HouseKeepingStaffService housekeepingStaffService;
	    
	    @Autowired
		private BuildingService buildingService;
	    
	    @GetMapping("/Buildingss")
		public List<Building> displayBuidings() {
			 List<Building> customBuildings = new ArrayList<>();
			 customBuildings=buildingService.buildingList();
			 return customBuildings;
		}
 
	    // Update room status by room ID
	    @PostMapping("/{roomId}/updateStatus")
	    public Room updateRoomStatus(@PathVariable int roomId, @RequestParam String status) {
	        return roomService.updateRoomStatus(roomId, status);
	    }
 
	    // Update maintenance info by room ID
	    @PostMapping("/{roomId}/updateMaintenance")
	    public Room updateMaintenanceInfo(@PathVariable int roomId, 
	                                      @RequestParam boolean hasProjector, 
	                                      @RequestParam boolean hasBlackboard) {
	        return roomService.updateMaintenanceInfo(roomId,  hasProjector, hasBlackboard);
	    }
 
	    // Assign housekeeping staff to a room
	    @PutMapping("/{roomId}/assign/{staffId}")
	    public Room assignHousekeepingStaff(@PathVariable int roomId, @PathVariable Long staffId) {
	        return roomService.assignHousekeepingStaff(roomId, staffId);
	    }
 
	    // Get housekeeping staff assigned to a room
	    @GetMapping("/{roomId}/assignedStaff")
	    public HousekeepingStaff getAssignedStaff(@PathVariable int roomId) {
	        return roomService.getAssignedStaff(roomId);
	    }
 
	    // Get all rooms assigned to a specific housekeeping staff
	    @GetMapping("/staff/{staffId}/rooms")
	    public List<Room> getRoomsByStaff(@PathVariable Long staffId) {
	        return roomService.getRoomsByStaff(staffId);
	    }
	 // Get all housekeeping staff
	    @GetMapping("/staff")
	    public List<HousekeepingStaff> getAllStaff() {
	        return housekeepingStaffService.getAllStaff();
	    }
 
 
	    // Update only the last cleaned time of a room
 
 
	    @PostMapping("/{roomId}/updateLastCleanedTime")
	    public Room updateLastCleanedTime(@PathVariable int roomId,@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") LocalDateTime lastCleanedTime) 
	    {return roomService.updateLastCleanedTime(roomId, lastCleanedTime);
}
 
 
	    // Clear housekeeping staff assignment from a room
	    @PostMapping("/{roomId}/clearStaff")
	    public Room clearAssignedStaff(@PathVariable int roomId) {
	        return roomService.clearAssignedStaff(roomId);
	    }
 
	    @GetMapping("/updateStatusToDirty")
	    public void updateStatusToDirty() {
	    	roomService.updateRoomStatusToDirty();
	    }
	    // Filter rooms based on attributes
	    @GetMapping("/filter")
	    public List<Room> filterRooms(@RequestParam(required = false) String status,
	                                  @RequestParam(required = false) Boolean hasProjector,
	                                  @RequestParam(required = false) Boolean hasBlackboard) {
	        return roomService.filterRooms(status, hasProjector, hasBlackboard);
	    }
 
 
}