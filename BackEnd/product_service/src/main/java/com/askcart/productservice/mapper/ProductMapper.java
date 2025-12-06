package com.askcart.productservice.mapper;

import com.askcart.productservice.dto.ProductRequest;
import com.askcart.productservice.dto.ProductResponse;
import com.askcart.productservice.model.Product;

public class ProductMapper {
    public static Product toEntity(ProductRequest request) {
        return Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .sku(request.getSku())
                .price(request.getPrice())
                .currency(request.getCurrency())
                .stockQuantity(request.getStockQuantity())
                .categoryId(request.getCategoryId())
                .build();
    }

    public static ProductResponse toResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setSku(product.getSku());
        response.setPrice(product.getPrice());
        response.setCurrency(product.getCurrency());
        response.setStockQuantity(product.getStockQuantity());
        response.setCategoryId(product.getCategoryId());
        response.setCreatedAt(product.getCreatedAt());
        response.setUpdatedAt(product.getUpdatedAt());
        return response;
    }
}
