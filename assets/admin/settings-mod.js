/* Admin / Settings */

(function() {
  AdminPages.settings = function(root) {
    root.innerHTML = `
      <div class="charts-row" style="grid-template-columns: 1fr 1fr;">
        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Store</div>
              <h3>Shop details</h3>
            </div>
          </div>
          <div class="field"><label class="label">Shop name</label><input class="input" value="${BB.shop.name}"/></div>
          <div class="field"><label class="label">Hindi name</label><input class="input" style="font-family: var(--hindi);" value="${BB.shop.nameHi}"/></div>
          <div class="field"><label class="label">Tagline</label><input class="input" value="${BB.shop.tagline}"/></div>
          <div class="field"><label class="label">Phone</label><input class="input" value="${BB.shop.phoneDisplay}"/></div>
          <div class="field"><label class="label">Email</label><input class="input" type="email" value="${BB.shop.email}"/></div>
          <div class="field"><label class="label">Address</label><textarea class="input" rows="2">${BB.shop.address}</textarea></div>
          <div class="field"><label class="label">Hours</label><input class="input" value="${BB.shop.hours}"/></div>
          <div class="field"><label class="label">Google Maps URL</label><input class="input" value="${BB.shop.mapsUrl}"/></div>
        </div>

        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Compliance</div>
              <h3>Legal &amp; tax</h3>
            </div>
          </div>
          <div class="field"><label class="label">GSTIN</label><input class="input" style="font-family: ui-monospace, monospace;" value="${BB.shop.gstin}"/></div>
          <div class="field"><label class="label">FSSAI License</label><input class="input" style="font-family: ui-monospace, monospace;" value="${BB.shop.fssai}"/></div>
          <div class="field"><label class="label">Business legal name</label><input class="input" value="Bangali Sweets &amp; Dryfruits"/></div>
          <div class="field"><label class="label">PAN</label><input class="input" style="font-family: ui-monospace, monospace;" placeholder="ABCDE1234F"/></div>
          <div class="field"><label class="label">Tax invoice prefix</label><input class="input" value="INV/2026/"/></div>
          <div class="field"><label class="label">Invoice starting number</label><input class="input" type="number" value="1000"/></div>
          <button class="btn btn-sm" style="margin-top: 8px;">Save compliance details</button>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-head">
          <div>
            <div class="lbl">Integrations</div>
            <h3>Connected services</h3>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px;">
          ${[
            { ic: "💳", t: "Razorpay",      sub: "UPI · Cards · Net banking · COD", k: "rzp_live_••••••••8M2", status: "connected" },
            { ic: "📱", t: "MSG91",         sub: "OTP &amp; transactional SMS", k: "Sender: BNGSWT", status: "connected" },
            { ic: "💬", t: "WhatsApp Business", sub: "Order updates via Meta API", k: "Token: ATCKzu•••", status: "connected" },
            { ic: "📦", t: "Delhivery API",  sub: "Pan-India shipping &amp; tracking", k: "API key: dlv_••••2A", status: "connected" },
            { ic: "📊", t: "Google Analytics", sub: "Traffic, conversion tracking", k: "GA4 · G-BNGS•••", status: "connected" },
            { ic: "📧", t: "SendGrid",      sub: "Email invoices &amp; newsletters", k: "API key: SG.••••", status: "connected" },
            { ic: "🎬", t: "Meta Pixel",    sub: "Facebook + Instagram ads tracking", k: "Pixel: 489••••203", status: "connected" },
            { ic: "🔍", t: "Google Merchant", sub: "Shopping ads catalog", k: "Feed: bangalisweets.in/feed.xml", status: "available" },
          ].map(i => `
            <div style="padding: 16px; border: 1px solid var(--rule); border-radius: var(--radius); background: var(--bg-sub);">
              <div style="display: flex; gap: 12px; align-items: start; margin-bottom: 10px;">
                <div class="icon-sq accent" style="width: 36px; height: 36px;">${i.ic}</div>
                <div style="flex: 1;">
                  <div style="font-weight: 600; font-size: 14px;">${i.t}</div>
                  <div style="font-size: 11px; color: var(--ink-3); margin-top: 2px;">${i.sub}</div>
                </div>
              </div>
              <div style="font-family: ui-monospace, monospace; font-size: 11px; color: var(--ink-3); padding: 6px 10px; background: var(--paper); border-radius: var(--radius); margin-bottom: 10px;">${i.k}</div>
              ${AD.statusChip(i.status === "connected" ? "● Connected" : "Available", i.status === "connected" ? "ok" : "muted")}
              ${i.status === "connected" ? '<button style="float: right; font-size: 11px; color: var(--accent); font-weight: 600;">Configure →</button>' : '<button style="float: right; font-size: 11px; color: var(--ink-2); font-weight: 600;">Connect →</button>'}
            </div>
          `).join("")}
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-head">
          <div>
            <div class="lbl">Backend database</div>
            <h3>MySQL connection</h3>
          </div>
          ${AD.statusChip("Prototype mode · localStorage", "warn")}
        </div>
        <p style="color: var(--ink-2); font-size: 14px; line-height: 1.65; margin: 0 0 18px;">
          This site currently runs entirely in the browser (localStorage) for prototyping. To go live with real persistence:
        </p>
        <div style="background: var(--bg-sub); border-radius: var(--radius); padding: 20px; margin-bottom: 18px;">
          <h4 style="font-family: var(--display); font-size: 16px; margin: 0 0 12px; font-weight: 500;">1. Set up MySQL schema</h4>
          <p style="color: var(--ink-2); font-size: 13px; line-height: 1.6; margin: 0 0 12px;">Tables to create:</p>
          <ul style="font-size: 13px; color: var(--ink-2); line-height: 1.75; padding-left: 20px; margin: 0;">
            <li><code style="background: var(--paper); padding: 1px 6px;">categories</code> · slug, en, hi, hero_img, sort_order</li>
            <li><code style="background: var(--paper); padding: 1px 6px;">products</code> · id, cat_slug, en, hi, price, mrp, stock, unit, img, desc, ingredients, shelf, hsn, gst, status</li>
            <li><code style="background: var(--paper); padding: 1px 6px;">customers</code> · id, name, phone (unique), email, joined_at, segment, points_balance</li>
            <li><code style="background: var(--paper); padding: 1px 6px;">addresses</code> · id, customer_id, line1, pin, landmark, label</li>
            <li><code style="background: var(--paper); padding: 1px 6px;">orders</code> · id, customer_id, status, mode, address_id, payment_status, payment_ref, subtotal, delivery, total, placed_at</li>
            <li><code style="background: var(--paper); padding: 1px 6px;">order_items</code> · order_id, product_id, qty, price (at time of order)</li>
            <li><code style="background: var(--paper); padding: 1px 6px;">coupons</code> · code (unique), type, value, min_order, applies, valid_till, max_uses, uses, status</li>
            <li><code style="background: var(--paper); padding: 1px 6px;">reviews</code> · id, product_id, customer_id, rating, text, status, created_at</li>
            <li><code style="background: var(--paper); padding: 1px 6px;">staff</code> · id, name, email, phone, role, outlet_id, active, last_login</li>
            <li><code style="background: var(--paper); padding: 1px 6px;">outlets</code> · id, name, address, phone, hours, manager_id, primary</li>
            <li><code style="background: var(--paper); padding: 1px 6px;">shipping_zones</code> · id, name, pin_pattern, mode, base_rate, free_over, days</li>
            <li><code style="background: var(--paper); padding: 1px 6px;">events</code> · id, type, customer_id, product_id, page, at (for analytics)</li>
            <li><code style="background: var(--paper); padding: 1px 6px;">audit_log</code> · id, staff_id, action, target, at</li>
          </ul>
        </div>

        <div style="background: var(--bg-sub); border-radius: var(--radius); padding: 20px; margin-bottom: 18px;">
          <h4 style="font-family: var(--display); font-size: 16px; margin: 0 0 12px; font-weight: 500;">2. Build REST API</h4>
          <ul style="font-size: 13px; color: var(--ink-2); line-height: 1.75; padding-left: 20px; margin: 0; font-family: ui-monospace, monospace;">
            <li><strong>GET</strong> /api/products · /api/categories · /api/products/:id</li>
            <li><strong>POST</strong> /api/auth/otp/send · /api/auth/otp/verify</li>
            <li><strong>GET/POST</strong> /api/cart · /api/orders</li>
            <li><strong>GET</strong> /api/orders/:id (customer) · /api/orders (admin)</li>
            <li><strong>PATCH</strong> /api/orders/:id/status (admin)</li>
            <li><strong>GET/POST</strong> /api/admin/products · /api/admin/coupons · /api/admin/staff · etc</li>
            <li><strong>GET</strong> /api/admin/reports/sales · /api/admin/reports/gst</li>
          </ul>
        </div>

        <div style="background: var(--bg-sub); border-radius: var(--radius); padding: 20px;">
          <h4 style="font-family: var(--display); font-size: 16px; margin: 0 0 12px; font-weight: 500;">3. Replace localStorage with fetch()</h4>
          <p style="color: var(--ink-2); font-size: 13px; line-height: 1.6; margin: 0;">
            Edit <code style="background: var(--paper); padding: 1px 6px;">assets/app.js</code> and <code style="background: var(--paper); padding: 1px 6px;">assets/admin/_state.js</code>. Wire OTP to MSG91/Twilio, payment to Razorpay Checkout JS, image uploads to S3 / Cloudinary.
          </p>
        </div>
      </div>

      <div class="chart-card" style="border: 1px solid var(--danger);">
        <div class="chart-head">
          <div>
            <div class="lbl" style="color: var(--danger);">Danger zone</div>
            <h3 style="color: var(--danger);">Destructive actions</h3>
          </div>
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-ghost" style="color: var(--danger); border-color: var(--danger);" onclick="resetDemo()">Reset all demo data</button>
          <button class="btn btn-ghost" style="color: var(--danger); border-color: var(--danger);">Export &amp; close shop</button>
        </div>
      </div>
    `;
  };
})();
