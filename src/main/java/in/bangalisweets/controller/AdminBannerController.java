package in.bangalisweets.controller;

import in.bangalisweets.entity.Banner;
import in.bangalisweets.repository.BannerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class AdminBannerController {

    private final BannerRepository bannerRepo;

    public AdminBannerController(BannerRepository bannerRepo) {
        this.bannerRepo = bannerRepo;
    }

    @GetMapping("/banners")
    public ResponseEntity<Map<String, String>> getAll() {
        Map<String, String> result = bannerRepo.findAll().stream()
                .collect(Collectors.toMap(Banner::getKey, b -> b.getValue() != null ? b.getValue() : ""));
        return ResponseEntity.ok(result);
    }

    @PutMapping("/admin/banners")
    public ResponseEntity<Void> updateAll(@RequestBody Map<String, String> values) {
        values.forEach((key, value) -> {
            Banner banner = bannerRepo.findByKey(key).orElseGet(() -> {
                Banner b = new Banner();
                b.setKey(key);
                return b;
            });
            banner.setValue(value);
            bannerRepo.save(banner);
        });
        return ResponseEntity.ok().build();
    }
}
