package in.bangalisweets.controller;

import in.bangalisweets.entity.Category;
import in.bangalisweets.service.CategoryService;
import in.bangalisweets.service.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/categories")
public class AdminCategoryController {

    private final CategoryService categoryService;
    private final FileService fileService;

    public AdminCategoryController(CategoryService categoryService, FileService fileService) {
        this.categoryService = categoryService;
        this.fileService = fileService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAll() {
        return ResponseEntity.ok(categoryService.getAllForAdmin());
    }

    @PostMapping
    public ResponseEntity<Category> create(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(categoryService.save(buildCategory(new Category(), body)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        Category cat = categoryService.getById(id);
        return ResponseEntity.ok(categoryService.save(buildCategory(cat, body)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            categoryService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/upload-image")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam MultipartFile file) {
        return ResponseEntity.ok(Map.of("url", fileService.store(file)));
    }

    private Category buildCategory(Category c, Map<String, Object> body) {
        if (body.containsKey("slug")) c.setSlug((String) body.get("slug"));
        if (body.containsKey("nameEn")) c.setNameEn((String) body.get("nameEn"));
        if (body.containsKey("nameHi")) c.setNameHi((String) body.get("nameHi"));
        if (body.containsKey("description")) c.setDescription((String) body.get("description"));
        if (body.containsKey("heroImage")) c.setHeroImage((String) body.get("heroImage"));
        if (body.containsKey("displayOrder")) c.setDisplayOrder(Integer.parseInt(body.get("displayOrder").toString()));
        if (body.containsKey("active")) c.setActive((Boolean) body.get("active"));
        if (body.containsKey("featured")) c.setFeatured((Boolean) body.get("featured"));
        return c;
    }
}
