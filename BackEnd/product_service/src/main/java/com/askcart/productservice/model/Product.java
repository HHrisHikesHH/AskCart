package com.askcart.productservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Product {
    @Id
    private Long id;
    private String name;
    private Double price;
}
