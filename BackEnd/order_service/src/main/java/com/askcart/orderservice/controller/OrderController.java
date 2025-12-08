package com.askcart.orderservice.controller;

import com.askcart.orderservice.dto.OrderRequest;
import com.askcart.orderservice.model.Order;
import com.askcart.orderservice.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestHeader("X-User-Id") String userIdStr,
            @RequestBody OrderRequest request) {
        Long userId = Long.parseLong(userIdStr);
        return ResponseEntity.ok(service.createOrder(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders(
            @RequestHeader("X-User-Id") String userIdStr) {
        Long userId = Long.parseLong(userIdStr);
        return ResponseEntity.ok(service.getOrdersByUserId(userId));
    }
}
