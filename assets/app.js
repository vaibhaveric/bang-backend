/* Bangali Sweets — Shared site logic
 * - Injects header + footer
 * - Cart in localStorage
 * - Auth (mock) in localStorage
 * - Toast notifications
 * - Page-view tracking (stored locally; admin reads)
 */

(function() {
  "use strict";

  const STORE = window.BB;
  const KEY_CART = "bb_cart_v1";
  const KEY_AUTH = "bb_auth_v1";
  const KEY_ANALYTICS = "bb_analytics_v1";
  const KEY_ORDERS = "bb_orders_v1";

  // ============================== STATE ==============================
  function readCart()    { try { return JSON.parse(localStorage.getItem(KEY_CART)) || []; } catch(e) { return []; } }
  function writeCart(c)  { localStorage.setItem(KEY_CART, JSON.stringify(c)); window.dispatchEvent(new CustomEvent("bb:cart")); }
  function readAuth()    { try { return JSON.parse(localStorage.getItem(KEY_AUTH)) || null; } catch(e) { return null; } }
  function writeAuth(a)  { localStorage.setItem(KEY_AUTH, JSON.stringify(a)); window.dispatchEvent(new CustomEvent("bb:auth")); }
  function readOrders()  { try { return JSON.parse(localStorage.getItem(KEY_ORDERS)) || []; } catch(e) { return []; } }
  function writeOrders(o){ localStorage.setItem(KEY_ORDERS, JSON.stringify(o)); }
  function readAnalytics(){ try { return JSON.parse(localStorage.getItem(KEY_ANALYTICS)) || {pageViews:{}, productViews:{}, events:[]}; } catch(e) { return {pageViews:{}, productViews:{}, events:[]}; } }
  function writeAnalytics(a){ localStorage.setItem(KEY_ANALYTICS, JSON.stringify(a)); }

  // ============================== CART ==============================
  function cartCount() {
    return readCart().reduce((s, i) => s + i.qty, 0);
  }
  function cartTotal() {
    const cart = readCart();
    return cart.reduce((s, i) => {
      const p = findProduct(i.id);
      return s + (p ? p.price * i.qty : 0);
    }, 0);
  }
  function addToCart(id, qty = 1) {
    const cart = readCart();
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += qty;
    else cart.push({ id, qty });
    writeCart(cart);
    const p = findProduct(id);
    toast(`Added <b>${p ? p.en : "item"}</b> to bag`);
    trackEvent("add_to_cart", { id });
  }
  function updateCartQty(id, qty) {
    const cart = readCart();
    const it = cart.find(i => i.id === id);
    if (!it) return;
    if (qty <= 0) {
      writeCart(cart.filter(i => i.id !== id));
    } else {
      it.qty = qty;
      writeCart(cart);
    }
  }
  function removeFromCart(id) {
    writeCart(readCart().filter(i => i.id !== id));
  }
  function clearCart() { writeCart([]); }

  // ============================== LOOKUPS ==============================
  function findProduct(id) { return STORE.products.find(p => p.id === id); }
  function findCategory(slug) { return STORE.categories.find(c => c.slug === slug); }
  function productsByCategory(slug) { return STORE.products.filter(p => p.cat === slug); }

  // ============================== FORMATTING ==============================
  function rupee(n) { return "₹" + Number(n).toLocaleString("en-IN"); }

  // ============================== TOAST ==============================
  function toast(html, type = "info") {
    let stack = document.getElementById("bb-toasts");
    if (!stack) {
      stack = document.createElement("div");
      stack.id = "bb-toasts";
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<span class="x">✦</span><span>${html}</span>`;
    stack.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity .3s"; }, 2200);
    setTimeout(() => el.remove(), 2600);
  }

  // ============================== ANALYTICS ==============================
  function trackPageView(path) {
    const a = readAnalytics();
    a.pageViews[path] = (a.pageViews[path] || 0) + 1;
    a.events.push({ t: Date.now(), type: "pageview", path });
    if (a.events.length > 500) a.events = a.events.slice(-500);
    writeAnalytics(a);
  }
  function trackProductView(id) {
    const a = readAnalytics();
    a.productViews[id] = (a.productViews[id] || 0) + 1;
    a.events.push({ t: Date.now(), type: "productview", id });
    if (a.events.length > 500) a.events = a.events.slice(-500);
    writeAnalytics(a);
  }
  function trackEvent(type, data) {
    const a = readAnalytics();
    a.events.push({ t: Date.now(), type, ...data });
    if (a.events.length > 500) a.events = a.events.slice(-500);
    writeAnalytics(a);
  }

  // ============================== ICONS ==============================
  const ICONS = {
    search: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    bag:    '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
    user:   '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>',
    heart:  '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z"/></svg>',
    pin:    '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    phone:  '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 5a2 2 0 0 1 2-2h2l2 5-2 1a10 10 0 0 0 5 5l1-2 5 2v2a2 2 0 0 1-2 2A14 14 0 0 1 5 5Z"/></svg>',
    arrow:  '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    plus:   '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 5v14M5 12h14"/></svg>',
  };

  // ============================== HEADER ==============================
  function renderHeader(activeNav) {
    const auth = readAuth();
    const navItems = [
      { slug: "sweets",    label: "Sweets" },
      { slug: "namkeen",   label: "Namkeen" },
      { slug: "dryfruits", label: "Dry Fruits" },
      { slug: "dairy",     label: "Dairy" },
      { slug: "bakery",    label: "Bakery" },
      { slug: "hampers",   label: "Hampers" },
      { slug: "birthday",  label: "Birthday" },
    ];
    return `
      <div class="bar-promo">
        <span>🎁 Free delivery on orders above ₹999 in Bhind · Same-day before 4 PM</span>
        <span class="pr">
          <a href="track.html">Track Order</a>
          <a href="about.html#corporate">Bulk &amp; Corporate</a>
          <a href="tel:${STORE.shop.phone}" style="color: var(--gold);">📞 ${STORE.shop.phoneDisplay}</a>
        </span>
      </div>
      <div class="bar-main">
        <a class="logo" href="index.html" aria-label="Bangali Sweets — Home">
          <span class="seal">B</span>
          <span>
            <span class="nm">Bangali Sweets</span>
            <span class="nm-hi" style="display:block">बंगाली स्वीट्स</span>
          </span>
        </a>
        <form class="search" role="search" onsubmit="event.preventDefault();window.BB_APP.search(this.querySelector('input').value)">
          <span class="ico">${ICONS.search}</span>
          <input type="search" placeholder="Search Kaju Katli, hampers, dry fruits…" aria-label="Search products"/>
        </form>
        <nav class="utils" aria-label="User">
          <a href="${STORE.shop.mapsUrl}" target="_blank" rel="noopener" title="Outlet location">
            ${ICONS.pin}<span class="lbl">Bhind, MP</span>
          </a>
          <a href="account.html" title="My Account">
            ${ICONS.user}<span class="lbl">${auth ? (auth.name || "Account") : "Sign in"}</span>
          </a>
          <a href="cart.html" class="cart-pill" aria-label="Cart">
            ${ICONS.bag}<span data-cart-count>${cartCount()}</span>
          </a>
        </nav>
      </div>
      <nav class="bar-nav" aria-label="Categories">
        ${navItems.map(n => `<a href="category.html?slug=${n.slug}" class="${activeNav === n.slug ? "active" : ""}">${n.label}</a>`).join("")}
        <span class="right">
          <a href="about.html">About</a>
          <a href="outlet.html">Our Outlet</a>
          <a href="track.html">Track</a>
          <a href="account.html">My Account</a>
        </span>
      </nav>
    `;
  }

  // ============================== FOOTER ==============================
  function renderFooter() {
    return `
      <div class="grid">
        <div>
          <div class="nm">Bangali Sweets</div>
          <div class="nm-hi">बंगाली स्वीट्स · since 1987</div>
          <p class="blurb">Pure-veg mithai, namkeen and dry fruits — hand-made in Bhind, delivered fresh across India.</p>
          <div style="font-size:12px; opacity:.7; line-height:1.7;">
            📍 ${STORE.shop.address}<br/>
            📞 <a href="tel:${STORE.shop.phone}" style="display:inline">${STORE.shop.phoneDisplay}</a><br/>
            ✉️ <a href="mailto:${STORE.shop.email}" style="display:inline">${STORE.shop.email}</a><br/>
            🕘 ${STORE.shop.hours}
          </div>
          <div class="social">
            <span title="Instagram">IG</span>
            <span title="Facebook">FB</span>
            <span title="YouTube">YT</span>
            <span title="WhatsApp">WA</span>
          </div>
        </div>
        <div>
          <h4>Shop</h4>
          ${STORE.categories.map(c => `<a href="category.html?slug=${c.slug}">${c.en}</a>`).join("")}
        </div>
        <div>
          <h4>Company</h4>
          <a href="about.html">About Us</a>
          <a href="outlet.html">Our Outlet</a>
          <a href="about.html#story">Our Story</a>
          <a href="about.html#corporate">Bulk &amp; Corporate</a>
        </div>
        <div>
          <h4>Help</h4>
          <a href="track.html">Track Order</a>
          <a href="about.html#shipping">Shipping</a>
          <a href="about.html#returns">Returns</a>
          <a href="about.html#faq">FAQs</a>
          <a href="account.html">Contact Us</a>
        </div>
        <div>
          <h4>Account</h4>
          <a href="account.html">My Profile</a>
          <a href="account.html#orders">My Orders</a>
          <a href="account.html#addresses">Addresses</a>
          <a href="account.html#points">Mithai Points</a>
          <a href="admin.html" style="color:var(--gold)">Admin Dashboard ↗</a>
        </div>
      </div>
      <div class="legal">
        <span>© 2026 Bangali Sweets &amp; Dryfruits, Bhind · GSTIN ${STORE.shop.gstin} · FSSAI ${STORE.shop.fssai}</span>
        <span><a href="#" style="display:inline">Privacy</a> · <a href="#" style="display:inline">Terms</a> · <a href="#" style="display:inline">Refunds</a></span>
      </div>
    `;
  }

  // ============================== AUTH (mock OTP) ==============================
  function login(phone, name) {
    writeAuth({
      phone, name: name || "",
      points: 0,
      joined: Date.now(),
      addresses: [],
    });
  }
  function logout() {
    localStorage.removeItem(KEY_AUTH);
    window.dispatchEvent(new CustomEvent("bb:auth"));
  }

  // ============================== ORDERS ==============================
  function placeOrder(payload) {
    const orders = readOrders();
    const id = "BS-2026-" + String(orders.length + 4810 + Math.floor(Math.random() * 10)).padStart(5, "0");
    const cart = readCart();
    const items = cart.map(c => {
      const p = findProduct(c.id);
      return { id: c.id, qty: c.qty, name: p.en, price: p.price, img: p.img };
    });
    const order = {
      id,
      placedAt: Date.now(),
      status: "Packing",
      items,
      ...payload,
    };
    orders.push(order);
    writeOrders(orders);
    clearCart();
    trackEvent("order_placed", { id });
    return order;
  }

  // ============================== UPDATE CART COUNT (live) ==============================
  function refreshCartCount() {
    const els = document.querySelectorAll("[data-cart-count]");
    const n = cartCount();
    els.forEach(el => el.textContent = n);
  }
  window.addEventListener("bb:cart", refreshCartCount);

  // ============================== INIT ==============================
  function mount(opts = {}) {
    const path = location.pathname.split("/").pop() || "index.html";
    trackPageView(path);

    const header = document.getElementById("site-header");
    if (header) {
      header.className = "site-header";
      header.innerHTML = renderHeader(opts.nav);
    }
    const footer = document.getElementById("site-footer");
    if (footer) {
      footer.className = "site-footer";
      footer.innerHTML = renderFooter();
    }
  }

  // ============================== SEARCH ==============================
  function search(q) {
    if (!q || !q.trim()) return;
    location.href = "search.html?q=" + encodeURIComponent(q.trim());
  }

  // ============================== PUBLIC ==============================
  window.BB_APP = {
    mount, search, toast, rupee,
    cart: { read: readCart, count: cartCount, total: cartTotal, add: addToCart, update: updateCartQty, remove: removeFromCart, clear: clearCart },
    auth: { read: readAuth, login, logout },
    orders: { read: readOrders, place: placeOrder },
    analytics: { read: readAnalytics, track: trackEvent, trackPageView, trackProductView },
    find: { product: findProduct, category: findCategory, byCategory: productsByCategory },
    icons: ICONS,
  };
})();
