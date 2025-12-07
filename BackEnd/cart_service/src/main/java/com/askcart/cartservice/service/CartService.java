package com.askcart.cartservice.service;

import com.askcart.cartservice.model.Cart;
import com.askcart.cartservice.model.CartItem;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
public class CartService {
    private final ReactiveRedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;
    private static final String CART_PREFIX = "cart:";

    public CartService(ReactiveRedisTemplate<String, String> redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    public Mono<Cart> getCart(String userId) {
        return redisTemplate.opsForValue().get(CART_PREFIX + userId)
                .map(json -> {
                    try {
                        return objectMapper.readValue(json, Cart.class);
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException("Error parsing cart", e);
                    }
                })
                .switchIfEmpty(Mono.just(new Cart(userId, new java.util.ArrayList<>())));
    }

    public Mono<Cart> addItem(String userId, CartItem item) {
        return getCart(userId)
                .flatMap(cart -> {
                    boolean exists = false;
                    for (CartItem existing : cart.getItems()) {
                        if (existing.getProductId().equals(item.getProductId())) {
                            existing.setQuantity(existing.getQuantity() + item.getQuantity());
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        cart.getItems().add(item);
                    }
                    return saveCart(cart);
                });
    }

    public Mono<Cart> removeItem(String userId, String productId) {
        return getCart(userId)
                .flatMap(cart -> {
                    cart.getItems().removeIf(item -> item.getProductId().equals(productId));
                    return saveCart(cart);
                });
    }

    public Mono<Void> clearCart(String userId) {
        return redisTemplate.delete(CART_PREFIX + userId).then();
    }

    private Mono<Cart> saveCart(Cart cart) {
        try {
            String json = objectMapper.writeValueAsString(cart);
            return redisTemplate.opsForValue()
                    .set(CART_PREFIX + cart.getUserId(), json, Duration.ofDays(30))
                    .thenReturn(cart);
        } catch (JsonProcessingException e) {
            return Mono.error(new RuntimeException("Error serializing cart", e));
        }
    }
}
