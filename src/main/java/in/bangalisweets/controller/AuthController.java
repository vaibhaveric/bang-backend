package in.bangalisweets.controller;

import in.bangalisweets.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> body) {
        String phone = body.get("phone");
        if (phone == null || !phone.matches("\\+?[0-9]{10,13}")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid phone number"));
        }
        String otp = authService.sendOtp(phone);
        // In production, remove otp from response and deliver via SMS
        return ResponseEntity.ok(Map.of("message", "OTP sent", "otp", otp));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> body) {
        try {
            Map<String, Object> result = authService.verifyOtp(
                    body.get("phone"), body.get("otp"), body.get("name"));
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> body) {
        try {
            Map<String, Object> result = authService.adminLogin(body.get("username"), body.get("password"));
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
}
