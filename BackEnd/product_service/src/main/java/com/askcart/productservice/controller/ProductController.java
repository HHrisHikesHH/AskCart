package com.askcart.productservice.controller;

import com.askcart.productservice.dto.ProductRequest;
import com.askcart.productservice.dto.ProductResponse;
import com.askcart.productservice.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public Flux<ProductResponse> getAll() {
        return service.getAllProducts();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<ProductResponse>> get(@PathVariable UUID id) {
        return service.getProduct(id)
                .map(product -> ResponseEntity.ok(product))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Mono<ResponseEntity<ProductResponse>> create(@RequestBody ProductRequest request) {
        return service.createProduct(request)
                .map(saved -> ResponseEntity.ok(saved));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<ProductResponse>> update(
            @PathVariable UUID id,
            @RequestBody ProductRequest request) {
        return service.updateProduct(id, request)
                .map(updated -> ResponseEntity.ok(updated))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable UUID id) {
        return service.deleteProduct(id)
                .then(Mono.just(ResponseEntity.noContent().<Void>build()))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
