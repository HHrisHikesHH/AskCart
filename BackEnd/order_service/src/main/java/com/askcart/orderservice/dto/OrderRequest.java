package com.askcart.orderservice.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class OrderRequest {
    private UUID userId;
    private List<OrderItemRequest> items;
}
