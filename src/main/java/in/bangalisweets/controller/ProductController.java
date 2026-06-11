package in.bangalisweets.controller;

import in.bangalisweets.entity.Product;
import in.bangalisweets.entity.Review;
import in.bangalisweets.repository.ReviewRepository;
import in.bangalisweets.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final ReviewRepository reviewRepo;

    public ProductController(ProductService productService, ReviewRepository reviewRepo) {
        this.productService = productService;
        this.reviewRepo = reviewRepo;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAll(@RequestParam(required = false) String category) {
        if (category != null && !category.isBlank()) {
            return ResponseEntity.ok(productService.getByCategory(category));
        }
        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productService.getById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/category/{slug}")
    public ResponseEntity<List<Product>> getByCategory(@PathVariable String slug) {
        return ResponseEntity.ok(productService.getByCategory(slug));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> search(@RequestParam String q) {
        if (q == null || q.isBlank()) return ResponseEntity.ok(List.of());
        return ResponseEntity.ok(productService.search(q));
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long id) {
        Product product = productService.getById(id);
        return ResponseEntity.ok(reviewRepo.findByProductAndStatusOrderByCreatedAtDesc(product, "approved"));
    }
}
