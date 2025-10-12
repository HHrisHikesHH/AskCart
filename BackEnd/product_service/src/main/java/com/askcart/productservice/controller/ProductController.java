package com.askcart.productservice.controller;

import com.askcart.productservice.model.Product;
import com.askcart.productservice.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public Mono<ResponseEntity<Product>> create(@RequestBody Product product) {
        return service.createProduct(product)
                .map(saved -> ResponseEntity.ok(saved));
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Product>> get(@PathVariable Long id) {
        return service.getProduct(id)
                .map(product -> ResponseEntity.ok(product))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
