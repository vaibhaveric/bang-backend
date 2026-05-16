// Shared catalog data + analytics for both directions
// Image URLs use a curated set of confirmed-working Unsplash photos.

const IMG = {
  hamper:    "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900&q=80&auto=format",
  hamper2:   "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&q=80&auto=format",
  rakhi:     "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&q=80&auto=format",
  brass:     "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=900&q=80&auto=format",
  bakery:    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80&auto=format",
  dairy:     "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=900&q=80&auto=format",
  birthday:  "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=900&q=80&auto=format",
  dryfruits: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&q=80&auto=format",
};

window.BB_DATA = {
  categories: [
    { slug: "sweets",     en: "Sweets",            hi: "मिठाई",        items: 84,  hero: IMG.hamper },
    { slug: "namkeen",    en: "Namkeen",           hi: "नमकीन",        items: 42,  hero: IMG.brass },
    { slug: "dryfruits",  en: "Dry Fruits",        hi: "ड्राई फ्रूट्स",  items: 31,  hero: IMG.dryfruits },
    { slug: "dairy",      en: "Dairy",             hi: "डेयरी",         items: 19,  hero: IMG.dairy },
    { slug: "bakery",     en: "Cake & Bakery",     hi: "केक एवं बेकरी",  items: 26,  hero: IMG.bakery },
    { slug: "hampers",    en: "Gift Hampers",      hi: "उपहार बॉक्स",    items: 17,  hero: IMG.rakhi },
    { slug: "birthday",   en: "Birthday",          hi: "जन्मदिन",       items: 38,  hero: IMG.birthday },
  ],

  hampers: [
    { id: "h1", en: "The Heritage Box",    hi: "हेरिटेज बॉक्स",
      pieces: "9 Mithai · 500g", price: 1499, mrp: 1799, img: IMG.hamper, tag: "Bestseller" },
    { id: "h2", en: "Diwali Gold Hamper",  hi: "दिवाली गोल्ड",
      pieces: "Mithai + Dry Fruits · 1.2kg", price: 2499, mrp: 2999, img: IMG.hamper2, tag: "Festive" },
    { id: "h3", en: "Rakhi Special",       hi: "राखी स्पेशल",
      pieces: "Mithai + Thali · 800g", price: 999, mrp: 1199, img: IMG.rakhi, tag: "Limited" },
    { id: "h4", en: "Corporate Premium",   hi: "कॉर्पोरेट प्रीमियम",
      pieces: "Custom Branding · 1kg", price: 1899, mrp: 2199, img: IMG.brass, tag: "B2B" },
  ],

  sweets: [
    { id: "s1", en: "Kaju Katli",       hi: "काजू कतली",     unit: "500g", price: 749, mrp: 849,
      img: IMG.hamper, stock: 42, sold: 312 },
    { id: "s2", en: "Motichoor Laddoo", hi: "मोतीचूर लड्डू",  unit: "500g", price: 349, mrp: 399,
      img: IMG.rakhi, stock: 28, sold: 244 },
    { id: "s3", en: "Bengali Rasgulla", hi: "रसगुल्ला",       unit: "1kg",  price: 449, mrp: 499,
      img: IMG.dairy, stock: 14, sold: 198 },
    { id: "s4", en: "Soan Papdi",       hi: "सोन पापड़ी",      unit: "500g", price: 249, mrp: 279,
      img: IMG.hamper2, stock: 67, sold: 156 },
    { id: "s5", en: "Gulab Jamun",      hi: "गुलाब जामुन",    unit: "1kg",  price: 399, mrp: 449,
      img: IMG.bakery, stock: 8, sold: 287 },
    { id: "s6", en: "Mysore Pak",       hi: "मैसूर पाक",      unit: "500g", price: 499, mrp: 549,
      img: IMG.brass, stock: 32, sold: 99 },
  ],

  sales14d: [22, 28, 24, 31, 36, 42, 38, 44, 51, 47, 53, 58, 49, 64],

  trafficSrc: [
    { label: "Direct",       v: 38, color: "var(--accent)" },
    { label: "Google",       v: 28, color: "var(--gold)" },
    { label: "Instagram",    v: 19, color: "var(--leaf)" },
    { label: "WhatsApp",     v: 11, color: "var(--berry)" },
    { label: "Other",        v: 4,  color: "var(--ink-3)" },
  ],

  topPages: [
    { p: "/collections/sweets",         v: 4820, t: "1:42" },
    { p: "/collections/hampers",        v: 3104, t: "2:18" },
    { p: "/products/kaju-katli",        v: 2944, t: "1:09" },
    { p: "/collections/dryfruits",      v: 2102, t: "1:33" },
    { p: "/products/diwali-gold-box",   v: 1888, t: "2:51" },
    { p: "/about",                      v:  912, t: "0:48" },
  ],

  customers: [
    { name: "Anjali Verma",   phone: "+91 ••••• 88412", orders: 12, ltv: 14380, last: "2d ago",  segment: "VIP" },
    { name: "Rohit Sharma",   phone: "+91 ••••• 21044", orders: 8,  ltv: 9244,  last: "5d ago",  segment: "Loyal" },
    { name: "Priya Singh",    phone: "+91 ••••• 76023", orders: 3,  ltv: 2890,  last: "1w ago",  segment: "New" },
    { name: "Vikas Goyal",    phone: "+91 ••••• 19842", orders: 21, ltv: 28102, last: "1d ago",  segment: "VIP" },
    { name: "Meena Tomar",    phone: "+91 ••••• 33417", orders: 5,  ltv: 4660,  last: "3d ago",  segment: "Loyal" },
    { name: "Saurabh Jain",   phone: "+91 ••••• 44509", orders: 2,  ltv: 1780,  last: "12d ago", segment: "At-risk" },
  ],

  funnel: [
    { step: "Visited Home",    v: 12400 },
    { step: "Viewed Category", v:  7820 },
    { step: "Viewed Product",  v:  4910 },
    { step: "Added to Cart",   v:  1880 },
    { step: "OTP Verified",    v:  1340 },
    { step: "Payment Started", v:  1180 },
    { step: "Order Placed",    v:   974 },
  ],
};
