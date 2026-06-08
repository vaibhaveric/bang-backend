package in.bangalisweets.service;

import in.bangalisweets.entity.ShippingZone;
import in.bangalisweets.repository.ShippingZoneRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class ShippingService {

    private final ShippingZoneRepository zoneRepo;

    public ShippingService(ShippingZoneRepository zoneRepo) {
        this.zoneRepo = zoneRepo;
    }

    public List<ShippingZone> getAll() {
        return zoneRepo.findAll();
    }

    public Map<String, Object> calculate(String pincode, BigDecimal cartTotal) {
        List<ShippingZone> zones = zoneRepo.findByStatusOrderByDisplayOrderAsc("active");
        for (ShippingZone z : zones) {
            if (pincode.matches(z.getPinPattern())) {
                boolean free = cartTotal.compareTo(z.getFreeShippingOver()) >= 0;
                return Map.of(
                        "zone", z.getName(),
                        "days", z.getDeliveryDays(),
                        "charge", free ? BigDecimal.ZERO : z.getBaseRate(),
                        "freeOver", z.getFreeShippingOver(),
                        "serviceable", true
                );
            }
        }
        return Map.of("serviceable", false, "message", "Delivery not available to this pincode yet");
    }

    @Transactional
    public ShippingZone save(ShippingZone zone) {
        return zoneRepo.save(zone);
    }

    @Transactional
    public void delete(Long id) {
        zoneRepo.deleteById(id);
    }
}
