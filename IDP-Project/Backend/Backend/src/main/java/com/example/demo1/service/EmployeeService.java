package com.example.demo1.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

//import com.example.demo1.dto.EmployeeDto;
import com.example.demo1.dto.RoomAssignDto;
import com.example.demo1.dto.RoomIdDto;
import com.example.demo1.entiries.Employee;
import com.example.demo1.entiries.Room;
import com.example.demo1.repo.EmployeeRepo;
import com.example.demo1.repo.RoomRepo;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Autowired
	private RoomRepo roomRepo;
	
	@Autowired
	private RoomService roomService;
	
	public List<Employee> employeeList(){
		return employeeRepo.findAll();
	}
	
	public void saveEmployee(Employee employee) {
		Room room=employee.getRoom();
		roomService.updateRoom(room);
		employeeRepo.save(employee);
	}
	
	public Optional<Employee> findEmployeeById(int id) {
		Optional<Employee> employee = employeeRepo.findById(id);
		if(employee.isPresent()) {
			return employee;
		}
		throw new RuntimeException("Employee not found with id: " + id);
	}
	
	public void updateEmployee(int id,int roomId) {
		Optional<Employee> existingEmployee1 = findEmployeeById(id);
		if(existingEmployee1.isPresent()) {
			Employee existingEmployee2=existingEmployee1.get();
//			existingEmployee2.setName(employeeDto.getName());
//			existingEmployee2.setDomain(employeeDto.getDomain());
			
			Optional<Room> room = roomRepo.findById(roomId);
			if(room.isPresent()) {
				Room room2=existingEmployee2.getRoom();
				roomService.updateRoomMinus(room2);
				if(room.get().getNotOccupied()==0) {
					throw new RuntimeException("room is full " + id);
				}
				existingEmployee2.setRoom(room.get());
				roomService.updateRoom(room.get());
			}else {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room is full");
			}
			
			employeeRepo.save(existingEmployee2);
		}else {
			throw new RuntimeException("Employee not found with id: " + id);
		}
		
	}
	
	public void deleteEmployee(int id) {
		Optional<Employee> employee = findEmployeeById(id);
		if(employee.isPresent()) {
			Employee employee1=employee.get();
			employeeRepo.delete(employee1);
		}else {
			throw new RuntimeException("Employee not found with id: " + id);
		}
	}
	
	public int assingEmployeesToRoom(RoomAssignDto roomAssignDto) {
	    Optional<Room> room = roomRepo.findById(roomAssignDto.getRoomId());

	    if (room.isPresent()) {
	        int noOfSeats = room.get().getNoOfSeats();
	        int occupied = room.get().getOccupied();

	        if (noOfSeats == occupied) {
	            throw new RuntimeException("Room is already full " + room.get().getRoomName());
	        } else if (noOfSeats > occupied) {
	            List<Employee> employees = employeeRepo.findByDomain(roomAssignDto.getDomain());

	            // ✅ Check if there are no employees to assign
	            if (employees.isEmpty()) {
	                return 0;
	            }

	            int assignedCount = 0;
	            for (Employee employee : employees) {
	                if (room.get().getNotOccupied() == 0) {
	                    throw new RuntimeException("Room is full " + room.get().getRoomName() + " at " + employee.getName());
	                }
	                employee.setRoom(room.get());
	                roomService.updateRoom(room.get());
	                employeeRepo.save(employee);
	                assignedCount++;
	            }

	            return assignedCount;
	        } else {
	            throw new RuntimeException("ERROR in " + room.get().getRoomName());
	        }
	    } else {
	        throw new RuntimeException("Room not found with id: " + roomAssignDto.getRoomId());
	    }
	}


	public List<String> getAllUniqueDomains() {
	    List<Employee> employeeList = employeeList(); // Assuming this fetches all employees
	    Set<String> domainSet = new HashSet<>();

	    for (Employee employee : employeeList) {
	        domainSet.add(employee.getDomain());
	    }

	    return new ArrayList<>(domainSet); // Convert Set to List
	}

}
