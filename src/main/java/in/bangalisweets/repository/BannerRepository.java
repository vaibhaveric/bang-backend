package in.bangalisweets.repository;

import in.bangalisweets.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BannerRepository extends JpaRepository<Banner, Long> {
    Optional<Banner> findByKey(String key);
}
