package ai.bluefields.aipresenter.config;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
public class GlobalErrorHandler implements ErrorController {

    @RequestMapping("/error")
    public ResponseEntity<Object> handleError(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        String path = (String) request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI);
        
        if (status != null) {
            int statusCode = Integer.parseInt(status.toString());
            
            // For API requests, return JSON error response
            if (path != null && path.startsWith("/api/")) {
                Map<String, Object> body = Map.of(
                    "status", statusCode,
                    "error", HttpStatus.valueOf(statusCode).getReasonPhrase(),
                    "path", path
                );
                return ResponseEntity.status(statusCode).body(body);
            }
            
            // For all other requests (frontend routes), serve index.html
            return ResponseEntity.ok()
                .body(new ClassPathResource("/static/index.html"));
        }
        
        return ResponseEntity.internalServerError().build();
    }
}