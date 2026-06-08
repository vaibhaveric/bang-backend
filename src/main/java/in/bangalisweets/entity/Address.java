package in.bangalisweets.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "addresses")
@Data
@NoArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 128)
    private String label;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String fullAddress;

    @Column(nullable = false, length = 8)
    private String pincode;

    @Column(length = 128)
    private String landmark;

    @Column(nullable = false)
    private Boolean isDefault = false;
}
