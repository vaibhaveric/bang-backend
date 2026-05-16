/* Admin / Outlets */

(function() {
  AdminPages.outlets = function(root) {
    const outlets = AD.outlets();
    const totalRev = outlets.reduce((s, o) => s + o.revToday, 0);
    const totalOrders = outlets.reduce((s, o) => s + o.ordersToday, 0);

    root.innerHTML = `
      <div class="kpi-row">
        ${AD.kpiCard("Active outlets", outlets.filter(o => o.status === "active").length, "expandable")}
        ${AD.kpiCard("Today's orders", totalOrders, "across outlets")}
        ${AD.kpiCard("Today's revenue", AD.rupee(totalRev), "↑ 12.4%")}
        ${AD.kpiCard("Avg per outlet", AD.rupee(Math.round(totalRev / outlets.length)), "↑ vs last week")}
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 14px; margin-bottom: 16px;">
        ${outlets.map(o => `
          <div class="chart-card" style="position: relative; overflow: hidden;">
            ${o.primary ? `<span class="chip chip-gold" style="position: absolute; top: 14px; right: 14px;">★ Primary</span>` : ''}
            <div style="display: flex; gap: 14px; margin-bottom: 16px; align-items: start;">
              <div class="icon-sq accent" style="width: 48px; height: 48px; font-size: 22px;">🏬</div>
              <div style="flex: 1; min-width: 0;">
                <div style="font-family: var(--display); font-size: 20px; font-weight: 500; line-height: 1.1;">${o.name}</div>
                <div style="font-size: 12px; color: var(--ink-3); margin-top: 6px; line-height: 1.5;">${o.address}</div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
              <div style="padding: 10px; background: var(--bg-sub); border-radius: var(--radius);">
                <div class="lbl" style="font-size: 10px; color: var(--ink-3); text-transform: uppercase;">Today</div>
                <div style="font-family: var(--display); font-size: 22px; line-height: 1;">${o.ordersToday}</div>
                <div style="font-size: 10px; color: var(--ink-3);">orders · ${AD.rupee(o.revToday)}</div>
              </div>
              <div style="padding: 10px; background: var(--bg-sub); border-radius: var(--radius);">
                <div class="lbl" style="font-size: 10px; color: var(--ink-3); text-transform: uppercase;">Team</div>
                <div style="font-family: var(--display); font-size: 22px; line-height: 1;">${o.staff}</div>
                <div style="font-size: 10px; color: var(--ink-3);">staff · led by ${o.manager.split(" ")[0]}</div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 22px 1fr; gap: 8px; font-size: 12px; color: var(--ink-2); margin-bottom: 6px;">
              <span>📞</span><span>${o.phone}</span>
            </div>
            <div style="display: grid; grid-template-columns: 22px 1fr; gap: 8px; font-size: 12px; color: var(--ink-2); margin-bottom: 14px;">
              <span>🕘</span><span>${o.hours}</span>
            </div>

            <div style="display: flex; gap: 8px; flex-wrap: wrap; padding-top: 14px; border-top: 1px solid var(--rule);">
              ${AD.statusChip(o.status === "active" ? "Active" : "Paused", o.status === "active" ? "ok" : "muted")}
              <button class="btn btn-ghost btn-sm" onclick="AdminPages.outlets._openDrawer('${o.id}')" style="margin-left: auto;">Edit</button>
              <button class="btn btn-ghost btn-sm" onclick="alert('Outlet analytics — wire to backend')">Analytics</button>
            </div>
          </div>
        `).join("")}

        <!-- Add card -->
        <div class="chart-card" onclick="AdminPages.outlets._openDrawer()" style="cursor: pointer; border: 2px dashed var(--rule-strong); background: transparent; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 32px; min-height: 280px;">
          <div style="font-size: 40px; margin-bottom: 10px;">+</div>
          <div style="font-family: var(--display); font-size: 18px; font-style: italic;">Add another outlet</div>
          <div style="font-size: 12px; color: var(--ink-3); margin-top: 6px; max-width: 260px;">Bangali Sweets is built to scale — add Gwalior, Etawah, Jhansi or beyond when you're ready.</div>
        </div>
      </div>

      <!-- Comparison -->
      <div class="chart-card">
        <div class="chart-head">
          <div>
            <div class="lbl">Outlet performance · 30d (mock projections)</div>
            <h3>If you expand</h3>
          </div>
        </div>
        <div class="scroll-x"><table class="table">
          <thead><tr>
            <th>Outlet</th>
            <th>Orders</th>
            <th>Revenue</th>
            <th>AOV</th>
            <th>Staff cost</th>
            <th>Net</th>
            <th>Status</th>
          </tr></thead>
          <tbody>
            ${outlets.map(o => `
              <tr>
                <td><strong>${o.name}</strong></td>
                <td>${(o.ordersToday * 28).toLocaleString('en-IN')}</td>
                <td><strong>${AD.rupee(o.revToday * 28)}</strong></td>
                <td>${AD.rupee(Math.round(o.revToday / o.ordersToday))}</td>
                <td style="color: var(--danger);">−${AD.rupee(180000)}</td>
                <td><strong style="color: var(--ok);">${AD.rupee(o.revToday * 28 - 180000 - 50000)}</strong></td>
                <td>${AD.statusChip("Active", "ok")}</td>
              </tr>
            `).join("")}
            <tr style="opacity: .5;">
              <td><em>Gwalior (projected)</em></td>
              <td>~800</td>
              <td>~₹10.4L</td>
              <td>₹1,300</td>
              <td>−₹220,000</td>
              <td>₹770,000</td>
              <td>${AD.statusChip("Planning", "muted")}</td>
            </tr>
          </tbody>
        </table></div>
      </div>
    `;
  };

  AdminPages.outlets._openDrawer = function(id) {
    const outlets = AD.outlets();
    const o = id ? outlets.find(x => x.id === id) : { name: "", primary: false, address: "", phone: "+91 ", hours: "9 AM – 10 PM", manager: "", staff: 0, ordersToday: 0, revToday: 0, status: "active" };
    const isNew = !id;

    openDrawer(`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px;">
        <div>
          <div class="lbl" style="font-size: 11px; color: var(--ink-3); text-transform: uppercase; letter-spacing: .12em;">${isNew ? "Add outlet" : "Edit outlet"}</div>
          <h2>${isNew ? "New outlet" : o.name}</h2>
        </div>
        <button onclick="closeDrawer()" style="font-size: 24px; color: var(--ink-3);">×</button>
      </div>

      <div class="field"><label class="label">Outlet name</label><input class="input" id="o-name" value="${o.name}" placeholder="e.g. Gwalior · MG Road"/></div>
      <div class="field"><label class="label">Full address</label><textarea class="input" id="o-addr" rows="2">${o.address}</textarea></div>
      <div class="field-row cols-2 field">
        <div><label class="label">Phone</label><input class="input" id="o-phone" value="${o.phone}"/></div>
        <div><label class="label">Hours</label><input class="input" id="o-hours" value="${o.hours}"/></div>
      </div>
      <div class="field-row cols-2 field">
        <div><label class="label">Manager</label>
          <select class="input" id="o-mgr">
            ${AD.staff().map(s => `<option value="${s.name}" ${o.manager === s.name ? 'selected' : ''}>${s.name} (${s.role})</option>`).join("")}
          </select>
        </div>
        <div><label class="label">Staff count</label><input class="input" id="o-staff" type="number" value="${o.staff}"/></div>
      </div>
      <div class="field" style="display: flex; align-items: center; gap: 12px;">
        <span class="switch ${o.primary ? 'on' : ''}" id="o-prim" onclick="this.classList.toggle('on')"></span>
        <div>
          <div style="font-weight: 600; font-size: 14px;">Primary HQ outlet</div>
          <div style="font-size: 11px; color: var(--ink-3);">Shown on storefront &amp; receipts</div>
        </div>
      </div>
      <div class="field" style="display: flex; align-items: center; gap: 12px;">
        <span class="switch ${o.status === 'active' ? 'on' : ''}" id="o-active" onclick="this.classList.toggle('on')"></span>
        <div>
          <div style="font-weight: 600; font-size: 14px;">Outlet active</div>
          <div style="font-size: 11px; color: var(--ink-3);">Accepts pickup &amp; counter orders</div>
        </div>
      </div>

      <div style="display: flex; gap: 10px; margin-top: 24px;">
        <button class="btn btn-block" onclick="AdminPages.outlets._save('${id || ''}')">${isNew ? 'Create outlet' : 'Save changes'}</button>
        ${!isNew && !o.primary ? `<button class="btn btn-ghost" onclick="AdminPages.outlets._delete('${id}')" style="border-color: var(--danger); color: var(--danger)">Delete</button>` : ''}
      </div>
    `);
  };

  AdminPages.outlets._save = function(id) {
    const get = k => document.getElementById("o-"+k).value;
    const primary = document.getElementById("o-prim").classList.contains("on");
    const active = document.getElementById("o-active").classList.contains("on");
    const obj = {
      id: id || ("o" + Date.now()),
      name: get("name"),
      address: get("addr"),
      phone: get("phone"),
      hours: get("hours"),
      manager: get("mgr"),
      staff: Number(get("staff")) || 0,
      primary,
      status: active ? "active" : "paused",
      ordersToday: 0,
      revToday: 0,
    };
    let outlets = AD.outlets();
    if (primary) outlets.forEach(o => o.primary = false);
    if (id) {
      const idx = outlets.findIndex(x => x.id === id);
      if (idx > -1) outlets[idx] = { ...outlets[idx], ...obj };
    } else {
      outlets.unshift(obj);
    }
    AD.saveOutlets(outlets);
    closeDrawer();
    renderTab("outlets");
    BB_APP.toast(id ? "Outlet updated ✦" : "Outlet created ✦");
  };

  AdminPages.outlets._delete = function(id) {
    if (!confirm("Delete this outlet?")) return;
    AD.saveOutlets(AD.outlets().filter(o => o.id !== id));
    closeDrawer();
    renderTab("outlets");
    BB_APP.toast("Outlet deleted");
  };
})();
