package com.example.demo1.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.reactive.function.client.WebClient;

import com.example.demo1.dto.EmployeeDto;
import com.example.demo1.dto.RoomAssignDto;
import com.example.demo1.dto.RoomDto;
import com.example.demo1.dto.RoomIdDto;
import com.example.demo1.entiries.Building;
import com.example.demo1.entiries.Employee;
import com.example.demo1.entiries.Room;
import com.example.demo1.service.BuildingService;
import com.example.demo1.service.EmployeeService;
import com.example.demo1.service.RoomService;


//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class MainController {
	
	@Autowired
	private BuildingService buildingService;
	
	
//	@Autowired
//	public MainController(BuildingService buildingService) {
//		super();
//		this.buildingService = buildingService;
//	}

	@Autowired
	private RoomService roomService;
	
	
	@Autowired
	private EmployeeService employeeService;
	
	@GetMapping("/listBuildings")
	public List<Building> displayBuidings() {
		 List<Building> customBuildings = new ArrayList<>();
		 customBuildings=buildingService.buildingList();
		 return customBuildings;
	}
	
	@GetMapping("/building-name")
	public List<String> displayBuildingNames(){
		return buildingService.buildingNames();
	}
	
	@GetMapping("/listRooms")
	public List<Room> displayRoomNames(){
		return buildingService.rooms();
	}
	
	@PostMapping("/createEmployee")
	public ResponseEntity<String> createEmployee(@RequestBody EmployeeDto employeeDTO) {
		Optional<Room> roomOptional = roomService.findById(employeeDTO.getRoomId());

	    if (roomOptional.isPresent()) {
	        Employee employee = new Employee(employeeDTO.getName(), employeeDTO.getDomain(), roomOptional.get());
	        employeeService.saveEmployee(employee);
	        return ResponseEntity.status(HttpStatus.CREATED).body("Employee created successfully");
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Room ID not found");
	    }
	}
	
	@GetMapping("/listEmployeesBasedOnRoomId/{roomId}")
	public List<Employee> listEmployeesBasedOnRoomId(@PathVariable int roomId){
		int roomId1=roomId;
		Optional<Room> room=roomService.findById(roomId1);
		if(room.isPresent()) {
			Room room1=room.get();
			List<Employee> employees = room1.getEmployees();
			return employees;
		}
		return null;
	}
	
	@GetMapping("/listEmployees")
	public List<Employee> listEmployees(){
		return employeeService.employeeList();
	}
	
	@PutMapping("/updateEmployee/{id}/{roomId}")
	public void updateEmployee(@PathVariable int id,@PathVariable int roomId) {
		employeeService.updateEmployee(id,roomId);
	}
	
	@GetMapping("/listEmployees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable int id) {
	    Optional<Employee> employee = employeeService.findEmployeeById(id);
	    return employee.map(ResponseEntity::ok)
	                   .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}
	
	@DeleteMapping("/deleteEmployee/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable int id) {
		employeeService.deleteEmployee(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Employee deleted successfully");
	}
	
	@PutMapping("/assingEmployeesToRoom")
	public ResponseEntity<Map<String, Object>> assingEmployeesToRoom(@RequestBody RoomAssignDto roomAssignDto) {
	    int assignedCount = employeeService.assingEmployeesToRoom(roomAssignDto);

	    Map<String, Object> response = new HashMap<>();
	    if (assignedCount == 0) {
	        response.put("message", "No employees to assign");
	        response.put("assignedCount", 0);
	        return ResponseEntity.status(HttpStatus.OK).body(response);
	    } else {
	        response.put("message", "Employees assigned successfully");
	        response.put("assignedCount", assignedCount);
	        return ResponseEntity.status(HttpStatus.OK).body(response);
	    }
	}

	
	@PostMapping("/createRoom")
	public ResponseEntity<String> createRoom(@RequestBody RoomDto roomDTO) {
		Optional<Building> buildingOptional = buildingService.findById(roomDTO.getBuildingId());

	    if (buildingOptional.isPresent()) {
	        Room room = new Room(roomDTO.getRoomName(), roomDTO.getNoOfSeats(), buildingOptional.get());
	        room.setNotOccupied(room.getNoOfSeats());
	        room.setOccupied(0);
	        room.setStatus("cleaned");
	        roomService.saveRoom(room);
	        return ResponseEntity.status(HttpStatus.CREATED).body("Room created successfully");
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Building ID not found");
	    }
	}
	

	@GetMapping("/employeeDomains")
	public List<String> getAllEmployeeDomains() {
		return employeeService.getAllUniqueDomains(); // This should return a list like ["Engineering", "HR", "Finance"]
}

	
//	public Mono<ResponseEntity<OrderResponseDto>> placeOrder(@RequestBody Order order){
//		return webClientBuilder.build().get().uri("http://localhost:8081/products/" + order.getProduct()).retrieve()
//				.bodyToMono(ProductDTO.class).map(productDto -> {
//			
//		});
//	}

}
