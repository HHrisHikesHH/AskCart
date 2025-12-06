package com.askcart.aiservice.controller;

import com.askcart.aiservice.service.RagService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/ai")
public class AiController {
    
    private final RagService ragService;

    public AiController(RagService ragService) {
        this.ragService = ragService;
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        String query = request.get("query");
        String response = ragService.ask(query);
        return Map.of("response", response);
    }
}
