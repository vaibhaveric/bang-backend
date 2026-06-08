package in.bangalisweets.controller;

import in.bangalisweets.entity.Category;
import in.bangalisweets.entity.Product;
import in.bangalisweets.service.CategoryService;
import in.bangalisweets.service.FileService;
import in.bangalisweets.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/products")
public class AdminProductController {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final FileService fileService;

    public AdminProductController(ProductService productService, CategoryService categoryService,
                                   FileService fileService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.fileService = fileService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAll() {
        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<Product>> getLowStock(@RequestParam(defaultValue = "15") int threshold) {
        return ResponseEntity.ok(productService.getLowStock(threshold));
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Map<String, Object> body) {
        Product product = buildProduct(new Product(), body);
        return ResponseEntity.ok(productService.save(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        Product product = productService.getById(id);
        buildProduct(product, body);
        return ResponseEntity.ok(productService.save(product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/restock")
    public ResponseEntity<Product> restock(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        return ResponseEntity.ok(productService.restock(id, body.get("qty")));
    }

    @PostMapping("/upload-image")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam MultipartFile file) {
        String url = fileService.store(file);
        return ResponseEntity.ok(Map.of("url", url));
    }

    private Product buildProduct(Product p, Map<String, Object> body) {
        if (body.containsKey("sku")) p.setSku((String) body.get("sku"));
        if (body.containsKey("categoryId")) {
            Category cat = categoryService.getById(Long.valueOf(body.get("categoryId").toString()));
            p.setCategory(cat);
        }
        if (body.containsKey("nameEn")) p.setNameEn((String) body.get("nameEn"));
        if (body.containsKey("nameHi")) p.setNameHi((String) body.get("nameHi"));
        if (body.containsKey("price")) p.setPrice(new BigDecimal(body.get("price").toString()));
        if (body.containsKey("mrp")) p.setMrp(new BigDecimal(body.get("mrp").toString()));
        if (body.containsKey("unit")) p.setUnit((String) body.get("unit"));
        if (body.containsKey("stock")) p.setStock(Integer.parseInt(body.get("stock").toString()));
        if (body.containsKey("imageUrl")) p.setImageUrl((String) body.get("imageUrl"));
        if (body.containsKey("tag")) p.setTag((String) body.get("tag"));
        if (body.containsKey("description")) p.setDescription((String) body.get("description"));
        if (body.containsKey("ingredients")) p.setIngredients((String) body.get("ingredients"));
        if (body.containsKey("shelfLife")) p.setShelfLife((String) body.get("shelfLife"));
        if (body.containsKey("hsnCode")) p.setHsnCode((String) body.get("hsnCode"));
        if (body.containsKey("gstPercent")) p.setGstPercent(Integer.parseInt(body.get("gstPercent").toString()));
        if (body.containsKey("seoTitle")) p.setSeoTitle((String) body.get("seoTitle"));
        if (body.containsKey("seoDescription")) p.setSeoDescription((String) body.get("seoDescription"));
        if (body.containsKey("active")) p.setActive((Boolean) body.get("active"));
        return p;
    }
}
