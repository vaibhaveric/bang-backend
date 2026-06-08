package in.bangalisweets.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "coupons")
@Data
@NoArgsConstructor
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 32)
    private String code;

    @Column(nullable = false, length = 16)
    private String type; // percent, flat, shipping

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal value;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal minOrder = BigDecimal.ZERO;

    @Column(precision = 10, scale = 2)
    private BigDecimal maxDiscount;

    @Column(length = 64)
    private String applies = "all"; // all or category:slug

    @Column
    private LocalDate validTill;

    @Column(nullable = false)
    private Integer usedCount = 0;

    @Column(nullable = false)
    private Integer maxUses = 0; // 0 = unlimited

    @Column(nullable = false, length = 16)
    private String status = "active"; // active, scheduled, expired

    @Column(length = 256)
    private String description;
}
