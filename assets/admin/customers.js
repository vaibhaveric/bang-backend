/* Admin / Customers — list + detail modal */

(function() {
  let filter = "all";

  AdminPages.customers = function(root) {
    const orders = BB_APP.orders.read();
    // build live customer map from orders
    const map = new Map();
    orders.forEach(o => {
      if (!o.phone) return;
      if (!map.has(o.phone)) map.set(o.phone, { name: o.name, phone: o.phone, email: o.email, orders: [], ltv: 0 });
      const cust = map.get(o.phone);
      cust.orders.push(o);
      cust.ltv += o.total || 0;
    });
    const live = [...map.values()];
    const mock = AD.mockCustomers;

    let list = mock;
    if (filter === "vip") list = mock.filter(c => c.segment === "VIP");
    else if (filter === "loyal") list = mock.filter(c => c.segment === "Loyal");
    else if (filter === "new") list = mock.filter(c => c.segment === "New");
    else if (filter === "atrisk") list = mock.filter(c => c.segment === "At-risk");

    root.innerHTML = `
      <div class="kpi-row">
        ${AD.kpiCard("Total customers", (2436 + live.length).toLocaleString('en-IN'), `↑ ${live.length || 14} this week`)}
        ${AD.kpiCard("VIP segment", "68", "12+ orders · 2.7%")}
        ${AD.kpiCard("Avg LTV", "₹3,840", "↑ 8.4%")}
        ${AD.kpiCard("Repeat rate", "72%", "industry avg 51%")}
      </div>

      ${live.length > 0 ? `
        <div class="table-card">
          <div class="head">
            <div>
              <div class="lbl">From this session</div>
              <h3>Live customer activity</h3>
            </div>
            <span style="font-size: 11px; color: var(--ink-3);">Captured from orders placed on this device</span>
          </div>
          <div class="scroll-x"><table class="table">
            <thead><tr><th>Customer</th><th>Phone</th><th>Orders</th><th>Spent</th><th>Last order</th><th></th></tr></thead>
            <tbody>
              ${live.map(c => `
                <tr onclick="AdminPages.customers._open('${c.phone}')" style="cursor: pointer;">
                  <td><strong>${c.name || "—"}</strong></td>
                  <td style="font-family: ui-monospace, monospace; font-size: 12px;">+91 ${c.phone}</td>
                  <td><strong>${c.orders.length}</strong></td>
                  <td><strong>${AD.rupee(c.ltv)}</strong></td>
                  <td style="color: var(--ink-3); font-size: 12px;">${new Date(c.orders[c.orders.length-1].placedAt).toLocaleString('en-IN', {dateStyle: 'short', timeStyle: 'short'})}</td>
                  <td style="text-align: right;"><a style="color: var(--accent); font-size: 12px; font-weight: 600;">Open →</a></td>
                </tr>
              `).join("")}
            </tbody>
          </table></div>
        </div>
      ` : ""}

      <div class="table-card">
        <div class="head">
          <div>
            <div class="lbl">Customer book · top by LTV</div>
            <h3>2,442 repeat buyers</h3>
          </div>
          <div class="tools">
            <div class="pills-row">
              <span class="filter-chip ${filter==='all'?'sel':''}" data-cf="all">All</span>
              <span class="filter-chip ${filter==='vip'?'sel':''}" data-cf="vip">VIP</span>
              <span class="filter-chip ${filter==='loyal'?'sel':''}" data-cf="loyal">Loyal</span>
              <span class="filter-chip ${filter==='new'?'sel':''}" data-cf="new">New</span>
              <span class="filter-chip ${filter==='atrisk'?'sel':''}" data-cf="atrisk">At-risk</span>
            </div>
            <button class="btn btn-ghost btn-sm">Export</button>
          </div>
        </div>
        <div class="scroll-x"><table class="table">
          <thead><tr><th>Customer</th><th>Phone · Email</th><th>Orders</th><th>LTV</th><th>Last order</th><th>Joined</th><th>Segment</th><th></th></tr></thead>
          <tbody>
            ${list.map(c => `
              <tr onclick="AdminPages.customers._openMock('${c.id}')" style="cursor: pointer;">
                <td>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="icon-sq accent" style="width: 36px; height: 36px;">${c.initials}</div>
                    <strong>${c.name}</strong>
                  </div>
                </td>
                <td style="font-size: 12px;">
                  <div style="font-family: ui-monospace, monospace;">${c.phone}</div>
                  <div style="color: var(--ink-3); margin-top: 2px;">${c.email}</div>
                </td>
                <td><strong>${c.orderCount}</strong></td>
                <td><strong>${AD.rupee(c.ltv)}</strong></td>
                <td style="color: var(--ink-3);">${c.last}</td>
                <td style="color: var(--ink-3); font-size: 12px;">${c.joined}</td>
                <td><span class="chip ${c.segment === 'VIP' ? 'chip-gold' : c.segment === 'Loyal' ? 'chip-leaf' : c.segment === 'At-risk' ? 'chip-berry' : ''}">${c.segment}</span></td>
                <td style="text-align: right;"><a style="color: var(--accent); font-size: 12px; font-weight: 600;">Open →</a></td>
              </tr>
            `).join("")}
          </tbody>
        </table></div>
      </div>
    `;

    document.querySelectorAll(".filter-chip[data-cf]").forEach(el => {
      el.addEventListener("click", () => {
        filter = el.dataset.cf;
        renderTab("customers");
      });
    });
  };

  AdminPages.customers._open = function(phone) {
    const orders = BB_APP.orders.read().filter(o => o.phone === phone);
    if (orders.length === 0) return;
    const c = {
      name: orders[orders.length-1].name,
      phone, email: orders[orders.length-1].email,
      orders,
      ltv: orders.reduce((s,o)=>s+(o.total||0),0),
    };
    showCustomerModal(c, "Live customer");
  };

  AdminPages.customers._openMock = function(id) {
    const c = AD.mockCustomers.find(x => x.id === id);
    if (!c) return;
    // generate sample orders for this mock customer
    const products = AD.products();
    const sampleOrders = Array.from({length: Math.min(c.orderCount, 5)}, (_, i) => {
      const p = products[i % products.length];
      const qty = (i % 2) + 1;
      return {
        id: "BS-2025-" + String(4500 + i).padStart(5, "0"),
        placedAt: Date.now() - (i+1) * 86400000 * (3 + i*2),
        items: [{ id: p.id, name: p.en, img: p.img, qty, price: p.price }],
        total: p.price * qty + 89,
        mode: i % 3 === 0 ? "pickup" : "delivery",
        status: "Delivered",
        address: "Bhind, MP 477001",
        phone: c.phone.replace(/\D/g,'').slice(-10),
      };
    });
    showCustomerModal({
      name: c.name, phone: c.phone, email: c.email,
      orders: sampleOrders, ltv: c.ltv,
      segment: c.segment, joined: c.joined, initials: c.initials,
    }, "Customer profile");
  };

  function showCustomerModal(c, label) {
    const points = Math.floor((c.ltv || 0) * 0.02);
    const aov = c.orders.length ? Math.round(c.ltv / c.orders.length) : 0;
    const fav = c.orders.length ? c.orders.flatMap(o => o.items).reduce((m, i) => { m[i.id] = (m[i.id] || 0) + i.qty; return m; }, {}) : {};
    const favList = Object.entries(fav).sort((a,b) => b[1] - a[1]).slice(0, 3);

    openModal(`
      <div class="modal-head">
        <div>
          <div class="lbl" style="font-size: 11px; color: var(--ink-3); text-transform: uppercase; letter-spacing: .12em;">${label}</div>
          <div style="display: flex; gap: 12px; align-items: center; margin-top: 4px;">
            <div class="icon-sq accent" style="width: 44px; height: 44px;">${c.initials || (c.name || '?').split(" ").map(p => p[0]).join("").slice(0,2)}</div>
            <div>
              <h2>${c.name || "Customer"}</h2>
              <div style="font-size: 12px; color: var(--ink-3); margin-top: 4px;">${c.phone} ${c.email ? `· ${c.email}` : ''}</div>
            </div>
          </div>
        </div>
        <span class="close" onclick="closeModal()">×</span>
      </div>
      <div class="modal-body">
        <div style="display: flex; gap: 8px; margin-bottom: 22px; flex-wrap: wrap;">
          <button class="btn btn-sm" onclick="window.open('https://wa.me/91${(c.phone||'').replace(/\\D/g,'')}','_blank')">💬 WhatsApp</button>
          <button class="btn btn-ghost btn-sm" onclick="window.open('tel:${c.phone}','_blank')">📞 Call</button>
          <button class="btn btn-ghost btn-sm">✉ Email</button>
          ${c.segment ? AD.statusChip(c.segment, c.segment === 'VIP' ? 'warn' : c.segment === 'Loyal' ? 'leaf' : c.segment === 'At-risk' ? 'danger' : 'accent') : ''}
          <span style="margin-left: auto; font-size: 12px; color: var(--ink-3);">Joined ${c.joined || 'recently'}</span>
        </div>

        <!-- Stats row -->
        <div class="kpi-row" style="grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px;">
          <div class="kpi"><div class="lbl">Orders</div><div class="v">${c.orders.length}</div></div>
          <div class="kpi"><div class="lbl">LTV</div><div class="v">${AD.rupee(c.ltv)}</div></div>
          <div class="kpi"><div class="lbl">AOV</div><div class="v">${AD.rupee(aov)}</div></div>
          <div class="kpi"><div class="lbl">Mithai Points</div><div class="v" style="color: var(--gold);">${points} ★</div></div>
        </div>

        <div class="detail-grid">
          <div class="detail-panel">
            <h3>Order history <span style="font-size: 12px; color: var(--ink-3); font-family: var(--sans); font-weight: 500;">${c.orders.length} orders</span></h3>
            ${c.orders.slice().reverse().slice(0, 5).map(o => `
              <div style="display: grid; grid-template-columns: 50px 1fr auto; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--rule); align-items: center;">
                <img src="${o.items[0].img}" style="width: 50px; height: 50px; object-fit: cover; border-radius: var(--radius);"/>
                <div>
                  <div style="font-family: ui-monospace, monospace; font-size: 12px; color: var(--ink-3);">${o.id}</div>
                  <div style="font-weight: 600; font-size: 13px; margin-top: 2px;">${o.items[0].name}${o.items.length > 1 ? ` + ${o.items.length - 1} more` : ''}</div>
                  <div style="font-size: 11px; color: var(--ink-3); margin-top: 2px;">${new Date(o.placedAt).toLocaleDateString('en-IN', {dateStyle: 'medium'})} · ${o.mode}</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-family: var(--display); font-size: 17px;">${AD.rupee(o.total)}</div>
                  ${AD.statusChip(o.status || "Delivered", "ok")}
                </div>
              </div>
            `).join("")}
          </div>

          <div>
            <div class="detail-panel" style="margin-bottom: 16px;">
              <h3>Favourite mithai</h3>
              ${favList.length === 0 ? `<div style="color: var(--ink-3); font-size: 13px;">Not enough order history.</div>` :
                favList.map(([pid, qty]) => {
                  const prod = BB.products.find(p => p.id === pid);
                  return prod ? `<div style="display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--rule); align-items: center;">
                    <img src="${prod.img}" style="width: 32px; height: 32px; border-radius: var(--radius); object-fit: cover;"/>
                    <div style="flex: 1;"><strong style="font-size: 13px;">${prod.en}</strong><div style="font-size: 11px; color: var(--ink-3);">${prod.hi}</div></div>
                    <div style="font-size: 12px;"><strong>${qty}×</strong></div>
                  </div>` : '';
                }).join("")
              }
            </div>

            <div class="detail-panel" style="margin-bottom: 16px;">
              <h3>Mithai Points</h3>
              <div style="text-align: center; padding: 18px; background: linear-gradient(135deg, var(--accent), #531c1c); color: var(--gold); border-radius: var(--radius); margin-bottom: 14px;">
                <div style="font-family: var(--display); font-size: 40px; color: #fff; line-height: 1;">${points}</div>
                <div style="font-size: 11px; opacity: .85; margin-top: 4px;">= ${AD.rupee(Math.floor(points / 200 * 100))} off next order</div>
              </div>
              <button class="btn btn-ghost btn-sm" style="width: 100%;">Adjust points</button>
            </div>

            <div class="detail-panel">
              <h3>Admin notes</h3>
              <textarea class="input" rows="3" placeholder="Internal notes about this customer…" style="font-size: 13px;"></textarea>
              <button class="btn btn-ghost btn-sm" style="margin-top: 8px;">Save note</button>
            </div>
          </div>
        </div>
      </div>
    `);
  }
})();
