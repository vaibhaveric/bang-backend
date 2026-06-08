package in.bangalisweets.controller;

import in.bangalisweets.entity.Review;
import in.bangalisweets.repository.ReviewRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewRepository reviewRepo;

    public ReviewController(ReviewRepository reviewRepo) {
        this.reviewRepo = reviewRepo;
    }

    @GetMapping
    public ResponseEntity<List<Review>> getApproved(@RequestParam(defaultValue = "12") int limit) {
        List<Review> all = reviewRepo.findByStatusOrderByCreatedAtDesc("approved");
        return ResponseEntity.ok(all.size() <= limit ? all : all.subList(0, limit));
    }
}
