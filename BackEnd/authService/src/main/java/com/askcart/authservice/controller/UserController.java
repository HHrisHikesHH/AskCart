package com.askcart.authservice.controller;

import com.askcart.authservice.dto.ApiResponse;
import com.askcart.authservice.dto.AuthResponse;
import com.askcart.authservice.dto.UserResponse;
import com.askcart.authservice.model.AppUser;
import com.askcart.authservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ApiResponse<UserResponse> register(@Valid @RequestBody AppUser user) {
        AppUser savedUser = userService.register(user);
        UserResponse response = new UserResponse(savedUser.getId(), savedUser.getUsername());
        return new ApiResponse<>("success", response);
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody AppUser user) {
        String token = userService.authenticateAndGenerateToken(user);
        if ("Failed".equals(token)) {
            return new ApiResponse<>("failed", null);
        }
        return new ApiResponse<>("success", new AuthResponse(token));
    }
}
