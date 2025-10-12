package com.askcart.productservice.repository;

import com.askcart.productservice.model.Product;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Mono;

public interface ProductRepository extends R2dbcRepository<Product, Long> {
    Mono<Product> findById(Long id);

    Mono<Void> deleteById(Long id);
}
