package in.bangalisweets.controller;

import in.bangalisweets.entity.Coupon;
import in.bangalisweets.service.CouponService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/coupons")
public class AdminCouponController {

    private final CouponService couponService;

    public AdminCouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    @GetMapping
    public ResponseEntity<List<Coupon>> getAll() {
        return ResponseEntity.ok(couponService.getAll());
    }

    @PostMapping
    public ResponseEntity<Coupon> create(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(couponService.save(buildCoupon(new Coupon(), body)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Coupon> update(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        Coupon c = couponService.getById(id);
        return ResponseEntity.ok(couponService.save(buildCoupon(c, body)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        couponService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private Coupon buildCoupon(Coupon c, Map<String, Object> body) {
        if (body.containsKey("code")) c.setCode(((String) body.get("code")).toUpperCase());
        if (body.containsKey("type")) c.setType((String) body.get("type"));
        if (body.containsKey("value")) c.setValue(new BigDecimal(body.get("value").toString()));
        if (body.containsKey("minOrder")) c.setMinOrder(new BigDecimal(body.get("minOrder").toString()));
        if (body.containsKey("maxDiscount")) c.setMaxDiscount(new BigDecimal(body.get("maxDiscount").toString()));
        if (body.containsKey("applies")) c.setApplies((String) body.get("applies"));
        if (body.containsKey("validTill")) c.setValidTill(LocalDate.parse((String) body.get("validTill")));
        if (body.containsKey("maxUses")) c.setMaxUses(Integer.parseInt(body.get("maxUses").toString()));
        if (body.containsKey("status")) c.setStatus((String) body.get("status"));
        if (body.containsKey("description")) c.setDescription((String) body.get("description"));
        return c;
    }
}
