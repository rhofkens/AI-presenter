package ai.bluefields.aipresenter.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/health")
public class HealthController {
    private record HealthStatus(String status, String timestamp) {}
    
    @GetMapping
    public ResponseEntity<HealthStatus> healthCheck() {
        var now = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        return ResponseEntity.ok(new HealthStatus("OK", now));
    }
}