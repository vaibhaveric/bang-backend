package in.bangalisweets.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 64)
    private String sku;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false, length = 256)
    private String nameEn;

    @Column(nullable = false, length = 256)
    private String nameHi;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(precision = 10, scale = 2)
    private BigDecimal mrp;

    @Column(length = 64)
    private String unit;

    // Weight-priced products (sweets/namkeen/dairy) track stock in kg, so this is decimal.
    @Column(nullable = false, precision = 10, scale = 3)
    private BigDecimal stock = BigDecimal.ZERO;

    @Column(length = 512)
    private String imageUrl;

    // Additional gallery images, stored comma-separated. imageUrl stays the primary/first image.
    @Column(columnDefinition = "TEXT")
    private String images;

    @Column(length = 64)
    private String tag;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String ingredients;

    @Column(length = 256)
    private String shelfLife;

    @Column(length = 16)
    private String hsnCode = "1704";

    @Column(nullable = false)
    private Integer gstPercent = 5;

    @Column(length = 256)
    private String seoTitle;

    @Column(length = 512)
    private String seoDescription;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(nullable = false)
    private Integer soldCount = 0;

    @Column(nullable = false)
    private Double rating = 0.0;

    @Column(nullable = false)
    private Integer reviewCount = 0;
}
