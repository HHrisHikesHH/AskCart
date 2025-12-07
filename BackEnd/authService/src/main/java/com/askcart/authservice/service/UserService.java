package com.askcart.authservice.service;

import com.askcart.authservice.model.AppUser;
import com.askcart.authservice.model.UserRole;
import com.askcart.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public AppUser register(AppUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(UserRole.USER);  // Explicitly set default role
        return userRepository.save(user);
    }

    public String authenticateAndGenerateToken(AppUser user) {
        // Fetch user manually
        AppUser authenticatedUser = userRepository.findByUsername(user.getUsername())
             .orElseThrow(() -> new BadCredentialsException("User not found"));

        if (!passwordEncoder.matches(user.getPassword(), authenticatedUser.getPassword())) {
             throw new BadCredentialsException("Invalid username or password");
        }

        return jwtService.generateToken(user.getUsername(), authenticatedUser.getId());
    }

    public String refreshToken(String oldToken) {
        String username = jwtService.extractUserName(oldToken);
        Long userId = jwtService.extractUserId(oldToken);
        return jwtService.generateToken(username, userId);
    }

    public AppUser getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
