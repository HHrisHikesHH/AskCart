package com.askcart.authservice.dto;

public record UserResponse(
        Long id,
        String username,
        String email
) {
}
