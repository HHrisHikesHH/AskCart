package com.askcart.orderservice.repository;

import com.askcart.orderservice.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByUserId(Long userId);
}
