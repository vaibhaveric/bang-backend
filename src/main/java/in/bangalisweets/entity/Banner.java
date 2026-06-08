package in.bangalisweets.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "banners")
@Data
@NoArgsConstructor
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "banner_key", nullable = false, length = 64)
    private String key;

    @Column(name = "banner_value", columnDefinition = "TEXT")
    private String value;

    @Column(length = 256)
    private String description;
}
