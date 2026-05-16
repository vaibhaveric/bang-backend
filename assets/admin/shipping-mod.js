/* Admin / Shipping zones */

(function() {
  AdminPages.shipping = function(root) {
    const zones = AD.zones();
    const active = zones.filter(z => z.status === "active");

    root.innerHTML = `
      <div class="kpi-row">
        ${AD.kpiCard("Shipping zones", zones.length, `${active.length} active`)}
        ${AD.kpiCard("Avg shipping cost", "₹147", "↑ ₹12 vs prev qtr")}
        ${AD.kpiCard("Free shipping rate", "62%", "of all orders")}
        ${AD.kpiCard("Couriers connected", "3", "Delhivery, Bluedart, Local")}
      </div>

      <div class="charts-row" style="grid-template-columns: 1fr 1fr;">
        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Connected couriers</div>
              <h3>Pickup &amp; tracking partners</h3>
            </div>
          </div>
          ${[
            { ic: "🛵", t: "Local rider · Bhind",   sub: "Same-day delivery, in-house team",            status: "connected", coverage: "4770xx" },
            { ic: "📦", t: "Delhivery",             sub: "Pan-India shipping · cash on delivery",       status: "connected", coverage: "Pan-India" },
            { ic: "✈",  t: "Bluedart",              sub: "Premium next-day · for hampers > ₹2000",     status: "connected", coverage: "300+ cities" },
            { ic: "🚚", t: "Shiprocket",            sub: "Aggregator · cheapest rate routing",          status: "available", coverage: "—" },
            { ic: "📮", t: "India Post · Speed Post", sub: "Reach remote pin codes",                  status: "available", coverage: "—" },
          ].map(c => `
            <div style="display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--rule); align-items: center;">
              <div class="icon-sq accent">${c.ic}</div>
              <div style="flex: 1; min-width: 0;">
                <div style="font-weight: 600; font-size: 13px;">${c.t}</div>
                <div style="font-size: 11px; color: var(--ink-3); margin-top: 2px;">${c.sub}</div>
              </div>
              ${AD.statusChip(c.status === "connected" ? "● " + c.coverage : "Available", c.status === "connected" ? "ok" : "muted")}
            </div>
          `).join("")}
        </div>

        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Delivery promise</div>
              <h3>Shown on product pages</h3>
            </div>
          </div>
          <div class="field"><label class="label">Bhind same-day cutoff</label><input class="input" value="4:00 PM"/></div>
          <div class="field"><label class="label">Free shipping threshold (Bhind)</label><input class="input" value="999"/></div>
          <div class="field"><label class="label">Free shipping threshold (Pan-India)</label><input class="input" value="1499"/></div>
          <div class="field"><label class="label">Default ETA copy</label><input class="input" value="3–5 business days"/></div>
          <button class="btn btn-sm" style="margin-top: 6px;">Save settings</button>
        </div>
      </div>

      <div class="table-card">
        <div class="head">
          <div>
            <div class="lbl">Shipping zones · ${zones.length}</div>
            <h3>Rate cards by PIN code</h3>
          </div>
          <button class="btn btn-sm" onclick="AdminPages.shipping._openDrawer()">+ New zone</button>
        </div>
        <div class="scroll-x"><table class="table">
          <thead><tr>
            <th>Zone</th>
            <th>PIN pattern</th>
            <th>Mode</th>
            <th>Delivery time</th>
            <th>Base rate</th>
            <th>Free above</th>
            <th>Status</th>
            <th></th>
          </tr></thead>
          <tbody>
            ${zones.map(z => `
              <tr>
                <td><strong>${z.name}</strong></td>
                <td style="font-family: ui-monospace, monospace; font-size: 12px; max-width: 220px;">${z.pinPattern}</td>
                <td><span class="chip">${z.mode}</span></td>
                <td style="font-size: 12px;">${z.days}</td>
                <td><strong>${AD.rupee(z.baseRate)}</strong></td>
                <td>${z.freeOver ? AD.rupee(z.freeOver) : '—'}</td>
                <td>${AD.statusChip(z.status === "active" ? "Active" : "Paused", z.status === "active" ? "ok" : "muted")}</td>
                <td style="text-align: right;">
                  <button onclick="AdminPages.shipping._openDrawer('${z.id}')" style="color: var(--accent); font-size: 12px; font-weight: 600; padding: 4px 6px;">Edit</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table></div>
      </div>

      <div class="chart-card">
        <div class="chart-head">
          <div>
            <div class="lbl">PIN code checker</div>
            <h3>Test a PIN against your zones</h3>
          </div>
        </div>
        <div style="display: flex; gap: 8px; max-width: 480px;">
          <input class="input" id="pin-test" placeholder="6-digit PIN code · e.g. 477001" maxlength="6"/>
          <button class="btn" onclick="AdminPages.shipping._testPin()">Check</button>
        </div>
        <div id="pin-result" style="margin-top: 14px;"></div>
      </div>
    `;
  };

  AdminPages.shipping._testPin = function() {
    const pin = document.getElementById("pin-test").value;
    if (!/^\d{6}$/.test(pin)) { BB_APP.toast("Enter a valid 6-digit PIN"); return; }
    const zones = AD.zones();
    let match = zones[zones.length - 1];
    if (pin.startsWith("4770")) match = zones[0];
    else if (pin.startsWith("11") || pin.startsWith("24") || pin.startsWith("30")) match = zones[1];
    else if (["11","40","56","60","70"].some(p => pin.startsWith(p))) match = zones[2];
    document.getElementById("pin-result").innerHTML = `
      <div style="padding: 16px; background: var(--bg-sub); border-radius: var(--radius); max-width: 480px;">
        <div style="font-size: 13px; color: var(--ink-3);">PIN ${pin} maps to</div>
        <div style="font-family: var(--display); font-size: 22px; margin: 4px 0 8px;">${match.name}</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
          <div><strong>Delivery time:</strong> ${match.days}</div>
          <div><strong>Base rate:</strong> ${AD.rupee(match.baseRate)}</div>
          <div><strong>Free above:</strong> ${match.freeOver ? AD.rupee(match.freeOver) : 'No threshold'}</div>
          <div><strong>Mode:</strong> ${match.mode}</div>
        </div>
      </div>
    `;
  };

  AdminPages.shipping._openDrawer = function(id) {
    const zones = AD.zones();
    const z = id ? zones.find(x => x.id === id) : { name: "", pinPattern: "", mode: "ship", days: "", baseRate: 0, freeOver: 0, status: "active" };
    const isNew = !id;

    openDrawer(`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px;">
        <div>
          <div class="lbl" style="font-size: 11px; color: var(--ink-3); text-transform: uppercase; letter-spacing: .12em;">${isNew ? "Add zone" : "Edit zone"}</div>
          <h2>${isNew ? "New shipping zone" : z.name}</h2>
        </div>
        <button onclick="closeDrawer()" style="font-size: 24px; color: var(--ink-3);">×</button>
      </div>

      <div class="field"><label class="label">Zone name</label><input class="input" id="z-name" value="${z.name}" placeholder="e.g. Bhind Local"/></div>
      <div class="field"><label class="label">PIN code pattern</label>
        <input class="input" id="z-pin" value="${z.pinPattern}" placeholder="4770xx, 11xxxx, or * for all"/>
        <p style="font-size: 11px; color: var(--ink-3); margin: 6px 0 0;">Use x as wildcard · comma-separate multiple ranges · use * to catch all</p>
      </div>
      <div class="field"><label class="label">Mode</label>
        <select class="input" id="z-mode">
          <option value="delivery" ${z.mode==='delivery'?'selected':''}>Local delivery (in-house rider)</option>
          <option value="ship" ${z.mode==='ship'?'selected':''}>Ship (courier partner)</option>
          <option value="pickup" ${z.mode==='pickup'?'selected':''}>Pickup only</option>
        </select>
      </div>
      <div class="field"><label class="label">Delivery time</label><input class="input" id="z-days" value="${z.days}" placeholder="e.g. 3-5 business days"/></div>
      <div class="field-row cols-2 field">
        <div><label class="label">Base rate (₹)</label><input class="input" id="z-rate" type="number" value="${z.baseRate}"/></div>
        <div><label class="label">Free shipping above (₹)</label><input class="input" id="z-free" type="number" value="${z.freeOver || 0}"/></div>
      </div>
      <div class="field" style="display: flex; align-items: center; gap: 12px;">
        <span class="switch ${z.status === 'active' ? 'on' : ''}" id="z-active" onclick="this.classList.toggle('on')"></span>
        <div>
          <div style="font-weight: 600; font-size: 14px;">Zone active</div>
          <div style="font-size: 11px; color: var(--ink-3);">Customers in this zone can order</div>
        </div>
      </div>

      <div style="display: flex; gap: 10px; margin-top: 24px;">
        <button class="btn btn-block" onclick="AdminPages.shipping._save('${id || ''}')">${isNew ? 'Create zone' : 'Save changes'}</button>
        ${!isNew ? `<button class="btn btn-ghost" onclick="AdminPages.shipping._delete('${id}')" style="border-color: var(--danger); color: var(--danger)">Delete</button>` : ''}
      </div>
    `);
  };

  AdminPages.shipping._save = function(id) {
    const get = k => document.getElementById("z-"+k).value;
    const active = document.getElementById("z-active").classList.contains("on");
    const obj = {
      id: id || ("z" + Date.now()),
      name: get("name"),
      pinPattern: get("pin"),
      mode: get("mode"),
      days: get("days"),
      baseRate: Number(get("rate")) || 0,
      freeOver: Number(get("free")) || 0,
      status: active ? "active" : "paused",
    };
    let zones = AD.zones();
    if (id) {
      const idx = zones.findIndex(z => z.id === id);
      if (idx > -1) zones[idx] = { ...zones[idx], ...obj };
    } else {
      zones.unshift(obj);
    }
    AD.saveZones(zones);
    closeDrawer();
    renderTab("shipping");
    BB_APP.toast(id ? "Zone updated" : "Zone created");
  };

  AdminPages.shipping._delete = function(id) {
    if (!confirm("Delete this shipping zone?")) return;
    AD.saveZones(AD.zones().filter(z => z.id !== id));
    closeDrawer();
    renderTab("shipping");
    BB_APP.toast("Zone deleted");
  };
})();
