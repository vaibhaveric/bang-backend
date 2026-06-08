package in.bangalisweets.repository;

import in.bangalisweets.entity.OtpStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpStore, Long> {
    Optional<OtpStore> findTopByPhoneAndUsedFalseOrderByExpiresAtDesc(String phone);

    @Modifying
    @Transactional
    @Query("DELETE FROM OtpStore o WHERE o.expiresAt < :now")
    void deleteExpired(@Param("now") LocalDateTime now);
}
