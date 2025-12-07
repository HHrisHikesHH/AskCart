package com.askcart.orderservice.service;

import com.askcart.orderservice.dto.OrderRequest;
import com.askcart.orderservice.model.Order;
import com.askcart.orderservice.model.OrderItem;
import com.askcart.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setStatus("CREATED");
        
        BigDecimal total = BigDecimal.ZERO;
        
        for (var itemReq : request.getItems()) {
            OrderItem item = OrderItem.builder()
                    .productId(itemReq.getProductId())
                    .productName(itemReq.getProductName())
                    .unitPrice(itemReq.getUnitPrice())
                    .quantity(itemReq.getQuantity())
                    .order(order)
                    .build();
            order.getItems().add(item);
            total = total.add(item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }
        
        order.setTotalAmount(total);
        
        // Save to DB
        return repository.save(order);
        
        // TODO: Emit OrderCreatedEvent via Kafka for Saga
    }
}
