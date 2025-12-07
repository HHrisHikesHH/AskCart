package com.askcart.productservice.dto;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private String description;
    private String sku;
    private Double price;
    private String currency;
    private Integer stockQuantity;
    private String categoryId;
}
