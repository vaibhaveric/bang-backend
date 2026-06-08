package in.bangalisweets.controller;

import in.bangalisweets.service.CouponService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/coupons")
public class CouponController {

    private final CouponService couponService;

    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validate(@RequestBody Map<String, String> body) {
        String code = body.get("code");
        BigDecimal cartTotal = new BigDecimal(body.getOrDefault("cartTotal", "0"));
        String categorySlug = body.get("categorySlug");
        try {
            return ResponseEntity.ok(couponService.validate(code, cartTotal, categorySlug));
        } catch (RuntimeException e) {
            return ResponseEntity.ok(Map.of("valid", false, "message", e.getMessage()));
        }
    }
}
