package in.bangalisweets.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties({"user", "hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 32)
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, length = 128)
    private String customerName;

    @Column(nullable = false, length = 16)
    private String customerPhone;

    @Column(length = 128)
    private String customerEmail;

    @Column(columnDefinition = "TEXT")
    private String deliveryAddress;

    @Column(length = 8)
    private String pincode;

    @Column(length = 128)
    private String landmark;

    @Column(nullable = false, length = 16)
    private String mode = "delivery";

    @Column(nullable = false, length = 32)
    private String status = "Packing";

    @Column(nullable = false, length = 32)
    private String paymentMode = "cod";

    @Column(length = 64)
    private String transactionId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal deliveryCharge = BigDecimal.ZERO;

    @Column(precision = 10, scale = 2)
    private BigDecimal discount = BigDecimal.ZERO;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Column(length = 32)
    private String couponCode;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime packedAt;

    @Column
    private LocalDateTime dispatchedAt;

    @Column
    private LocalDateTime deliveredAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<OrderItem> items = new ArrayList<>();
}
