package com.askcart.apigateway.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;
import java.util.List;

@Component
public class AuthenticationFilter implements GlobalFilter, Ordered {

    @Value("${jwt.secret}")
    private String jwtSecret;

    private static final List<String> PUBLIC_PATHS = List.of(
            "/api/auth/register",
            "/api/auth/login",
            "/api/auth/refresh",
            "/api/auth/logout");

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getPath().toString();
        HttpMethod method = request.getMethod();

        // 1. Allow all OPTIONS (CORS preflight)
        if (method == HttpMethod.OPTIONS) {
            return chain.filter(exchange);
        }

        // 2. Allow public paths
        if (isPublicPath(path, method)) {
            return chain.filter(exchange);
        }

        // 3. Extract JWT
        String token = null;

        // Try cookie first
        HttpCookie jwtCookie = request.getCookies().getFirst("jwt");
        if (jwtCookie != null) {
            token = jwtCookie.getValue();
        }

        // Try Authorization header if no cookie
        if (token == null) {
            String authHeader = request.getHeaders().getFirst("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        if (token == null) {
            return onError(exchange, "Missing authentication token", HttpStatus.UNAUTHORIZED);
        }

        try {
            Claims claims = validateToken(token);
            String userId = claims.get("userId", String.class);

            if (userId == null) {
                return onError(exchange, "Invalid token: missing userId", HttpStatus.UNAUTHORIZED);
            }

            // Attach userId for downstream services
            ServerHttpRequest modified = request.mutate()
                    .header("X-User-Id", userId)
                    .build();

            return chain.filter(exchange.mutate().request(modified).build());

        } catch (Exception e) {
            return onError(exchange, "Invalid or expired token", HttpStatus.UNAUTHORIZED);
        }
    }

    private boolean isPublicPath(String path, HttpMethod method) {
        // Exact match for auth endpoints
        if (PUBLIC_PATHS.contains(path)) {
            return true;
        }

        // Allow GET requests to /api/products (list and detail)
        if (path.startsWith("/api/products") && HttpMethod.GET.equals(method)) {
            return true;
        }

        // Allow POST /api/ai/chat (public AI chat)
        if (path.equals("/api/ai/chat") && HttpMethod.POST.equals(method)) {
            return true;
        }

        return false;
    }

    private Claims validateToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Mono<Void> onError(ServerWebExchange exchange, String message, HttpStatus status) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(status);
        return response.setComplete();
    }

    @Override
    public int getOrder() {
        return -100; // High priority - run before routing
    }
}
