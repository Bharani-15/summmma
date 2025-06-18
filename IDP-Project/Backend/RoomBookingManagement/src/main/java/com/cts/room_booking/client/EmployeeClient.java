package com.cts.room_booking.client;
 
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
 
import com.cts.room_booking.dto.EmployeeDTO;
 
@FeignClient(name = "Backend", url = "http://localhost:8074/api")
public interface EmployeeClient {
 
    @GetMapping("/listEmployees/{id}")
    ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable("id") Long id);
}
