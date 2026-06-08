package in.bangalisweets.repository;

import in.bangalisweets.entity.Product;
import in.bangalisweets.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySku(String sku);
    List<Product> findByCategoryAndActiveTrueOrderByNameEnAsc(Category category);
    List<Product> findByActiveTrueOrderByNameEnAsc();

    @Query("SELECT p FROM Product p WHERE p.active = true AND (LOWER(p.nameEn) LIKE LOWER(CONCAT('%',:q,'%')) OR LOWER(p.nameHi) LIKE LOWER(CONCAT('%',:q,'%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%',:q,'%')))")
    List<Product> search(@Param("q") String q);

    @Query("SELECT p FROM Product p WHERE p.active = true AND p.stock < :threshold ORDER BY p.stock ASC")
    List<Product> findLowStock(@Param("threshold") int threshold);

    List<Product> findByCategoryAndActiveTrue(Category category);
}
