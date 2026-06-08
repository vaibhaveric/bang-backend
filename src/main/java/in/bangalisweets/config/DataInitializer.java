package in.bangalisweets.config;

import in.bangalisweets.entity.*;
import in.bangalisweets.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seed(CategoryRepository categoryRepo,
                           ProductRepository productRepo,
                           CouponRepository couponRepo,
                           ShippingZoneRepository zoneRepo,
                           BannerRepository bannerRepo) {
        return args -> {
            if (categoryRepo.count() > 0) return;

            // --- Categories ---
            Category sweets   = cat(categoryRepo, "sweets",    "Sweets",        "मिठाई",          1, "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900&q=80", "Hand-crafted mithai made fresh daily with pure desi ghee. From Kaju Katli to Gulab Jamun.");
            Category namkeen  = cat(categoryRepo, "namkeen",   "Namkeen",       "नमकीन",           2, "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=900&q=80", "Crunchy, spiced snacks for every occasion. Bhujia, Mixture, Mathri and more.");
            Category dryfruit = cat(categoryRepo, "dryfruits", "Dry Fruits",    "ड्राई फ्रूट्स",      3, "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&q=80", "Premium quality dry fruits sourced fresh. Cashews, Almonds, Pistachios and more.");
            Category dairy    = cat(categoryRepo, "dairy",     "Dairy",         "डेयरी",            4, "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=900&q=80", "Fresh dairy products made daily from pure milk.");
            Category bakery   = cat(categoryRepo, "bakery",    "Cake & Bakery", "केक एवं बेकरी",    5, "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80", "Freshly baked cakes, pastries and bakery items for every celebration.");
            Category hampers  = cat(categoryRepo, "hampers",   "Gift Hampers",  "उपहार बॉक्स",      6, "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900&q=80", "Beautifully curated gift boxes for Diwali, Rakhi, corporate gifting and more.");
            cat(categoryRepo, "birthday", "Birthday", "जन्मदिन", 7, "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=900&q=80", "Make every birthday special with our custom cakes and celebration sweets.");

            // --- Products: Sweets ---
            product(productRepo, "s1", sweets, "Kaju Katli", "काजू कतली", "500g", 749, 849, 42, "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900&q=80", "Bestseller", "Premium quality cashew fudge made with pure desi ghee. Our signature recipe since 1987.", "Cashews, Sugar, Desi Ghee, Cardamom", "15 days · Keep refrigerated", "1704", 5, "Kaju Katli Online | Bangali Sweets Bhind", "Order fresh Kaju Katli online from Bangali Sweets, Bhind's favourite mithai shop since 1987.");
            product(productRepo, "s2", sweets, "Motichoor Laddoo", "मोतीचूर लड्डू", "500g", 349, 399, 28, "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&q=80", null, "Melt-in-mouth laddoos made from fine gram flour boondi fried in ghee.", "Gram Flour, Sugar Syrup, Ghee, Saffron, Rose Water", "10 days · Store in cool dry place", "1704", 5, "Motichoor Laddoo Online | Bangali Sweets", "Fresh Motichoor Laddoo from Bangali Sweets Bhind. Order online for same-day delivery.");
            product(productRepo, "s3", sweets, "Bengali Rasgulla", "रसगुल्ला", "1kg", 449, 499, 14, "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=900&q=80", null, "Soft, spongy rasgullas soaked in light sugar syrup. A Bengali classic.", "Chenna, Sugar, Rose Water", "5 days · Keep refrigerated", "2106", 5, "Bengali Rasgulla Online | Bangali Sweets", "Soft Bengali Rasgulla from Bhind's best sweet shop. Fresh daily, delivered to your door.");
            product(productRepo, "s4", sweets, "Soan Papdi", "सोन पापड़ी", "500g", 249, 279, 67, "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&q=80", null, "Flaky, melt-in-mouth confection. Perfect for festivals and gifting.", "Gram Flour, Sugar, Ghee, Cardamom, Almonds", "30 days · Store in cool dry place", "1704", 5, null, null);
            product(productRepo, "s5", sweets, "Gulab Jamun", "गुलाब जामुन", "1kg", 399, 449, 8, "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80", null, "Soft khoya dumplings soaked in rose-flavoured sugar syrup.", "Khoya, All Purpose Flour, Sugar, Rose Water, Cardamom", "7 days · Keep refrigerated", "2106", 5, null, null);
            product(productRepo, "s6", sweets, "Mysore Pak", "मैसूर पाक", "500g", 499, 549, 32, "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=900&q=80", null, "Rich, crumbly South Indian sweet made with generous amounts of ghee and gram flour.", "Gram Flour, Ghee, Sugar, Cardamom", "20 days · Store in cool dry place", "1704", 5, null, null);

            // --- Products: Namkeen ---
            product(productRepo, "n1", namkeen, "Aloo Bhujia", "आलू भुजिया", "500g", 199, 229, 55, "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=900&q=80", "Bestseller", "Crispy, spiced potato noodles. Goes perfectly with chai.", "Potato, Gram Flour, Spices, Salt, Oil", "90 days · Store in airtight container", "2106", 12, null, null);
            product(productRepo, "n2", namkeen, "Moong Dal", "मूंग दाल", "500g", 229, 259, 38, "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900&q=80", null, "Crunchy fried split moong lentils lightly seasoned with spices.", "Moong Dal, Salt, Spices, Oil", "90 days · Store in airtight container", "2106", 12, null, null);
            product(productRepo, "n3", namkeen, "Mathri", "मठरी", "500g", 179, 199, 29, "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&q=80", null, "Crispy, flaky wheat crackers fried in pure ghee. A tea-time favourite.", "Wheat Flour, Ghee, Ajwain, Salt", "60 days · Store in airtight container", "2106", 12, null, null);

            // --- Products: Dry Fruits ---
            product(productRepo, "d1", dryfruit, "Premium Cashews (W240)", "प्रीमियम काजू", "500g", 649, 749, 22, "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&q=80", "Bestseller", "Whole cashews, Grade W240. Fresh, crunchy and naturally rich.", "Cashews", "180 days · Store in cool dry place", "0801", 0, "Buy Cashews Online | Bangali Sweets Bhind", "Premium whole cashews W240 grade. Fresh and crunchy, delivered pan-India from Bhind.");
            product(productRepo, "d2", dryfruit, "Almonds (California)", "बादाम", "500g", 499, 579, 18, "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=900&q=80", null, "Premium California almonds. Rich in nutrients, perfect for daily snacking.", "Almonds", "180 days · Store in cool dry place", "0802", 0, null, null);
            product(productRepo, "d3", dryfruit, "Pistachios (Roasted)", "पिस्ता", "250g", 599, 699, 12, "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&q=80", null, "Lightly salted roasted pistachios. Freshly sourced from the best farms.", "Pistachios, Salt", "180 days · Store in cool dry place", "0802", 0, null, null);

            // --- Products: Dairy ---
            product(productRepo, "dy1", dairy, "Fresh Paneer", "पनीर", "500g", 299, 329, 20, "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=900&q=80", null, "Soft, fresh paneer made from full-fat cow milk. Made fresh every morning.", "Full Fat Cow Milk, Food Grade Acid", "3 days · Keep refrigerated", "0406", 12, null, null);
            product(productRepo, "dy2", dairy, "Malai Lassi", "मलाई लस्सी", "500ml", 89, 99, 35, "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=900&q=80", null, "Thick, creamy sweet lassi topped with fresh malai.", "Full Fat Yogurt, Sugar, Cream, Cardamom, Rose Water", "1 day · Keep refrigerated", "2202", 12, null, null);

            // --- Products: Bakery ---
            product(productRepo, "b1", bakery, "Chocolate Truffle Cake (1kg)", "चॉकलेट ट्रफल केक", "1kg", 899, 999, 8, "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80", "Bestseller", "Rich, moist chocolate cake layered with dark chocolate ganache. Order 24hrs in advance.", "Refined Flour, Cocoa, Eggs, Butter, Dark Chocolate, Cream", "2 days · Keep refrigerated", "1905", 18, null, null);
            product(productRepo, "b2", bakery, "Vanilla Cream Cake (500g)", "वनीला क्रीम केक", "500g", 499, 549, 12, "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80", null, "Light, airy vanilla sponge with fresh whipped cream frosting.", "Refined Flour, Eggs, Butter, Vanilla, Cream, Sugar", "2 days · Keep refrigerated", "1905", 18, null, null);

            // --- Products: Hampers ---
            product(productRepo, "h1", hampers, "The Heritage Box", "हेरिटेज बॉक्स", "9 Mithai · 500g", 1499, 1799, 25, "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900&q=80", "Bestseller", "Our best-selling assorted mithai box with 9 handpicked sweets. Perfect for all occasions.", "Assorted Mithai, Decorative Box", "7 days · Keep refrigerated", "1704", 5, "Gift Hamper Online | Heritage Mithai Box | Bangali Sweets", "Order The Heritage Box online. 9 assorted mithai from Bangali Sweets Bhind. Same-day delivery in Bhind.");
            product(productRepo, "h2", hampers, "Diwali Gold Hamper", "दिवाली गोल्ड", "Mithai + Dry Fruits · 1.2kg", 2499, 2999, 15, "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&q=80", "Festive", "Premium Diwali gift hamper with assorted mithai, premium dry fruits in a gold gift box.", "Assorted Mithai, Cashews, Almonds, Pistachios, Gold Gift Box", "15 days · Keep in cool place", "1704", 5, "Diwali Hamper Online | Bangali Sweets Bhind", "Order Diwali Gold Hamper online. Premium mithai and dry fruits in a luxury gift box.");
            product(productRepo, "h3", hampers, "Rakhi Special", "राखी स्पेशल", "Mithai + Thali · 800g", 999, 1199, 20, "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&q=80", "Limited", "Celebrate Raksha Bandhan with our special hamper including assorted mithai and a Rakhi thali.", "Assorted Mithai, Rakhi Thali, Decorative Box", "7 days · Keep refrigerated", "1704", 5, null, null);
            product(productRepo, "h4", hampers, "Corporate Premium", "कॉर्पोरेट प्रीमियम", "Custom Branding · 1kg", 1899, 2199, 30, "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=900&q=80", "B2B", "Premium corporate gift hamper with custom branding option. Minimum order 10 boxes.", "Assorted Premium Mithai, Custom Branded Box", "15 days · Keep in cool place", "1704", 5, null, null);

            // --- Coupons ---
            coupon(couponRepo, "DIWALI20", "percent", 20, 999, 500, "all", "2026-11-15", 0, "active", "20% off on orders above ₹999");
            coupon(couponRepo, "RAKHI100", "flat", 100, 499, null, "category:hampers", "2026-08-19", 0, "active", "₹100 off on hampers above ₹499");
            coupon(couponRepo, "NEWMITHAI", "percent", 15, 0, 200, "all", "2026-12-31", 1, "active", "15% off on your first order");
            coupon(couponRepo, "BULK10", "percent", 10, 5000, 1000, "all", "2026-12-31", 0, "active", "10% off on bulk orders above ₹5000");
            coupon(couponRepo, "FREE89", "shipping", 89, 299, null, "all", "2026-12-31", 0, "active", "Free shipping on orders above ₹299");

            // --- Shipping Zones ---
            zone(zoneRepo, "Bhind Local", "477[0-9]{3}", "delivery", "Same-day before 4 PM", 89, 999, 1);
            zone(zoneRepo, "MP / UP / Rajasthan", "4[0-9]{5}|20[0-9]{4}|30[0-9]{4}", "ship", "2-3 business days", 119, 1499, 2);
            zone(zoneRepo, "Metro Cities", "1[0-9]{5}|4[0-9]{5}|56[0-9]{4}|6[0-9]{5}", "ship", "3-5 business days", 149, 1999, 3);
            zone(zoneRepo, "Rest of India", "[0-9]{6}", "ship", "5-7 business days", 199, 2499, 4);

            // --- Banners / CMS ---
            banner(bannerRepo, "promo_bar", "🚚 Free delivery in Bhind on orders above ₹999 · 🪷 Fresh mithai daily · ☎ 079740 96667");
            banner(bannerRepo, "hero_eyebrow", "Since 1987 · Bhind's Favourite");
            banner(bannerRepo, "hero_title_en", "Hand-made Mithai & Gift Hampers");
            banner(bannerRepo, "hero_title_hi", "हाथ से बनी मिठाई");
            banner(bannerRepo, "hero_cta1", "Shop Sweets");
            banner(bannerRepo, "hero_cta2", "Gift Hampers");
            banner(bannerRepo, "seo_title", "Bangali Sweets & Dryfruits, Bhind — Hand-made Mithai, Namkeen & Gift Hampers since 1987");
            banner(bannerRepo, "seo_description", "Order hand-made mithai, namkeen, dry fruits and gift hampers from Bhind's favourite sweet shop since 1987. Pure desi ghee, same-day Bhind delivery, pan-India shipping.");
        };
    }

    private Category cat(CategoryRepository repo, String slug, String en, String hi, int order, String img, String desc) {
        Category c = new Category();
        c.setSlug(slug); c.setNameEn(en); c.setNameHi(hi);
        c.setDisplayOrder(order); c.setHeroImage(img); c.setDescription(desc);
        return repo.save(c);
    }

    private void product(ProductRepository repo, String sku, Category cat, String en, String hi,
                         String unit, int price, int mrp, int stock, String img, String tag,
                         String desc, String ingredients, String shelf,
                         String hsn, int gst, String seoTitle, String seoDesc) {
        Product p = new Product();
        p.setSku(sku); p.setCategory(cat); p.setNameEn(en); p.setNameHi(hi);
        p.setUnit(unit); p.setPrice(BigDecimal.valueOf(price)); p.setMrp(BigDecimal.valueOf(mrp));
        p.setStock(stock); p.setImageUrl(img); p.setTag(tag);
        p.setDescription(desc); p.setIngredients(ingredients); p.setShelfLife(shelf);
        p.setHsnCode(hsn); p.setGstPercent(gst);
        p.setSeoTitle(seoTitle); p.setSeoDescription(seoDesc);
        repo.save(p);
    }

    private void coupon(CouponRepository repo, String code, String type, double value,
                        double minOrder, Integer maxDisc, String applies,
                        String validTill, int maxUses, String status, String desc) {
        Coupon c = new Coupon();
        c.setCode(code); c.setType(type); c.setValue(BigDecimal.valueOf(value));
        c.setMinOrder(BigDecimal.valueOf(minOrder));
        if (maxDisc != null) c.setMaxDiscount(BigDecimal.valueOf(maxDisc));
        c.setApplies(applies); c.setValidTill(LocalDate.parse(validTill));
        c.setMaxUses(maxUses); c.setStatus(status); c.setDescription(desc);
        repo.save(c);
    }

    private void zone(ShippingZoneRepository repo, String name, String pattern,
                      String mode, String days, int rate, int freeOver, int order) {
        ShippingZone z = new ShippingZone();
        z.setName(name); z.setPinPattern(pattern); z.setMode(mode);
        z.setDeliveryDays(days); z.setBaseRate(BigDecimal.valueOf(rate));
        z.setFreeShippingOver(BigDecimal.valueOf(freeOver)); z.setDisplayOrder(order);
        repo.save(z);
    }

    private void banner(BannerRepository repo, String key, String value) {
        Banner b = new Banner();
        b.setKey(key); b.setValue(value);
        repo.save(b);
    }
}
