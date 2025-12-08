package com.askcart.productservice.service;

import com.askcart.productservice.dto.ProductRequest;
import com.askcart.productservice.dto.ProductResponse;
import com.askcart.productservice.event.ProductCreatedEvent;
import com.askcart.productservice.mapper.ProductMapper;
import com.askcart.productservice.model.Product;
import com.askcart.productservice.repository.ProductRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
public class ProductService {
    private final ProductRepository repository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public ProductService(ProductRepository repository, KafkaTemplate<String, Object> kafkaTemplate) {
        this.repository = repository;
        this.kafkaTemplate = kafkaTemplate;
    }

    public Flux<ProductResponse> getAllProducts() {
        return repository.findAll()
                .map(ProductMapper::toResponse);
    }

    public Mono<ProductResponse> getProduct(UUID id) {
        return repository.findById(id)
                .map(ProductMapper::toResponse);
    }

    public Mono<ProductResponse> createProduct(ProductRequest request) {
        Product product = ProductMapper.toEntity(request);
        return repository.save(product)
                .flatMap(savedProduct -> {
                    ProductCreatedEvent event = new ProductCreatedEvent(
                            savedProduct.getId(),
                            savedProduct.getName(),
                            savedProduct.getSku(),
                            savedProduct.getPrice(),
                            savedProduct.getCurrency(),
                            savedProduct.getCategoryId(),
                            savedProduct.getCreatedAt());
                    return Mono
                            .fromRunnable(
                                    () -> kafkaTemplate.send("product.events", savedProduct.getId().toString(), event))
                            .thenReturn(savedProduct);
                })
                .map(ProductMapper::toResponse);
    }

    public Mono<ProductResponse> updateProduct(UUID id, ProductRequest request) {
        return repository.findById(id)
                .flatMap(existingProduct -> {
                    // Update fields
                    if (request.getName() != null)
                        existingProduct.setName(request.getName());
                    if (request.getDescription() != null)
                        existingProduct.setDescription(request.getDescription());
                    if (request.getSku() != null)
                        existingProduct.setSku(request.getSku());
                    if (request.getPrice() != null)
                        existingProduct.setPrice(request.getPrice());
                    if (request.getCurrency() != null)
                        existingProduct.setCurrency(request.getCurrency());
                    if (request.getStockQuantity() != null)
                        existingProduct.setStockQuantity(request.getStockQuantity());
                    if (request.getCategoryId() != null)
                        existingProduct.setCategoryId(request.getCategoryId());

                    return repository.save(existingProduct);
                })
                .map(ProductMapper::toResponse);
    }

    public Mono<Void> deleteProduct(UUID id) {
        return repository.deleteById(id);
    }
}
