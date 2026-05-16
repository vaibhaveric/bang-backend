/* Admin — shared state, mock seeds, helpers, common UI snippets.
 * Loaded first; every tab module reads from window.AD.
 */

(function() {
  "use strict";

  // === Persistent admin store ===
  const KEY_PRODUCTS = "bb_admin_products_v1";
  const KEY_COUPONS  = "bb_admin_coupons_v1";
  const KEY_BANNERS  = "bb_admin_banners_v1";
  const KEY_REVIEWS  = "bb_admin_reviews_v1";
  const KEY_STAFF    = "bb_admin_staff_v1";
  const KEY_OUTLETS  = "bb_admin_outlets_v1";
  const KEY_NOTIF    = "bb_admin_notif_v1";
  const KEY_ZONES    = "bb_admin_zones_v1";

  function safe(k, fallback) {
    try { const s = JSON.parse(localStorage.getItem(k)); return s || fallback; } catch(e) { return fallback; }
  }
  function save(k, v) { localStorage.setItem(k, JSON.stringify(v)); }

  // === Default seeds ===

  // Coupons
  const SEED_COUPONS = [
    { code: "DIWALI20",   type: "percent", value: 20,  minOrder: 999,  maxDisc: 500, applies: "all",      validTill: "2026-11-15", uses: 142, maxUses: 1000, status: "active",  desc: "20% off Diwali festive offer" },
    { code: "RAKHI100",   type: "flat",    value: 100, minOrder: 499,  applies: "category:hampers", validTill: "2026-08-25", uses: 67,  maxUses: 500,  status: "active",  desc: "₹100 off Rakhi hampers" },
    { code: "NEWMITHAI",  type: "percent", value: 15,  minOrder: 0,    applies: "all",      validTill: "2026-12-31", uses: 412, maxUses: 0,    status: "active",  desc: "First-order discount · 15% off" },
    { code: "BULK10",     type: "percent", value: 10,  minOrder: 5000, applies: "all",      validTill: "2027-03-31", uses: 18,  maxUses: 0,    status: "active",  desc: "Bulk orders above ₹5000" },
    { code: "FREE89",     type: "shipping",value: 89,  minOrder: 0,    applies: "all",      validTill: "2026-06-30", uses: 89,  maxUses: 200,  status: "scheduled", desc: "Free shipping on next order" },
    { code: "DIWALI19",   type: "percent", value: 19,  minOrder: 999,  applies: "all",      validTill: "2025-11-15", uses: 248, maxUses: 1000, status: "expired", desc: "Last year's Diwali offer" },
  ];

  // Banners / homepage CMS
  const SEED_BANNERS = {
    promo: "🎁 Free delivery on orders above ₹999 in Bhind · Same-day before 4 PM",
    hero: {
      eyebrow: "Festive Edit · Diwali 2026",
      title: "Gifts that arrive with blessings.",
      titleHi: "मिठास और स्नेह से भरे, बंगाली स्वीट्स के पारंपरिक उपहार।",
      ctaPrimary: "Shop Hampers",
      ctaPrimaryLink: "category.html?slug=hampers",
      ctaSecondary: "Build your own box",
      ctaSecondaryLink: "collections.html",
      status: "live",
    },
    featuredCategories: ["sweets","namkeen","dryfruits","dairy","bakery","hampers","birthday"],
    featuredHampers: ["h1","h2","h3","h4"],
    bestsellerIds: ["h1","h2","s1","s5"],
    seo: {
      title: "Bangali Sweets & Dryfruits, Bhind — Hand-made Mithai since 1987",
      desc: "Order hand-made mithai, namkeen, dry fruits and gift hampers from Bhind's favourite sweet shop. Pure desi ghee, same-day Bhind delivery, pan-India shipping.",
    },
  };

  // Reviews (pending + approved + flagged)
  const SEED_REVIEWS = [
    { id: "r1", productId: "s1", customer: "Anjali Verma",  phone: "•••88412", rating: 5, date: "5 days ago",  text: "The Kaju Katli is perfect — exactly like grandma's recipe. Will order again.", status: "pending" },
    { id: "r2", productId: "h2", customer: "Vikas Goyal",   phone: "•••19842", rating: 5, date: "1 week ago",  text: "Bought 25 hampers for my team. Custom branding looked great, on-time delivery. Bangali Sweets did us proud.", status: "approved" },
    { id: "r3", productId: "s3", customer: "Priya Singh",   phone: "•••76023", rating: 4, date: "3 days ago",  text: "Rasgullas came a bit squeezed. Taste was fine though. Maybe better packaging?", status: "pending" },
    { id: "r4", productId: "s5", customer: "Rohit Sharma",  phone: "•••21044", rating: 5, date: "2 days ago",  text: "Gulab jamun is the best. Reheated and tastes fresh out of the kadhai.", status: "approved" },
    { id: "r5", productId: "h1", customer: "Meena Tomar",   phone: "•••33417", rating: 3, date: "1 week ago",  text: "Was expecting a bigger box for ₹1499 — though contents were good.", status: "pending" },
    { id: "r6", productId: "s2", customer: "Saurabh Jain",  phone: "•••44509", rating: 1, date: "4 days ago",  text: "Pathetic. Wasted my money. Don't buy.", status: "flagged" },
    { id: "r7", productId: "d1", customer: "Aakash Mehta",  phone: "•••67891", rating: 5, date: "Today",       text: "Kashmiri almonds are top grade. Better than what I get from local Bhind stores.", status: "pending" },
  ];

  // Staff
  const SEED_STAFF = [
    { id: "u1", name: "Ramesh Kumar",   role: "Owner",         email: "ramesh@bangalisweets.in",  phone: "+91 7974096667", active: true,  lastLogin: "Just now",  outlet: "Bhind HQ", initials: "RK" },
    { id: "u2", name: "Bhaiya Ram",     role: "Kitchen Head",  email: "kitchen@bangalisweets.in", phone: "+91 9876543210", active: true,  lastLogin: "2h ago",    outlet: "Bhind HQ", initials: "BR" },
    { id: "u3", name: "Sunita Devi",    role: "Manager",       email: "sunita@bangalisweets.in",  phone: "+91 9123456780", active: true,  lastLogin: "Yesterday", outlet: "Bhind HQ", initials: "SD" },
    { id: "u4", name: "Karan Yadav",    role: "Cashier",       email: "karan@bangalisweets.in",   phone: "+91 9988776655", active: true,  lastLogin: "4h ago",    outlet: "Bhind HQ", initials: "KY" },
    { id: "u5", name: "Rohit Tomar",    role: "Delivery",      email: "delivery1@bangalisweets.in", phone: "+91 9234567890", active: true,  lastLogin: "10m ago", outlet: "Bhind HQ", initials: "RT" },
    { id: "u6", name: "Manoj Jain",     role: "Delivery",      email: "delivery2@bangalisweets.in", phone: "+91 9345678901", active: false, lastLogin: "3 days ago", outlet: "Bhind HQ", initials: "MJ" },
  ];

  const ROLES = [
    { id: "owner",    label: "Owner",        desc: "Full access to all admin sections" },
    { id: "manager",  label: "Manager",      desc: "All except Settings, Staff" },
    { id: "kitchen",  label: "Kitchen Head", desc: "Orders, Catalog, Stock only" },
    { id: "cashier",  label: "Cashier",      desc: "Orders POS view only" },
    { id: "delivery", label: "Delivery",     desc: "Out-for-delivery queue only" },
  ];

  const PERMS = [
    "Overview",
    "Orders",
    "Catalog",
    "Categories",
    "Customers",
    "Coupons",
    "Banners / CMS",
    "Reviews",
    "Reports",
    "Staff",
    "Outlets",
    "Notifications",
    "Shipping",
    "Settings",
  ];

  const ROLE_PERMS = {
    owner:    PERMS,
    manager:  PERMS.filter(p => !["Staff","Settings"].includes(p)),
    kitchen:  ["Overview","Orders","Catalog"],
    cashier:  ["Overview","Orders"],
    delivery: ["Orders"],
  };

  // Outlets
  const SEED_OUTLETS = [
    {
      id: "o1", name: "Bhind HQ · Pustak Bazar", primary: true,
      address: "HQ8P+P6R, Pustak Bazar, Mahveer Ganj, Kiratpura, Bhind, MP 477001",
      phone: "07974096667",
      hours: "9 AM – 10 PM · Open daily",
      manager: "Ramesh Kumar",
      staff: 6,
      ordersToday: 42,
      revToday: 84230,
      status: "active",
    },
  ];

  // Notification templates
  const SEED_NOTIF = {
    whatsapp: [
      { id: "n1", event: "Order placed",  body: "नमस्ते {name}! 🎉 Your Bangali Sweets order *{order}* for ₹{total} is confirmed. We'll start packing shortly. Track: {link}", enabled: true },
      { id: "n2", event: "Order packed",  body: "Your mithai is packed and ready! 📦 Order *{order}* will be dispatched within the hour. Track: {link}", enabled: true },
      { id: "n3", event: "Out for delivery", body: "🛵 Your order *{order}* is out for delivery. Our rider {rider} ({riderPhone}) will reach you by {eta}.", enabled: true },
      { id: "n4", event: "Delivered",     body: "✨ Your mithai is home! Hope you enjoy *{order}*. Loved it? Drop us a review: {reviewLink}. — Bangali Sweets, Bhind", enabled: true },
      { id: "n5", event: "Abandoned cart", body: "Hi {name}, you left mithai in your bag at Bangali Sweets 🍬. Pick up where you left: {cartLink}", enabled: false },
    ],
    sms: [
      { id: "s1", event: "OTP",            body: "Your Bangali Sweets OTP is {otp}. Valid for 5 min. Do not share. -BNGSWT", enabled: true },
      { id: "s2", event: "Order placed",   body: "Order {order} placed ₹{total}. Track: {link} -BNGSWT", enabled: true },
      { id: "s3", event: "Order delivered", body: "Order {order} delivered. Enjoy your mithai! -BNGSWT", enabled: true },
    ],
    email: [
      { id: "e1", event: "Order placed (invoice)", subject: "Your Bangali Sweets order #{order}", body: "Dear {name},\n\nThanks for your order. PDF invoice attached.\n\n— Bangali Sweets", enabled: true },
    ],
  };

  // Shipping zones
  const SEED_ZONES = [
    { id: "z1", name: "Bhind Local",           pinPattern: "4770xx",      mode: "delivery", days: "Same-day · before 4 PM", baseRate: 89,  freeOver: 999,  status: "active" },
    { id: "z2", name: "MP / UP / Rajasthan",   pinPattern: "11xxxx, 24xxxx, 30xxxx", mode: "ship", days: "2-3 business days",     baseRate: 119, freeOver: 1499, status: "active" },
    { id: "z3", name: "Metro Cities",          pinPattern: "11xxxx, 40xxxx, 56xxxx, 60xxxx, 70xxxx", mode: "ship", days: "3-5 business days", baseRate: 149, freeOver: 1999, status: "active" },
    { id: "z4", name: "Rest of India",         pinPattern: "*",           mode: "ship", days: "5-7 business days",     baseRate: 199, freeOver: 2499, status: "active" },
    { id: "z5", name: "North-East / J&K",      pinPattern: "78xxxx, 79xxxx, 19xxxx", mode: "ship", days: "7-10 business days", baseRate: 299, freeOver: 0, status: "paused" },
  ];

  // Mock historic data for charts/reports
  const SALES_14D  = [22, 28, 24, 31, 36, 42, 38, 44, 51, 47, 53, 58, 49, 64].map(x => x * 1800);
  const SALES_90D  = Array.from({length: 90}, (_, i) => 30000 + Math.sin(i*0.18)*8000 + Math.random()*12000 + i*250);
  const TRAFFIC_SRC = [
    { label: "Direct",       v: 38, color: "#6b2727" },
    { label: "Google",       v: 28, color: "#b58838" },
    { label: "Instagram",    v: 19, color: "#2f4a2a" },
    { label: "WhatsApp",     v: 11, color: "#8a2a3a" },
    { label: "Other",        v: 4,  color: "#8a7860" },
  ];
  const FUNNEL = [
    { step: "Visited Home",    v: 12400 },
    { step: "Viewed Category", v:  7820 },
    { step: "Viewed Product",  v:  4910 },
    { step: "Added to Cart",   v:  1880 },
    { step: "OTP Verified",    v:  1340 },
    { step: "Payment Started", v:  1180 },
    { step: "Order Placed",    v:   974 },
  ];
  const MOCK_CUSTOMERS = [
    { id: "c1", name: "Anjali Verma",   phone: "+91 98765 88412", email: "anjali.v@email.com",  orderCount: 12, ltv: 14380, last: "2d ago",  segment: "VIP",     joined: "Aug 2024", initials: "AV" },
    { id: "c2", name: "Rohit Sharma",   phone: "+91 98213 21044", email: "rohit@email.com",     orderCount: 8,  ltv: 9244,  last: "5d ago",  segment: "Loyal",   joined: "Mar 2025", initials: "RS" },
    { id: "c3", name: "Priya Singh",    phone: "+91 91144 76023", email: "priya.s@email.com",   orderCount: 3,  ltv: 2890,  last: "1w ago",  segment: "New",     joined: "Apr 2026", initials: "PS" },
    { id: "c4", name: "Vikas Goyal",    phone: "+91 99887 19842", email: "vikas@goyalentpr.in", orderCount: 21, ltv: 28102, last: "1d ago",  segment: "VIP",     joined: "Jan 2024", initials: "VG" },
    { id: "c5", name: "Meena Tomar",    phone: "+91 92345 33417", email: "meena.t@email.com",   orderCount: 5,  ltv: 4660,  last: "3d ago",  segment: "Loyal",   joined: "Nov 2025", initials: "MT" },
    { id: "c6", name: "Saurabh Jain",   phone: "+91 93456 44509", email: "saurabh@email.com",   orderCount: 2,  ltv: 1780,  last: "12d ago", segment: "At-risk", joined: "Feb 2026", initials: "SJ" },
    { id: "c7", name: "Aakash Mehta",   phone: "+91 94567 67891", email: "aakash@email.com",    orderCount: 4,  ltv: 3120,  last: "6h ago",  segment: "Loyal",   joined: "Dec 2025", initials: "AM" },
    { id: "c8", name: "Kavita Sahay",   phone: "+91 95678 78902", email: "kavita@email.com",    orderCount: 1,  ltv: 449,   last: "1m ago",  segment: "New",     joined: "Today", initials: "KS" },
  ];

  // === Public API ===
  window.AD = {
    // persistent stores (load with seed fallback)
    products: function() {
      const stored = safe(KEY_PRODUCTS, null);
      if (stored && stored.length) return stored;
      return BB.products.map(p => ({...p}));
    },
    saveProducts: list => save(KEY_PRODUCTS, list),

    coupons:  () => safe(KEY_COUPONS, SEED_COUPONS),
    saveCoupons: v => save(KEY_COUPONS, v),

    banners:  () => safe(KEY_BANNERS, SEED_BANNERS),
    saveBanners: v => save(KEY_BANNERS, v),

    reviews:  () => safe(KEY_REVIEWS, SEED_REVIEWS),
    saveReviews: v => save(KEY_REVIEWS, v),

    staff:    () => safe(KEY_STAFF, SEED_STAFF),
    saveStaff: v => save(KEY_STAFF, v),

    outlets:  () => safe(KEY_OUTLETS, SEED_OUTLETS),
    saveOutlets: v => save(KEY_OUTLETS, v),

    notif:    () => safe(KEY_NOTIF, SEED_NOTIF),
    saveNotif: v => save(KEY_NOTIF, v),

    zones:    () => safe(KEY_ZONES, SEED_ZONES),
    saveZones: v => save(KEY_ZONES, v),

    // constants
    roles: ROLES,
    perms: PERMS,
    rolePerms: ROLE_PERMS,

    // mock historic
    sales14d: SALES_14D,
    sales90d: SALES_90D,
    traffic:  TRAFFIC_SRC,
    funnel:   FUNNEL,
    mockCustomers: MOCK_CUSTOMERS,

    // helpers
    rupee: BB_APP.rupee,
    findCategory: BB_APP.find.category,

    // KPI shortcuts
    todayOrders: () => BB_APP.orders.read().filter(o => Date.now() - o.placedAt < 86400000),
    livePageViews: () => BB_APP.analytics.read().pageViews,
    liveProductViews: () => BB_APP.analytics.read().productViews,

    // common UI partials
    kpiCard: (lbl, v, d, dClass='up') => `
      <div class="kpi">
        <div class="lbl">${lbl}</div>
        <div class="v">${v}</div>
        ${d ? `<div class="d ${dClass}">${d}</div>` : ''}
      </div>`,

    statusChip: (label, color) => {
      const colors = {
        ok:      ["color-mix(in srgb, var(--ok) 14%, transparent)",     "var(--ok)"],
        warn:    ["color-mix(in srgb, var(--gold) 18%, transparent)",   "var(--gold-ink)"],
        danger:  ["color-mix(in srgb, var(--danger) 14%, transparent)", "var(--danger)"],
        accent:  ["color-mix(in srgb, var(--accent) 14%, transparent)", "var(--accent)"],
        leaf:    ["color-mix(in srgb, var(--leaf) 14%, transparent)",   "var(--leaf)"],
        muted:   ["var(--bg-sub)", "var(--ink-2)"],
      };
      const [bg, fg] = colors[color] || colors.muted;
      return `<span style="display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:99px;background:${bg};color:${fg};font-size:11px;font-weight:600;">● ${label}</span>`;
    },

    sparkline: (data, color = "var(--accent)", w = 60, h = 16) => {
      const max = Math.max(...data);
      const pts = data.map((v, i) => `${(i/(data.length-1))*100},${100-(v/max)*90}`).join(" ");
      return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width:${w}px;height:${h}px;display:inline-block;vertical-align:middle">
        <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" vector-effect="non-scaling-stroke"/>
      </svg>`;
    },
  };

  // === Drawer helpers ===
  window.openDrawer = function(html) {
    document.getElementById("drawer-bg").classList.add("open");
    document.getElementById("drawer").innerHTML = html;
  };
  window.closeDrawer = function() {
    document.getElementById("drawer-bg").classList.remove("open");
  };

  // Tab registry
  window.AdminPages = {};
})();
