package com.askcart.cartservice.controller;

import com.askcart.cartservice.model.Cart;
import com.askcart.cartservice.model.CartItem;
import com.askcart.cartservice.service.CartService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    @GetMapping
    public Mono<Cart> getCart(@RequestHeader("X-User-Id") String userId) {
        return service.getCart(userId);
    }

    @PostMapping("/items")
    public Mono<Cart> addItem(
            @RequestHeader("X-User-Id") String userId,
            @RequestBody CartItem item) {
        return service.addItem(userId, item);
    }

    @DeleteMapping("/items/{productId}")
    public Mono<Cart> removeItem(
            @RequestHeader("X-User-Id") String userId,
            @PathVariable String productId) {
        return service.removeItem(userId, productId);
    }

    @DeleteMapping
    public Mono<Void> clearCart(@RequestHeader("X-User-Id") String userId) {
        return service.clearCart(userId);
    }
}
