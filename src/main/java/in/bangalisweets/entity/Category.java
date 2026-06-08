package in.bangalisweets.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 64)
    private String slug;

    @Column(nullable = false, length = 128)
    private String nameEn;

    @Column(nullable = false, length = 128)
    private String nameHi;

    @Column(length = 512)
    private String description;

    @Column(length = 512)
    private String heroImage;

    @Column(nullable = false)
    private Integer displayOrder = 0;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(nullable = false)
    private Boolean featured = false;
}
