package in.bangalisweets.service;

import in.bangalisweets.entity.Coupon;
import in.bangalisweets.repository.CouponRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class CouponService {

    private final CouponRepository couponRepo;

    public CouponService(CouponRepository couponRepo) {
        this.couponRepo = couponRepo;
    }

    public List<Coupon> getAll() {
        return couponRepo.findAll();
    }

    public Coupon getById(Long id) {
        return couponRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Coupon not found"));
    }

    public Map<String, Object> validate(String code, BigDecimal cartTotal, String categorySlug) {
        Coupon c = couponRepo.findByCodeIgnoreCase(code)
                .orElseThrow(() -> new RuntimeException("Invalid coupon code"));

        if (!"active".equals(c.getStatus())) return Map.of("valid", false, "message", "Coupon is not active");
        if (c.getValidTill() != null && c.getValidTill().isBefore(LocalDate.now()))
            return Map.of("valid", false, "message", "Coupon has expired");
        if (cartTotal.compareTo(c.getMinOrder()) < 0)
            return Map.of("valid", false, "message", "Minimum order ₹" + c.getMinOrder() + " required");
        if (c.getMaxUses() > 0 && c.getUsedCount() >= c.getMaxUses())
            return Map.of("valid", false, "message", "Coupon usage limit reached");
        if (!"all".equals(c.getApplies()) && categorySlug != null && !c.getApplies().contains(categorySlug))
            return Map.of("valid", false, "message", "Coupon not applicable for selected items");

        BigDecimal discount = switch (c.getType()) {
            case "percent" -> cartTotal.multiply(c.getValue()).divide(BigDecimal.valueOf(100));
            case "flat" -> c.getValue();
            case "shipping" -> BigDecimal.valueOf(89); // estimated shipping
            default -> BigDecimal.ZERO;
        };
        if (c.getMaxDiscount() != null && discount.compareTo(c.getMaxDiscount()) > 0) {
            discount = c.getMaxDiscount();
        }

        return Map.of("valid", true, "discount", discount, "type", c.getType(), "description", c.getDescription() != null ? c.getDescription() : "");
    }

    @Transactional
    public Coupon save(Coupon coupon) {
        return couponRepo.save(coupon);
    }

    @Transactional
    public void delete(Long id) {
        couponRepo.deleteById(id);
    }
}
