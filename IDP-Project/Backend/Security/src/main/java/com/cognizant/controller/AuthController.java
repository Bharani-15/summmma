package com.cognizant.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

	@GetMapping("/user-role")
	public List<String> getUserRoles(Authentication authentication) {
	    return authentication.getAuthorities()
	                         .stream()
	                         .map(GrantedAuthority::getAuthority)
	                         .collect(Collectors.toList());
	}

}

