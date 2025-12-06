package com.askcart.aiservice.service;

import io.milvus.client.MilvusServiceClient;
import io.milvus.param.ConnectParam;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class RagService {

    @Value("${milvus.host}")
    private String milvusHost;

    @Value("${milvus.port}")
    private int milvusPort;

    private MilvusServiceClient milvusClient;

    @PostConstruct
    public void init() {
        // Initialize Milvus Client
        ConnectParam connectParam = ConnectParam.newBuilder()
                .withHost(milvusHost)
                .withPort(milvusPort)
                .build();
        try {
           this.milvusClient = new MilvusServiceClient(connectParam);
        } catch (Exception e) {
           System.err.println("Failed to connect to Milvus: " + e.getMessage());
           // Non-fatal for dev startup if milvus isn't ready
        }
    }

    public String ask(String query) {
        // 1. Vectorize query (mock for now or use OpenAI)
        // 2. Search Milvus
        // 3. Construct context
        // 4. Call LLM
        return "AI Response to: " + query + " (RAG not yet fully implemented)";
    }

    public void ingest(String productData) {
        // 1. Vectorize product description
        // 2. Insert into Milvus
        System.out.println("Ingesting product into Vector DB: " + productData);
        // TODO: Actual Milvus insert logic
    }
}
