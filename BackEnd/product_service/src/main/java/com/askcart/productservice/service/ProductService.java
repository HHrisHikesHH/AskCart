package com.askcart.productservice.service;

import com.askcart.productservice.model.Product;
import com.askcart.productservice.repository.ProductRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Mono<Product> createProduct(Product product) {
        return repository.save(product);
    }

    public Mono<Product> getProduct(Long id) {
        return repository.findById(id);
    }
}
