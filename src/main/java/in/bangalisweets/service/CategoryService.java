package in.bangalisweets.service;

import in.bangalisweets.entity.Category;
import in.bangalisweets.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepo;

    public CategoryService(CategoryRepository categoryRepo) {
        this.categoryRepo = categoryRepo;
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

    @Transactional
    public void delete(Long id) {
        Category c = getById(id);
        c.setActive(false);
        categoryRepo.save(c);
    }
}
