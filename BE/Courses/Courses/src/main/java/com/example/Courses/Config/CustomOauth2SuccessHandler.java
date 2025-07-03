package com.example.Courses.Config;


import com.example.Courses.Service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomOauth2SuccessHandler implements AuthenticationSuccessHandler {
    public final UserService userService;
    public CustomOauth2SuccessHandler(UserService userService) {

        this.userService = userService;
    }
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User user = oauthToken.getPrincipal();

        String email = user.getAttribute("email");
        String name = user.getAttribute("name");
        userService.processOAuthLogin(email, name);

        response.sendRedirect("http://localhost:5173/home");
    }

}
