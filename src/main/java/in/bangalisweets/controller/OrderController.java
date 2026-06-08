package in.bangalisweets.controller;

import in.bangalisweets.entity.Order;
import in.bangalisweets.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> place(@RequestBody Map<String, Object> payload,
                                   Authentication auth) {
        try {
            Long userId = auth != null ? (Long) auth.getDetails() : null;
            Order order = orderService.place(payload, userId);
            return ResponseEntity.ok(Map.of(
                    "orderNumber", order.getOrderNumber(),
                    "orderId", order.getId(),
                    "total", order.getTotal(),
                    "status", order.getStatus()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/track/{orderNumber}")
    public ResponseEntity<?> track(@PathVariable String orderNumber) {
        try {
            Order order = orderService.getByNumber(orderNumber);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/my")
    public ResponseEntity<List<Order>> myOrders(Authentication auth) {
        Long userId = (Long) auth.getDetails();
        return ResponseEntity.ok(orderService.getByUser(userId));
    }
}
