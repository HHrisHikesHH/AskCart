package com.askcart.aiservice.listener;

import com.askcart.aiservice.service.RagService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Map; // Start with map/string payload or copy Event DTO

@Component
public class ProductIngestionListener {
    private final RagService ragService;

    public ProductIngestionListener(RagService ragService) {
        this.ragService = ragService;
    }

    @KafkaListener(topics = "product.events", groupId = "ai-service-group")
    public void consume(String message) {
        // In a real app, use a proper DTO deserializer
        System.out.println("Received Product Event: " + message);
        ragService.ingest(message);
    }
}
