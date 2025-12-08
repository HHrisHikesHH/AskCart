package com.askcart.authservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    // DISABLED: Gateway handles CORS for all services
    // Enabling CORS here causes duplicate headers which browsers reject

    /*
     * @Bean
     * public CorsConfigurationSource corsConfigurationSource() {
     * CorsConfiguration configuration = new CorsConfiguration();
     * configuration.setAllowedOriginPatterns(List.of("*")); // Allow all origins
     * configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE",
     * "OPTIONS"));
     * configuration.setAllowedHeaders(List.of("*"));
     * configuration.setAllowCredentials(true);
     * 
     * UrlBasedCorsConfigurationSource source = new
     * UrlBasedCorsConfigurationSource();
     * source.registerCorsConfiguration("/**", configuration);
     * return source;
     * }
     */
}
