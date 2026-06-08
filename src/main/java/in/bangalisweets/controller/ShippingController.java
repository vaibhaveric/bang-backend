package in.bangalisweets.controller;

import in.bangalisweets.service.ShippingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/shipping")
public class ShippingController {

    private final ShippingService shippingService;

    public ShippingController(ShippingService shippingService) {
        this.shippingService = shippingService;
    }

    @GetMapping("/calculate")
    public ResponseEntity<Map<String, Object>> calculate(@RequestParam String pincode,
                                                          @RequestParam BigDecimal cartTotal) {
        return ResponseEntity.ok(shippingService.calculate(pincode, cartTotal));
    }
}
