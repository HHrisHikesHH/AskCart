package com.askcart.productservice.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ProductResponse {
    private UUID id;
    private String name;
    private String description;
    private String sku;
    private Double price;
    private String currency;
    private Integer stockQuantity;
    private String categoryId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
