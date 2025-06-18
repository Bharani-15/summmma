package com.cognizant.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;


import java.io.IOException;
import java.util.Collection;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        String redirectUrl = "http://localhost:3000/";

        for (GrantedAuthority authority : authorities) {
            String role = authority.getAuthority();

            if (role.equals("TEAMLEAD")) {
                redirectUrl = "http://localhost:3000/";
                break;
            } else if (role.equals("ROLE_MAINTAINENCEHEAD")) {
                redirectUrl = "http://localhost:3001/rooms";
                break;
            } else if (role.equals("ROLE_ROOMMANAGEMENTHEAD")) {
                redirectUrl = "http://localhost:3001/";
                break;
            }
        }

        response.sendRedirect(redirectUrl);
    }
//	    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
//
//	    @Override
//	    public void onAuthenticationSuccess(HttpServletRequest request,
//	                                        HttpServletResponse response,
//	                                        Authentication authentication) throws IOException, ServletException {
//	        // Redirect to frontend after successful login
//	        redirectStrategy.sendRedirect(request, response, "http://localhost:3000/");
//	    }

}

