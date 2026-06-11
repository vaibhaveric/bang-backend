package in.bangalisweets.service;

import in.bangalisweets.entity.Category;
import in.bangalisweets.repository.CategoryRepository;
import in.bangalisweets.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepo;
    private final ProductRepository productRepo;

    public CategoryService(CategoryRepository categoryRepo, ProductRepository productRepo) {
        this.categoryRepo = categoryRepo;
        this.productRepo = productRepo;
    }

    public List<Category> getAll() {
        return categoryRepo.findByActiveTrueOrderByDisplayOrderAsc();
    }

    public List<Category> getAllForAdmin() {
        return categoryRepo.findAll();
    }

    public Category getBySlug(String slug) {
        return categoryRepo.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Category not found: " + slug));
    }

    public Category getById(Long id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Transactional
    public Category save(Category category) {
        return categoryRepo.save(category);
    }

    // Hard delete — the category is removed from the DB so the admin and public lists
    // stay in sync. Refuse if products still reference it, to avoid orphaning them
    // (the category_id FK is NOT NULL).
    @Transactional
    public void delete(Long id) {
        Category c = getById(id);
        long products = productRepo.countByCategory(c);
        if (products > 0) {
            throw new IllegalStateException(
                "Cannot delete category with " + products + " product(s). Move or delete them first.");
        }
        categoryRepo.delete(c);
    }
}
