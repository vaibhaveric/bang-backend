package in.bangalisweets.service;

import in.bangalisweets.entity.*;
import in.bangalisweets.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;
    private final CouponRepository couponRepo;
    private final ShippingZoneRepository zoneRepo;

    public OrderService(OrderRepository orderRepo, ProductRepository productRepo,
                        UserRepository userRepo, CouponRepository couponRepo,
                        ShippingZoneRepository zoneRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
        this.couponRepo = couponRepo;
        this.zoneRepo = zoneRepo;
    }

    public List<Order> getAll() {
        return orderRepo.findAllByOrderByCreatedAtDesc();
    }

    public Order getById(Long id) {
        return orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order getByNumber(String orderNumber) {
        return orderRepo.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderNumber));
    }

    public List<Order> getByUser(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepo.findByUserOrderByCreatedAtDesc(user);
    }

    @Transactional
    public Order place(Map<String, Object> payload, Long userId) {
        Order order = new Order();

        // Generate order number: BS-2026-XXXXX
        String year = String.valueOf(LocalDateTime.now().getYear());
        String rand = String.format("%05d", (int)(Math.random() * 99999));
        order.setOrderNumber("BS-" + year + "-" + rand);

        if (userId != null) {
            userRepo.findById(userId).ifPresent(order::setUser);
        }

        order.setCustomerName((String) payload.get("name"));
        order.setCustomerPhone((String) payload.get("phone"));
        order.setCustomerEmail((String) payload.getOrDefault("email", ""));
        order.setDeliveryAddress((String) payload.get("address"));
        order.setPincode((String) payload.get("pin"));
        order.setLandmark((String) payload.getOrDefault("landmark", ""));
        order.setMode((String) payload.getOrDefault("mode", "delivery"));
        order.setPaymentMode((String) payload.getOrDefault("payment", "cod"));

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> cartItems = (List<Map<String, Object>>) payload.get("items");

        BigDecimal subtotal = BigDecimal.ZERO;
        for (Map<String, Object> ci : cartItems) {
            Long productId = Long.valueOf(ci.get("id").toString());
            int qty = Integer.parseInt(ci.get("qty").toString());

            Product p = productRepo.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

            if (p.getStock() < qty) throw new RuntimeException("Insufficient stock for: " + p.getNameEn());

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProductId(p.getId());
            item.setProductName(p.getNameEn() + " / " + p.getNameHi());
            item.setProductImage(p.getImageUrl());
            item.setUnitPrice(p.getPrice());
            item.setQuantity(qty);
            item.setSubtotal(p.getPrice().multiply(BigDecimal.valueOf(qty)));
            order.getItems().add(item);

            subtotal = subtotal.add(item.getSubtotal());

            // Deduct stock
            p.setStock(p.getStock() - qty);
            p.setSoldCount(p.getSoldCount() + qty);
            productRepo.save(p);
        }

        order.setSubtotal(subtotal);

        // Calculate delivery charge
        BigDecimal deliveryCharge = calculateDelivery(order.getPincode(), subtotal);
        order.setDeliveryCharge(deliveryCharge);

        // Apply coupon
        BigDecimal discount = BigDecimal.ZERO;
        String couponCode = (String) payload.getOrDefault("couponCode", "");
        if (couponCode != null && !couponCode.isBlank()) {
            discount = applyCoupon(couponCode, subtotal, order);
            order.setCouponCode(couponCode.toUpperCase());
        }
        order.setDiscount(discount);
        order.setTotal(subtotal.add(deliveryCharge).subtract(discount));

        return orderRepo.save(order);
    }

    @Transactional
    public Order updateStatus(Long id, String status) {
        Order order = getById(id);
        order.setStatus(status);
        switch (status) {
            case "Sealed" -> order.setPackedAt(LocalDateTime.now());
            case "Out for delivery" -> order.setDispatchedAt(LocalDateTime.now());
            case "Delivered" -> order.setDeliveredAt(LocalDateTime.now());
        }
        return orderRepo.save(order);
    }

    private BigDecimal calculateDelivery(String pin, BigDecimal subtotal) {
        if (pin == null) return BigDecimal.valueOf(89);
        List<ShippingZone> zones = zoneRepo.findByStatusOrderByDisplayOrderAsc("active");
        for (ShippingZone zone : zones) {
            if (pin.matches(zone.getPinPattern())) {
                if (subtotal.compareTo(zone.getFreeShippingOver()) >= 0) return BigDecimal.ZERO;
                return zone.getBaseRate();
            }
        }
        return BigDecimal.valueOf(149);
    }

    private BigDecimal applyCoupon(String code, BigDecimal subtotal, Order order) {
        return couponRepo.findByCodeIgnoreCase(code).map(c -> {
            if (!"active".equals(c.getStatus())) return BigDecimal.ZERO;
            if (subtotal.compareTo(c.getMinOrder()) < 0) return BigDecimal.ZERO;
            if (c.getMaxUses() > 0 && c.getUsedCount() >= c.getMaxUses()) return BigDecimal.ZERO;

            BigDecimal disc = switch (c.getType()) {
                case "percent" -> subtotal.multiply(c.getValue()).divide(BigDecimal.valueOf(100));
                case "flat" -> c.getValue();
                case "shipping" -> order.getDeliveryCharge();
                default -> BigDecimal.ZERO;
            };

            if (c.getMaxDiscount() != null && disc.compareTo(c.getMaxDiscount()) > 0) {
                disc = c.getMaxDiscount();
            }
            c.setUsedCount(c.getUsedCount() + 1);
            couponRepo.save(c);
            return disc;
        }).orElse(BigDecimal.ZERO);
    }

    public Map<String, Object> getDashboardStats() {
        LocalDateTime todayStart = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime fourteenDaysAgo = LocalDateTime.now().minusDays(14).withHour(0).withMinute(0).withSecond(0).withNano(0);

        long ordersToday = orderRepo.countOrdersAfter(todayStart);
        BigDecimal revenueToday = orderRepo.sumRevenueAfter(todayStart);
        BigDecimal aov = ordersToday > 0
                ? revenueToday.divide(BigDecimal.valueOf(ordersToday), 2, java.math.RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        List<Object[]> rawSales = orderRepo.dailySalesAfter(fourteenDaysAgo);
        List<Map<String, Object>> dailySales = rawSales.stream().map(row -> {
            java.util.LinkedHashMap<String, Object> m = new java.util.LinkedHashMap<>();
            m.put("date", row[0].toString());
            m.put("orders", ((Number) row[1]).longValue());
            m.put("revenue", row[2] != null ? ((Number) row[2]).doubleValue() : 0.0);
            return (Map<String, Object>) m;
        }).collect(java.util.stream.Collectors.toList());

        java.util.LinkedHashMap<String, Object> result = new java.util.LinkedHashMap<>();
        result.put("ordersToday", ordersToday);
        result.put("revenueToday", revenueToday);
        result.put("aov", aov);
        result.put("dailySales", dailySales);
        return result;
    }
}
