package com.askcart.productservice.repository;

import com.askcart.productservice.model.Product;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import java.util.UUID;

public interface ProductRepository extends ReactiveCrudRepository<Product, UUID> {
}
