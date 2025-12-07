package com.askcart.productservice.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreatedEvent {
    private UUID id;
    private String name;
    private String sku;
    private Double price;
    private String currency;
    private String categoryId;
    private LocalDateTime createdAt;
}
