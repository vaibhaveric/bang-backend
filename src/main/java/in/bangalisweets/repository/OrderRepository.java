package in.bangalisweets.repository;

import in.bangalisweets.entity.Order;
import in.bangalisweets.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderNumber(String orderNumber);
    List<Order> findByUserOrderByCreatedAtDesc(User user);
    List<Order> findAllByOrderByCreatedAtDesc();

    @Query("SELECT o FROM Order o WHERE o.createdAt >= :from ORDER BY o.createdAt DESC")
    List<Order> findOrdersAfter(@Param("from") LocalDateTime from);

    @Query("SELECT o FROM Order o WHERE o.status = :status ORDER BY o.createdAt DESC")
    List<Order> findByStatus(@Param("status") String status);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.createdAt >= :from")
    long countOrdersAfter(@Param("from") LocalDateTime from);

    @Query("SELECT COALESCE(SUM(o.total), 0) FROM Order o WHERE o.createdAt >= :from AND o.status != 'Cancelled'")
    java.math.BigDecimal sumRevenueAfter(@Param("from") LocalDateTime from);

    @Query(value = "SELECT DATE(created_at) as day, COUNT(*) as cnt, COALESCE(SUM(total), 0) as rev " +
                   "FROM orders WHERE created_at >= :from AND status != 'Cancelled' " +
                   "GROUP BY DATE(created_at) ORDER BY DATE(created_at) ASC",
           nativeQuery = true)
    List<Object[]> dailySalesAfter(@Param("from") LocalDateTime from);
}
