package com.askcart.authservice.controller;

import com.askcart.authservice.dto.ApiResponse;
import com.askcart.authservice.dto.AuthResponse;
import com.askcart.authservice.dto.UserResponse;
import com.askcart.authservice.model.AppUser;
import com.askcart.authservice.service.JWTService;
import com.askcart.authservice.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    @PostMapping("/register")
    public ApiResponse<UserResponse> register(@Valid @RequestBody AppUser user) {
        AppUser savedUser = userService.register(user);
        UserResponse response = new UserResponse(savedUser.getId(), savedUser.getUsername(), savedUser.getEmail());
        return new ApiResponse<>("success", response);
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody AppUser user, HttpServletResponse response) {
        String token = userService.authenticateAndGenerateToken(user);
        if ("Failed".equals(token)) {
            return new ApiResponse<>("failed", null);
        }

        // Set HTTP-only cookie
        // Set HTTP-only cookie with SameSite=Lax
        org.springframework.http.ResponseCookie jwtCookie = org.springframework.http.ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(jwtExpiration / 1000)
                .sameSite("Lax")
                .build();

        response.addHeader("Set-Cookie", jwtCookie.toString());

        return new ApiResponse<>("success", new AuthResponse(token));
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthResponse> refresh(HttpServletRequest request, HttpServletResponse response) {
        String oldToken = extractTokenFromCookie(request);
        if (oldToken == null) {
            return new ApiResponse<>("failed", null);
        }

        String newToken = userService.refreshToken(oldToken);

        // Set new HTTP-only cookie
        // Set new HTTP-only cookie
        org.springframework.http.ResponseCookie jwtCookie = org.springframework.http.ResponseCookie
                .from("jwt", newToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(jwtExpiration / 1000)
                .sameSite("Lax")
                .build();

        response.addHeader("Set-Cookie", jwtCookie.toString());

        return new ApiResponse<>("success", new AuthResponse(newToken));
    }

    @PostMapping("/logout")
    public ApiResponse<String> logout(HttpServletResponse response) {
        // Clear JWT cookie
        // Clear JWT cookie
        org.springframework.http.ResponseCookie jwtCookie = org.springframework.http.ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        response.addHeader("Set-Cookie", jwtCookie.toString());

        return new ApiResponse<>("success", "Logged out successfully");
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(HttpServletRequest request) {
        String token = extractTokenFromCookie(request);
        if (token == null) {
            return ResponseEntity.status(401).build();
        }

        Long userId = jwtService.extractUserId(token);
        AppUser user = userService.getUserById(userId);

        UserResponse response = new UserResponse(user.getId(), user.getUsername(), user.getEmail());
        return ResponseEntity.ok(response);
    }

    private String extractTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
