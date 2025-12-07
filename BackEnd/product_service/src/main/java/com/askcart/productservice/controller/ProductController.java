package com.askcart.productservice.controller;

import com.askcart.productservice.dto.ProductRequest;
import com.askcart.productservice.dto.ProductResponse;
import com.askcart.productservice.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.UUID;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public Mono<ResponseEntity<ProductResponse>> create(@RequestBody ProductRequest request) {
        return service.createProduct(request)
                .map(saved -> ResponseEntity.ok(saved));
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<ProductResponse>> get(@PathVariable UUID id) {
        return service.getProduct(id)
                .map(product -> ResponseEntity.ok(product))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
