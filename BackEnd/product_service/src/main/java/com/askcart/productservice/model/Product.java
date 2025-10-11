package com.askcart.productservice.model;

import org.springframework.data.annotation.Id;
import lombok.Data;

@Data
public class Product {
    @Id
    private Long id;
    private String name;
    private Double price;
}
