/* Admin / Staff & roles */

(function() {
  AdminPages.staff = function(root) {
    const staff = AD.staff();
    const active = staff.filter(s => s.active);

    root.innerHTML = `
      <div class="kpi-row">
        ${AD.kpiCard("Team size", staff.length, `${active.length} active`)}
        ${AD.kpiCard("Roles defined", AD.roles.length, "5 default")}
        ${AD.kpiCard("Outlets", 1, "Bhind HQ")}
        ${AD.kpiCard("Last login", "Just now", "Ramesh K (Owner)")}
      </div>

      <div class="table-card">
        <div class="head">
          <div>
            <div class="lbl">Team</div>
            <h3>Staff &amp; admin access</h3>
          </div>
          <button class="btn btn-sm" onclick="AdminPages.staff._openDrawer()">+ Invite staff</button>
        </div>
        <div class="scroll-x"><table class="table">
          <thead><tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Outlet</th>
            <th>Last login</th>
            <th>Status</th>
            <th></th>
          </tr></thead>
          <tbody>
            ${staff.map(s => `
              <tr>
                <td>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="icon-sq accent" style="width: 36px; height: 36px;">${s.initials}</div>
                    <strong>${s.name}</strong>
                  </div>
                </td>
                <td><span class="chip ${s.role === 'Owner' ? 'chip-gold' : ''}">${s.role}</span></td>
                <td style="font-size: 12px;">${s.email}</td>
                <td style="font-family: ui-monospace, monospace; font-size: 12px;">${s.phone}</td>
                <td style="font-size: 12px;">${s.outlet}</td>
                <td style="color: var(--ink-3); font-size: 12px;">${s.lastLogin}</td>
                <td>${AD.statusChip(s.active ? "Active" : "Inactive", s.active ? "ok" : "muted")}</td>
                <td style="text-align: right;">
                  <button onclick="AdminPages.staff._openDrawer('${s.id}')" style="color: var(--accent); font-size: 12px; font-weight: 600; padding: 4px 6px;">Edit</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table></div>
      </div>

      <!-- Role permissions matrix -->
      <div class="chart-card">
        <div class="chart-head">
          <div>
            <div class="lbl">Roles &amp; permissions</div>
            <h3>What each role can access</h3>
          </div>
        </div>
        <div class="scroll-x">
          <table class="table">
            <thead><tr>
              <th>Section</th>
              ${AD.roles.map(r => `<th style="text-align: center; min-width: 80px;">${r.label}</th>`).join("")}
            </tr></thead>
            <tbody>
              ${AD.perms.map(p => `
                <tr>
                  <td><strong>${p}</strong></td>
                  ${AD.roles.map(r => {
                    const has = AD.rolePerms[r.id].includes(p);
                    return `<td style="text-align: center;">${has ? '<span style="color: var(--ok); font-size: 18px;">✓</span>' : '<span style="color: var(--rule-strong);">—</span>'}</td>`;
                  }).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div style="margin-top: 14px; display: flex; gap: 12px; flex-wrap: wrap;">
          ${AD.roles.map(r => `
            <div style="flex: 1; min-width: 200px; padding: 12px 14px; background: var(--bg-sub); border-radius: var(--radius);">
              <div style="font-weight: 700; font-size: 13px;">${r.label}</div>
              <div style="font-size: 11px; color: var(--ink-3); margin-top: 4px; line-height: 1.4;">${r.desc}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Activity log -->
      <div class="chart-card">
        <div class="chart-head">
          <div>
            <div class="lbl">Recent activity log</div>
            <h3>Who did what, when</h3>
          </div>
          <button class="btn btn-ghost btn-sm">Full log</button>
        </div>
        ${[
          { who: "Ramesh Kumar",   ic: "✦", act: "Approved 3 reviews",                          when: "12 min ago" },
          { who: "Sunita Devi",    ic: "📦", act: "Marked order BS-2026-04812 as Out for delivery", when: "28 min ago" },
          { who: "Karan Yadav",    ic: "✓", act: "Confirmed COD payment · BS-2026-04810",      when: "1h ago" },
          { who: "Ramesh Kumar",   ic: "🎟", act: "Created coupon DIWALI20",                   when: "Yesterday, 11:42 AM" },
          { who: "Bhaiya Ram",     ic: "📥", act: "Restocked Kaju Katli · +20 units",           when: "Yesterday, 9:15 AM" },
          { who: "Ramesh Kumar",   ic: "📝", act: "Edited product · The Heritage Box",          when: "2 days ago" },
          { who: "Sunita Devi",    ic: "★", act: "Replied to review by Anjali Verma",          when: "3 days ago" },
        ].map(a => `
          <div style="display: grid; grid-template-columns: 28px 1fr auto; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--rule); align-items: center;">
            <span style="text-align: center;">${a.ic}</span>
            <div style="font-size: 13px;"><strong>${a.who}</strong> <span style="color: var(--ink-2);">· ${a.act}</span></div>
            <span style="color: var(--ink-3); font-size: 11px;">${a.when}</span>
          </div>
        `).join("")}
      </div>
    `;
  };

  AdminPages.staff._openDrawer = function(id) {
    const staff = AD.staff();
    const s = id ? staff.find(x => x.id === id) : { name: "", role: "Manager", email: "", phone: "+91 ", active: true, outlet: "Bhind HQ", initials: "?" };
    const isNew = !id;

    openDrawer(`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px;">
        <div>
          <div class="lbl" style="font-size: 11px; color: var(--ink-3); text-transform: uppercase; letter-spacing: .12em;">${isNew ? "Invite staff" : "Edit staff"}</div>
          <h2>${isNew ? "Add team member" : s.name}</h2>
        </div>
        <button onclick="closeDrawer()" style="font-size: 24px; color: var(--ink-3);">×</button>
      </div>

      <div class="field"><label class="label">Full name</label><input class="input" id="s-name" value="${s.name}"/></div>
      <div class="field"><label class="label">Email</label><input class="input" id="s-email" type="email" value="${s.email}" placeholder="name@bangalisweets.in"/></div>
      <div class="field"><label class="label">Phone</label><input class="input" id="s-phone" value="${s.phone}" placeholder="+91 98765 43210"/></div>
      <div class="field"><label class="label">Role</label>
        <select class="input" id="s-role">
          ${AD.roles.map(r => `<option value="${r.label}" ${s.role === r.label ? 'selected' : ''}>${r.label} — ${r.desc}</option>`).join("")}
        </select>
      </div>
      <div class="field"><label class="label">Outlet</label>
        <select class="input" id="s-outlet">
          ${AD.outlets().map(o => `<option value="${o.name}" ${s.outlet === o.name ? 'selected' : ''}>${o.name}</option>`).join("")}
        </select>
      </div>
      <div class="field" style="display: flex; align-items: center; gap: 12px;">
        <span class="switch ${s.active ? 'on' : ''}" id="s-switch" onclick="this.classList.toggle('on')"></span>
        <div>
          <div style="font-weight: 600; font-size: 14px;">Account active</div>
          <div style="font-size: 11px; color: var(--ink-3);">Pause without deleting</div>
        </div>
      </div>

      ${isNew ? `<div style="padding: 12px 14px; background: var(--bg-sub); border-radius: var(--radius); font-size: 12px; color: var(--ink-2); margin-top: 14px;">
        💡 They'll receive an SMS invite with a one-time login link.
      </div>` : ''}

      <div style="display: flex; gap: 10px; margin-top: 24px;">
        <button class="btn btn-block" onclick="AdminPages.staff._save('${id || ''}')">${isNew ? 'Send invite' : 'Save changes'}</button>
        ${!isNew && s.role !== 'Owner' ? `<button class="btn btn-ghost" onclick="AdminPages.staff._delete('${id}')" style="border-color: var(--danger); color: var(--danger)">Remove</button>` : ''}
      </div>
    `);
  };

  AdminPages.staff._save = function(id) {
    const get = k => document.getElementById("s-"+k).value;
    const active = document.getElementById("s-switch").classList.contains("on");
    const name = get("name");
    if (!name) { BB_APP.toast("Name is required"); return; }
    const obj = {
      id: id || ("u" + Date.now()),
      name,
      role: get("role"),
      email: get("email"),
      phone: get("phone"),
      outlet: get("outlet"),
      active,
      lastLogin: id ? "—" : "Pending invite",
      initials: name.split(" ").map(p => p[0]).join("").slice(0,2).toUpperCase(),
    };
    let staff = AD.staff();
    if (id) {
      const idx = staff.findIndex(s => s.id === id);
      if (idx > -1) staff[idx] = { ...staff[idx], ...obj };
    } else {
      staff.unshift(obj);
    }
    AD.saveStaff(staff);
    closeDrawer();
    renderTab("staff");
    BB_APP.toast(id ? "Staff updated ✦" : "Invite sent ✦");
  };

  AdminPages.staff._delete = function(id) {
    if (!confirm("Remove this staff member? They lose access immediately.")) return;
    AD.saveStaff(AD.staff().filter(s => s.id !== id));
    closeDrawer();
    renderTab("staff");
    BB_APP.toast("Staff removed");
  };
})();
