/* Admin / Notifications — message templates */

(function() {
  let activeChannel = "whatsapp";

  AdminPages.notifications = function(root) {
    const notif = AD.notif();
    const list = notif[activeChannel];

    const totalSent7d = activeChannel === "whatsapp" ? 1842 : activeChannel === "sms" ? 412 : 968;
    const deliveredRate = activeChannel === "whatsapp" ? "98.2%" : activeChannel === "sms" ? "96.4%" : "94.1%";

    root.innerHTML = `
      <div class="kpi-row">
        ${AD.kpiCard("Messages · 7d", totalSent7d.toLocaleString("en-IN"), `via ${activeChannel}`)}
        ${AD.kpiCard("Delivery rate", deliveredRate, "↑ above industry")}
        ${AD.kpiCard("Active templates", list.filter(t => t.enabled).length, `of ${list.length} total`)}
        ${AD.kpiCard("Open rate (WA)", "62%", "↑ 8pp vs SMS")}
      </div>

      <div class="charts-row" style="grid-template-columns: 1fr 1fr;">
        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Channels</div>
              <h3>Where you reach customers</h3>
            </div>
          </div>
          ${[
            { id: "whatsapp", ic: "💬", t: "WhatsApp Business", sub: "Primary — order updates, marketing", n: notif.whatsapp.length, status: "connected" },
            { id: "sms",      ic: "📱", t: "SMS",              sub: "OTP &amp; transactional only · MSG91",  n: notif.sms.length, status: "connected" },
            { id: "email",    ic: "✉",  t: "Email",            sub: "Invoices &amp; receipts",               n: notif.email.length, status: "connected" },
          ].map(ch => `
            <div onclick="AdminPages.notifications._switch('${ch.id}')" style="display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--rule); cursor: pointer; align-items: center; ${activeChannel === ch.id ? 'background: color-mix(in srgb, var(--accent) 4%, transparent); margin: 0 -14px; padding-left: 14px; padding-right: 14px;' : ''}">
              <div class="icon-sq accent">${ch.ic}</div>
              <div style="flex: 1;">
                <div style="font-weight: 600; font-size: 14px;">${ch.t}</div>
                <div style="font-size: 11px; color: var(--ink-3); margin-top: 2px;">${ch.sub} · ${ch.n} template${ch.n !== 1 ? 's' : ''}</div>
              </div>
              ${AD.statusChip(ch.status, "ok")}
            </div>
          `).join("")}
        </div>

        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Variables you can use</div>
              <h3>Auto-filled in messages</h3>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            ${[
              ["{name}",     "Customer name"],
              ["{phone}",    "Customer phone"],
              ["{order}",    "Order ID"],
              ["{total}",    "Order total ₹"],
              ["{eta}",      "Delivery ETA"],
              ["{link}",     "Tracking link"],
              ["{rider}",    "Delivery rider name"],
              ["{riderPhone}","Rider phone"],
              ["{otp}",      "OTP code"],
              ["{cartLink}", "Abandoned cart URL"],
              ["{reviewLink}","Review link"],
              ["{coupon}",   "Coupon code"],
            ].map(([v, d]) => `
              <div style="padding: 8px 10px; background: var(--bg-sub); border-radius: var(--radius); font-size: 12px;">
                <code style="color: var(--accent); font-family: ui-monospace, monospace;">${v}</code>
                <div style="color: var(--ink-3); font-size: 11px; margin-top: 2px;">${d}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="table-card">
        <div class="head">
          <div>
            <div class="lbl">${activeChannel.toUpperCase()} templates</div>
            <h3>Auto-sent on these events</h3>
          </div>
          <button class="btn btn-sm" onclick="alert('Add template — wire to backend')">+ New template</button>
        </div>
        <div style="padding: 18px;">
          ${list.map(t => `
            <div class="template-card">
              <div class="top">
                <div class="ev">${t.event}</div>
                <span style="font-size: 11px; color: var(--ink-3);">${t.enabled ? 'Active' : 'Paused'}</span>
                <span class="switch ${t.enabled ? 'on' : ''}" onclick="AdminPages.notifications._toggle('${activeChannel}', '${t.id}')"></span>
              </div>
              ${t.subject ? `<div style="font-size: 13px; font-weight: 600; margin-bottom: 6px;">Subject: ${t.subject}</div>` : ''}
              <div class="body">${highlightVars(t.body)}</div>
              <div style="display: flex; gap: 8px; margin-top: 10px;">
                <button class="btn btn-ghost btn-sm" onclick="AdminPages.notifications._edit('${activeChannel}','${t.id}')">Edit</button>
                <button class="btn btn-ghost btn-sm" onclick="AdminPages.notifications._test('${activeChannel}','${t.id}')">Send test</button>
                <button class="btn btn-ghost btn-sm" onclick="AdminPages.notifications._preview('${t.id}')">Preview</button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  };

  function highlightVars(text) {
    return text.replace(/{(\w+)}/g, '<code>{$1}</code>');
  }

  AdminPages.notifications._switch = function(channel) {
    activeChannel = channel;
    renderTab("notifications");
  };

  AdminPages.notifications._toggle = function(channel, id) {
    const notif = AD.notif();
    const t = notif[channel].find(x => x.id === id);
    if (!t) return;
    t.enabled = !t.enabled;
    AD.saveNotif(notif);
    BB_APP.toast(t.enabled ? "Template activated" : "Template paused");
    renderTab("notifications");
  };

  AdminPages.notifications._edit = function(channel, id) {
    const notif = AD.notif();
    const t = notif[channel].find(x => x.id === id);
    if (!t) return;
    openDrawer(`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px;">
        <div>
          <div class="lbl" style="font-size: 11px; color: var(--ink-3); text-transform: uppercase; letter-spacing: .12em;">Edit ${channel} template</div>
          <h2>${t.event}</h2>
        </div>
        <button onclick="closeDrawer()" style="font-size: 24px; color: var(--ink-3);">×</button>
      </div>

      <div class="field"><label class="label">Event trigger</label>
        <input class="input" id="t-ev" value="${t.event}" disabled style="opacity: .6"/>
      </div>
      ${t.subject !== undefined ? `<div class="field"><label class="label">Subject line (email)</label>
        <input class="input" id="t-subject" value="${t.subject || ''}"/>
      </div>` : ''}
      <div class="field"><label class="label">Message body</label>
        <textarea class="input" id="t-body" rows="8" style="font-family: ui-monospace, monospace; font-size: 13px;">${t.body}</textarea>
      </div>
      <p style="font-size: 12px; color: var(--ink-3); margin: 0 0 14px;">
        Use <code style="background: var(--bg-sub); padding: 1px 4px;">{name}</code>, <code style="background: var(--bg-sub); padding: 1px 4px;">{order}</code>, etc — they get auto-filled.
      </p>

      <button class="btn btn-block" onclick="AdminPages.notifications._save('${channel}','${id}')">Save template</button>
    `);
  };

  AdminPages.notifications._save = function(channel, id) {
    const notif = AD.notif();
    const t = notif[channel].find(x => x.id === id);
    if (!t) return;
    t.body = document.getElementById("t-body").value;
    if (document.getElementById("t-subject")) t.subject = document.getElementById("t-subject").value;
    AD.saveNotif(notif);
    closeDrawer();
    renderTab("notifications");
    BB_APP.toast("Template saved ✦");
  };

  AdminPages.notifications._test = function(channel, id) {
    const phone = prompt("Send test to phone number (10 digits):");
    if (!phone) return;
    BB_APP.toast(`Test ${channel} sent to +91 ${phone} (mock)`);
  };

  AdminPages.notifications._preview = function(id) {
    const notif = AD.notif();
    const all = [...notif.whatsapp, ...notif.sms, ...notif.email];
    const t = all.find(x => x.id === id);
    if (!t) return;
    const filled = t.body
      .replace(/{name}/g, "Anjali Verma")
      .replace(/{order}/g, "BS-2026-04812")
      .replace(/{total}/g, "3,435")
      .replace(/{eta}/g, "Today 6 PM")
      .replace(/{link}/g, "https://bgsw.in/t/abc123")
      .replace(/{rider}/g, "Rohit T")
      .replace(/{riderPhone}/g, "+91 9234567890")
      .replace(/{otp}/g, "392147")
      .replace(/{cartLink}/g, "https://bgsw.in/cart/x")
      .replace(/{reviewLink}/g, "https://bgsw.in/r/abc")
      .replace(/{coupon}/g, "DIWALI20");

    openModal(`
      <div class="modal-head">
        <div>
          <div class="lbl" style="font-size: 11px; color: var(--ink-3); text-transform: uppercase; letter-spacing: .12em;">Message preview</div>
          <h2>${t.event}</h2>
        </div>
        <span class="close" onclick="closeModal()">×</span>
      </div>
      <div class="modal-body">
        <div style="max-width: 360px; margin: 0 auto; background: #075e54; padding: 20px; border-radius: var(--radius-lg);">
          <div style="background: #DCF8C6; color: #1a1a1a; padding: 12px 14px; border-radius: 10px; font-size: 14px; line-height: 1.55; white-space: pre-wrap;">${filled}</div>
          <div style="text-align: center; color: rgba(255,255,255,.6); font-size: 11px; margin-top: 12px;">via WhatsApp Business · just now</div>
        </div>
        <div style="margin-top: 20px; padding: 14px; background: var(--bg-sub); border-radius: var(--radius); font-size: 12px; color: var(--ink-2);">
          <strong>Template body:</strong><br/><code style="font-family: ui-monospace, monospace; white-space: pre-wrap;">${t.body}</code>
        </div>
      </div>
    `);
  };
})();
