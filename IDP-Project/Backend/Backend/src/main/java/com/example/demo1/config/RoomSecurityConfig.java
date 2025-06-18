//package com.example.demo1.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class RoomSecurityConfig {
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//            .authorizeHttpRequests(auth -> auth
//                .anyRequest().authenticated()
//            )
//            .formLogin(form -> form.disable())
//            .logout(logout -> logout.disable())
//            .csrf(csrf -> csrf.disable());
//
//        return http.build();
//    }
//}
//////    expressions** with proper method references for `formLogin`, `logout`, and `csrf`.
//////- Ensured `authorizeHttpRequests` is passed a valid lambda that configures the request matcher registry.
//////
//////---
//////
//////### ✅ Required Dependencies
//////
//////Make sure your `pom.xml` includes:
//////
//////```xml
//////<dependency>
//////    <groupId>org.springframework.boot</groupId>
//////    <artifactId>spring-boot-starter-security</artifactId>
//////</dependency>
