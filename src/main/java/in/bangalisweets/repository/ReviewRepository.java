package in.bangalisweets.repository;

import in.bangalisweets.entity.Review;
import in.bangalisweets.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductAndStatusOrderByCreatedAtDesc(Product product, String status);
    List<Review> findByStatusOrderByCreatedAtDesc(String status);
    List<Review> findAllByOrderByCreatedAtDesc();
}
