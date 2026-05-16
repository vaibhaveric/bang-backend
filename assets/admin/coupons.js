/* Admin / Coupons & Promos */

(function() {
  AdminPages.coupons = function(root) {
    const coupons = AD.coupons();
    const active = coupons.filter(c => c.status === "active");
    const scheduled = coupons.filter(c => c.status === "scheduled");
    const expired = coupons.filter(c => c.status === "expired");
    const totalUses = coupons.reduce((s, c) => s + c.uses, 0);
    const totalDiscount = coupons.reduce((s, c) => s + (c.type === "percent" ? c.uses * 150 : c.uses * c.value), 0);

    root.innerHTML = `
      <div class="kpi-row">
        ${AD.kpiCard("Active coupons", active.length, `${scheduled.length} scheduled`)}
        ${AD.kpiCard("Redemptions · 30d", totalUses.toLocaleString("en-IN"), "↑ 22%")}
        ${AD.kpiCard("Discount given", AD.rupee(totalDiscount), "~₹150 avg")}
        ${AD.kpiCard("Top coupon", "DIWALI20", "142 uses")}
      </div>

      <div class="table-card">
        <div class="head">
          <div>
            <div class="lbl">Coupons &amp; promotions</div>
            <h3>${coupons.length} total</h3>
          </div>
          <div class="tools">
            <div class="pills-row">
              <span class="filter-chip sel">All · ${coupons.length}</span>
              <span class="filter-chip">Active · ${active.length}</span>
              <span class="filter-chip">Scheduled · ${scheduled.length}</span>
              <span class="filter-chip">Expired · ${expired.length}</span>
            </div>
            <button class="btn btn-sm" onclick="AdminPages.coupons._openDrawer()">+ New coupon</button>
          </div>
        </div>
        <div class="scroll-x"><table class="table">
          <thead><tr>
            <th>Code</th>
            <th>Type · Value</th>
            <th>Applies to</th>
            <th>Min order</th>
            <th>Uses</th>
            <th>Valid till</th>
            <th>Status</th>
            <th></th>
          </tr></thead>
          <tbody>
            ${coupons.map(c => {
              const appliesLabel = c.applies === "all" ? "All products" : c.applies.startsWith("category:") ? `Category: ${c.applies.split(":")[1]}` : c.applies;
              const value = c.type === "percent" ? `${c.value}% off${c.maxDisc ? ` (max ${AD.rupee(c.maxDisc)})` : ''}`
                          : c.type === "flat"    ? `Flat ${AD.rupee(c.value)}`
                          : `Free shipping (₹${c.value})`;
              const usesLabel = c.maxUses ? `${c.uses} / ${c.maxUses}` : `${c.uses}`;
              const usagePct = c.maxUses ? (c.uses / c.maxUses) * 100 : Math.min(100, c.uses / 200 * 100);
              return `<tr>
                <td>
                  <strong style="font-family: ui-monospace, monospace; font-size: 13px; color: var(--accent);">${c.code}</strong>
                  <div style="font-size: 11px; color: var(--ink-3); margin-top: 2px; max-width: 220px;">${c.desc}</div>
                </td>
                <td><strong>${value}</strong></td>
                <td><span class="chip">${appliesLabel}</span></td>
                <td>${c.minOrder ? AD.rupee(c.minOrder) : '—'}</td>
                <td>
                  <strong>${usesLabel}</strong>
                  ${c.maxUses ? `<div class="bar" style="margin-top:4px; width:80px;"><i style="width:${usagePct}%"></i></div>` : ''}
                </td>
                <td style="font-size: 12px;">${c.validTill}</td>
                <td>${AD.statusChip(c.status, c.status === "active" ? "ok" : c.status === "scheduled" ? "accent" : "muted")}</td>
                <td style="text-align: right;">
                  <button onclick="AdminPages.coupons._openDrawer('${c.code}')" style="color: var(--accent); font-size: 12px; font-weight: 600; padding: 4px 6px;">Edit</button>
                  <button onclick="AdminPages.coupons._copy('${c.code}')" style="color: var(--ink-3); font-size: 12px; padding: 4px 6px;">Copy</button>
                </td>
              </tr>`;
            }).join("")}
          </tbody>
        </table></div>
      </div>

      <div class="charts-row" style="grid-template-columns: 1fr 1fr;">
        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Top redeeming coupons · 30d</div>
              <h3>Revenue impact</h3>
            </div>
          </div>
          ${coupons.slice().sort((a,b) => b.uses - a.uses).slice(0,5).map((c, i, arr) => {
            const max = Math.max(...arr.map(x => x.uses));
            return `
              <div style="padding: 10px 0; border-bottom: 1px solid var(--rule);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px;">
                  <strong style="font-family: ui-monospace, monospace;">${c.code}</strong>
                  <span><strong>${c.uses}</strong> uses</span>
                </div>
                <div class="bar"><i style="width: ${(c.uses/max)*100}%"></i></div>
              </div>
            `;
          }).join("")}
        </div>

        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Quick promo ideas</div>
              <h3>One-click templates</h3>
            </div>
          </div>
          ${[
            { ic: "🪔", t: "Diwali festive · 20% off", sub: "Min ₹999 · expires 15 Nov" },
            { ic: "🎁", t: "First-order · 15% off",   sub: "New customers · no min" },
            { ic: "💼", t: "Bulk B2B · 10% off ₹5000+", sub: "Corporate / wedding orders" },
            { ic: "🚚", t: "Free shipping anywhere",   sub: "₹89 off shipping · 1 week" },
            { ic: "✨", t: "VIP customer · ₹250 off", sub: "Segment-based · 12+ orders" },
          ].map(p => `
            <div style="display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--rule); cursor: pointer; align-items: center;">
              <div class="icon-sq accent">${p.ic}</div>
              <div style="flex: 1;">
                <div style="font-weight: 600; font-size: 13px;">${p.t}</div>
                <div style="font-size: 11px; color: var(--ink-3); margin-top: 2px;">${p.sub}</div>
              </div>
              <button class="btn btn-ghost btn-sm" onclick="AdminPages.coupons._openDrawer()">Use →</button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  };

  AdminPages.coupons._openDrawer = function(code) {
    const coupons = AD.coupons();
    const c = code ? coupons.find(x => x.code === code) : { code: "", type: "percent", value: 10, minOrder: 0, applies: "all", validTill: "", uses: 0, maxUses: 0, status: "active", desc: "" };
    const isNew = !code;

    openDrawer(`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px;">
        <div>
          <div class="lbl" style="font-size: 11px; color: var(--ink-3); text-transform: uppercase; letter-spacing: .12em;">${isNew ? "New coupon" : "Edit coupon"}</div>
          <h2>${isNew ? "Create promo code" : c.code}</h2>
        </div>
        <button onclick="closeDrawer()" style="font-size: 24px; color: var(--ink-3);">×</button>
      </div>

      <div class="field"><label class="label">Coupon code</label>
        <input class="input" id="c-code" value="${c.code}" placeholder="DIWALI20" style="font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.04em;"/>
      </div>
      <div class="field"><label class="label">Internal description</label>
        <input class="input" id="c-desc" value="${c.desc || ''}" placeholder="What is this coupon for?"/>
      </div>

      <h3 style="font-family: var(--display); font-size: 16px; margin: 22px 0 12px; padding-top: 14px; border-top: 1px solid var(--rule); font-weight: 500;">Discount</h3>
      <div class="field"><label class="label">Type</label>
        <select class="input" id="c-type">
          <option value="percent" ${c.type==='percent'?'selected':''}>Percentage off</option>
          <option value="flat"    ${c.type==='flat'?'selected':''}>Flat amount off</option>
          <option value="shipping" ${c.type==='shipping'?'selected':''}>Free shipping</option>
        </select>
      </div>
      <div class="field-row cols-2 field">
        <div><label class="label">Value</label><input class="input" id="c-value" type="number" value="${c.value}"/></div>
        <div><label class="label">Max discount cap (₹)</label><input class="input" id="c-cap" type="number" value="${c.maxDisc || ''}" placeholder="Optional"/></div>
      </div>

      <h3 style="font-family: var(--display); font-size: 16px; margin: 22px 0 12px; padding-top: 14px; border-top: 1px solid var(--rule); font-weight: 500;">Conditions</h3>
      <div class="field"><label class="label">Minimum order (₹)</label><input class="input" id="c-min" type="number" value="${c.minOrder || 0}"/></div>
      <div class="field"><label class="label">Applies to</label>
        <select class="input" id="c-applies">
          <option value="all" ${c.applies==='all'?'selected':''}>All products</option>
          ${BB.categories.map(cat => `<option value="category:${cat.slug}" ${c.applies===`category:${cat.slug}`?'selected':''}>Category: ${cat.en}</option>`).join("")}
        </select>
      </div>
      <div class="field-row cols-2 field">
        <div><label class="label">Valid till</label><input class="input" id="c-valid" type="date" value="${c.validTill || ''}"/></div>
        <div><label class="label">Max total uses</label><input class="input" id="c-max" type="number" value="${c.maxUses || ''}" placeholder="Unlimited"/></div>
      </div>

      <h3 style="font-family: var(--display); font-size: 16px; margin: 22px 0 12px; padding-top: 14px; border-top: 1px solid var(--rule); font-weight: 500;">Status</h3>
      <div class="field"><label class="label">Status</label>
        <select class="input" id="c-status">
          <option value="active" ${c.status==='active'?'selected':''}>Active</option>
          <option value="scheduled" ${c.status==='scheduled'?'selected':''}>Scheduled</option>
          <option value="paused" ${c.status==='paused'?'selected':''}>Paused</option>
          <option value="expired" ${c.status==='expired'?'selected':''}>Expired</option>
        </select>
      </div>

      <div style="display: flex; gap: 10px; margin-top: 24px;">
        <button class="btn btn-block" onclick="AdminPages.coupons._save('${code || ''}')">${isNew ? 'Create coupon' : 'Save changes'}</button>
        ${!isNew ? `<button class="btn btn-ghost" onclick="AdminPages.coupons._delete('${code}')" style="border-color: var(--danger); color: var(--danger)">Delete</button>` : ''}
      </div>
    `);
  };

  AdminPages.coupons._save = function(originalCode) {
    const get = k => document.getElementById("c-"+k).value;
    const c = {
      code: get("code").toUpperCase().trim(),
      type: get("type"),
      value: Number(get("value")) || 0,
      maxDisc: Number(get("cap")) || undefined,
      minOrder: Number(get("min")) || 0,
      applies: get("applies"),
      validTill: get("valid"),
      maxUses: Number(get("max")) || 0,
      uses: 0,
      status: get("status"),
      desc: get("desc"),
    };
    if (!c.code) { BB_APP.toast("Coupon code is required"); return; }
    let coupons = AD.coupons();
    if (originalCode) {
      const idx = coupons.findIndex(x => x.code === originalCode);
      if (idx > -1) { c.uses = coupons[idx].uses; coupons[idx] = c; }
    } else {
      coupons.unshift(c);
    }
    AD.saveCoupons(coupons);
    closeDrawer();
    renderTab("coupons");
    BB_APP.toast(originalCode ? "Coupon updated ✦" : "Coupon created ✦");
  };

  AdminPages.coupons._delete = function(code) {
    if (!confirm(`Delete coupon ${code}?`)) return;
    AD.saveCoupons(AD.coupons().filter(c => c.code !== code));
    closeDrawer();
    renderTab("coupons");
    BB_APP.toast("Coupon deleted");
  };

  AdminPages.coupons._copy = function(code) {
    navigator.clipboard?.writeText(code);
    BB_APP.toast(`Copied · ${code}`);
  };
})();
