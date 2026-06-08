package in.bangalisweets.controller;

import in.bangalisweets.entity.Review;
import in.bangalisweets.repository.ReviewRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/reviews")
public class AdminReviewController {

    private final ReviewRepository reviewRepo;

    public AdminReviewController(ReviewRepository reviewRepo) {
        this.reviewRepo = reviewRepo;
    }

    @GetMapping
    public ResponseEntity<List<Review>> getAll(@RequestParam(required = false) String status) {
        if (status != null) return ResponseEntity.ok(reviewRepo.findByStatusOrderByCreatedAtDesc(status));
        return ResponseEntity.ok(reviewRepo.findAllByOrderByCreatedAtDesc());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Review> updateStatus(@PathVariable Long id,
                                               @RequestBody Map<String, String> body) {
        Review r = reviewRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        r.setStatus(body.get("status"));
        return ResponseEntity.ok(reviewRepo.save(r));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reviewRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
