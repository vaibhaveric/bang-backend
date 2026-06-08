package in.bangalisweets.controller;

import in.bangalisweets.entity.ShippingZone;
import in.bangalisweets.service.ShippingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/shipping-zones")
public class AdminShippingController {

    private final ShippingService shippingService;

    public AdminShippingController(ShippingService shippingService) {
        this.shippingService = shippingService;
    }

    @GetMapping
    public ResponseEntity<List<ShippingZone>> getAll() {
        return ResponseEntity.ok(shippingService.getAll());
    }

    @PostMapping
    public ResponseEntity<ShippingZone> create(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(shippingService.save(buildZone(new ShippingZone(), body)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShippingZone> update(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        ShippingZone zone = shippingService.getAll().stream()
                .filter(z -> z.getId().equals(id)).findFirst()
                .orElseThrow(() -> new RuntimeException("Zone not found"));
        return ResponseEntity.ok(shippingService.save(buildZone(zone, body)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        shippingService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private ShippingZone buildZone(ShippingZone z, Map<String, Object> body) {
        if (body.containsKey("name")) z.setName((String) body.get("name"));
        if (body.containsKey("pinPattern")) z.setPinPattern((String) body.get("pinPattern"));
        if (body.containsKey("mode")) z.setMode((String) body.get("mode"));
        if (body.containsKey("deliveryDays")) z.setDeliveryDays((String) body.get("deliveryDays"));
        if (body.containsKey("baseRate")) z.setBaseRate(new BigDecimal(body.get("baseRate").toString()));
        if (body.containsKey("freeShippingOver")) z.setFreeShippingOver(new BigDecimal(body.get("freeShippingOver").toString()));
        if (body.containsKey("status")) z.setStatus((String) body.get("status"));
        if (body.containsKey("displayOrder")) z.setDisplayOrder(Integer.parseInt(body.get("displayOrder").toString()));
        return z;
    }
}
