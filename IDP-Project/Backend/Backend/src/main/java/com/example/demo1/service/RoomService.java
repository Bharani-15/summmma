package com.example.demo1.service;
 
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
 
import com.example.demo1.entiries.HousekeepingStaff;
import com.example.demo1.repo.HouseKeepingStaffRepo;
import com.example.demo1.entiries.Room;
import com.example.demo1.repo.RoomRepo;
 
@Service
public class RoomService {
	@Autowired
	private RoomRepo roomRepo;
	public List<Room> roomList(){
		return roomRepo.findAll();
	}
 
	public Optional<Room> findById(int roomId) {
		Optional<Room> room= roomRepo.findById(roomId);
		return room;
	}
	public void updateRoom(Room room) {
		int occupied=room.getOccupied()+1;
		room.setOccupied(occupied);
		int notOccupied=room.getNotOccupied()-1;
		room.setNotOccupied(notOccupied);
		roomRepo.save(room);
	}
	public void updateRoomMinus(Room room) {
		int occupied=room.getOccupied()-1;
		room.setOccupied(occupied);
		int notOccupied=room.getNotOccupied()+1;
		room.setNotOccupied(notOccupied);
		roomRepo.save(room);
	}
	 @Autowired
	    private HouseKeepingStaffRepo housekeepingStaffRepository;
 
	    public Room saveRoom(Room room) {
	        return roomRepo.save(room);
	    }
 
	    public Room updateRoomStatus(int roomId, String newStatus) {
	        Optional <Room> room= findById(roomId);
	        Room room1 = room.get();
	        room1.setStatus(newStatus);
	        return roomRepo.save(room1);
	    }
 
	    public Room updateMaintenanceInfo(int roomId, boolean hasProjector, boolean hasBlackboard) {
	        Optional<Room> room = findById(roomId);
	        Room room1 = room.get();
	        room1.setHasProjector(hasProjector);
	        room1.setHasBlackboard(hasBlackboard);
	        return roomRepo.save(room1);
	    }
 
	    public Room assignHousekeepingStaff(int roomId, Long staffId) {
	    	 Optional <Room> room= findById(roomId);
		     Room room1 = room.get();
	        HousekeepingStaff staff = housekeepingStaffRepository.findById(staffId).orElseThrow(() -> new RuntimeException("Staff not found"));
	        room1.setHousekeepingStaff(staff);
	        return roomRepo.save(room1);
	    }
 
	    public HousekeepingStaff getAssignedStaff(int roomId) {
	    	 Optional <Room> room= findById(roomId);
		     Room room1 = room.get();
	        return room1.getHousekeepingStaff();
	    }
 
	    public List<Room> getRoomsByStaff(Long staffId) {
	        HousekeepingStaff staff = housekeepingStaffRepository.findById(staffId).orElseThrow(() -> new RuntimeException("Staff not found"));
	        return staff.getRooms();
	    }
 
	    public Room updateLastCleanedTime(int roomId, LocalDateTime lastCleanedTime) {
	    	 Optional <Room> room= findById(roomId);
		     Room room1 = room.get();
	        room1.setLastCleanedTime(lastCleanedTime);
	        room1.setStatus("Clean");
	        return roomRepo.save(room1);
	    }
 
	    public Room clearAssignedStaff(int roomId) {
	    	 Optional <Room> room= findById(roomId);
		     Room room1 = room.get();
	        room1.setHousekeepingStaff(null);
	        return roomRepo.save(room1);
	    }
 
	    public List<Room> filterRooms(String status, Boolean hasProjector, Boolean hasBlackboard) {
	        return roomRepo.findAll().stream()
	                .filter(room -> (status == null || room.getStatus().equals(status)) &&
	                                (hasProjector == null || room.isHasProjector() == hasProjector) &&
	                                (hasBlackboard == null || room.isHasBlackboard() == hasBlackboard))
	                .collect(Collectors.toList());
	    }
 
	    // Scheduled task to update room status to "Dirty" if not cleaned in the last 3 days
	    @Scheduled(fixedRate = 90000)
	    public void updateRoomStatusToDirty() {
	    	System.out.println("Dirty Rooms Checked at"+LocalDateTime.now());
	        LocalDateTime threeDaysAgo = LocalDateTime.now().minusDays(3);
	        List<Room> rooms = roomRepo.findAll();
	        for (Room room : rooms) {
	            if (room.getLastCleanedTime().isBefore(threeDaysAgo)) {
	                room.setStatus("Dirty");
	                roomRepo.save(room);
	            }
	        }
	    }

}