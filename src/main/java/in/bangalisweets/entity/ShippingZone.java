package in.bangalisweets.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "shipping_zones")
@Data
@NoArgsConstructor
public class ShippingZone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 128)
    private String name;

    @Column(nullable = false, length = 64)
    private String pinPattern; // regex like "4770.."

    @Column(nullable = false, length = 16)
    private String mode = "delivery"; // delivery or ship

    @Column(nullable = false, length = 64)
    private String deliveryDays;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal baseRate;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal freeShippingOver;

    @Column(nullable = false, length = 16)
    private String status = "active";

    @Column(nullable = false)
    private Integer displayOrder = 0;
}
