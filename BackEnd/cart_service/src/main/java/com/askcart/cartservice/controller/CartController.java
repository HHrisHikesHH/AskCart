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

    @GetMapping("/{userId}")
    public Mono<Cart> getCart(@PathVariable String userId) {
        return service.getCart(userId);
    }

    @PostMapping("/{userId}/items")
    public Mono<Cart> addItem(@PathVariable String userId, @RequestBody CartItem item) {
        return service.addItem(userId, item);
    }

    @DeleteMapping("/{userId}/items/{productId}")
    public Mono<Cart> removeItem(@PathVariable String userId, @PathVariable String productId) {
        return service.removeItem(userId, productId);
    }

    @DeleteMapping("/{userId}")
    public Mono<Void> clearCart(@PathVariable String userId) {
        return service.clearCart(userId);
    }
}
