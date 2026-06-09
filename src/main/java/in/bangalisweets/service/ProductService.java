package in.bangalisweets.service;

import in.bangalisweets.entity.Category;
import in.bangalisweets.entity.Product;
import in.bangalisweets.repository.CategoryRepository;
import in.bangalisweets.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepo;
    private final CategoryRepository categoryRepo;

    public ProductService(ProductRepository productRepo, CategoryRepository categoryRepo) {
        this.productRepo = productRepo;
        this.categoryRepo = categoryRepo;
    }

    public List<Product> getAll() {
        return productRepo.findByActiveTrueOrderByNameEnAsc();
    }

    public Product getById(Long id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product getBySku(String sku) {
        return productRepo.findBySku(sku)
                .orElseThrow(() -> new RuntimeException("Product not found: " + sku));
    }

    public List<Product> getByCategory(String slug) {
        Category cat = categoryRepo.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Category not found: " + slug));
        return productRepo.findByCategoryAndActiveTrueOrderByNameEnAsc(cat);
    }

    public List<Product> search(String q) {
        return productRepo.search(q.trim());
    }

    public List<Product> getLowStock(int threshold) {
        return productRepo.findLowStock(threshold);
    }

    @Transactional
    public Product save(Product product) {
        return productRepo.save(product);
    }

    @Transactional
    public void delete(Long id) {
        Product p = getById(id);
        p.setActive(false);
        productRepo.save(p);
    }

    @Transactional
    public Product restock(Long id, java.math.BigDecimal qty) {
        Product p = getById(id);
        p.setStock(p.getStock().add(qty));
        return productRepo.save(p);
    }
}
