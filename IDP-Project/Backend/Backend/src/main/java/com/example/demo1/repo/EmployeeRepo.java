package com.example.demo1.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo1.entiries.Employee;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Integer>{
	@Query("SELECT e FROM Employee e WHERE e.domain = :domain AND e.room IS NULL")
	List<Employee> findByDomain(@Param("domain") String domain);
}
