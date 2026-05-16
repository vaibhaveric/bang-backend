/* Admin / Reports & GST */

(function() {
  let dateRange = "30d";

  AdminPages.reports = function(root) {
    const products = AD.products();
    const orders = BB_APP.orders.read();
    const allRev = orders.reduce((s,o) => s + (o.total||0), 0);
    const totalProductRev = products.reduce((s,p) => s + ((p.sold || 0) * p.price), 0);
    const totalSales = AD.sales90d.reduce((a,b) => a+b, 0);
    const gst5  = totalSales * 0.05 / 1.05;  // backed out for 5% GST items
    const gst12 = totalSales * 0.02;         // approximation for 12% items
    const cgst = gst5 / 2;
    const sgst = gst5 / 2;

    // 30d daily revenue
    const days30 = AD.sales90d.slice(-30);
    const max = Math.max(...days30);
    const pts = days30.map((v, i) => `${(i / (days30.length - 1)) * 100},${100 - (v / max) * 88}`).join(" ");

    // product-wise revenue (top 10)
    const productRev = products.map(p => ({
      ...p,
      revenue: (p.sold || 0) * p.price,
      gst: (p.sold || 0) * p.price * ((p.gst || 5) / 105),
    })).sort((a, b) => b.revenue - a.revenue);

    root.innerHTML = `
      <div class="kpi-row">
        ${AD.kpiCard("Revenue · ${dateRange}", AD.rupee(totalSales), "↑ 18% vs prev")}
        ${AD.kpiCard("Orders", "1,247", "↑ 142 vs prev")}
        ${AD.kpiCard("GST collected", AD.rupee(gst5 + gst12), "5% · 12% blended")}
        ${AD.kpiCard("Net (after tax)", AD.rupee(totalSales - gst5 - gst12), "before COGS")}
      </div>

      <div class="charts-row" style="grid-template-columns: 1.6fr 1fr;">
        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Revenue · last 30 days</div>
              <h3>${AD.rupee(days30.reduce((a,b)=>a+b,0))}</h3>
            </div>
            <div class="chart-tabs">
              <span class="${dateRange==='7d'?'sel':''}" onclick="AdminPages.reports._range('7d')">7D</span>
              <span class="${dateRange==='30d'?'sel':''}" onclick="AdminPages.reports._range('30d')">30D</span>
              <span class="${dateRange==='90d'?'sel':''}" onclick="AdminPages.reports._range('90d')">90D</span>
              <span class="${dateRange==='1y'?'sel':''}" onclick="AdminPages.reports._range('1y')">1Y</span>
            </div>
          </div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width:100%;height:200px;">
            <defs>
              <linearGradient id="rep1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6b2727" stop-opacity=".25"/>
                <stop offset="100%" stop-color="#6b2727" stop-opacity="0"/>
              </linearGradient>
            </defs>
            ${[20,40,60,80].map(y => `<line x1="0" x2="100" y1="${y}" y2="${y}" stroke="#e0d4ba" stroke-width="0.3" vector-effect="non-scaling-stroke" stroke-dasharray="0.8 1.6"/>`).join("")}
            <polygon points="0,100 ${pts} 100,100" fill="url(#rep1)"/>
            <polyline points="${pts}" fill="none" stroke="#6b2727" stroke-width="0.7" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
          </svg>
          <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--ink-3); margin-top: 6px;">
            <span>30 days ago</span><span>15 days ago</span><span>Today</span>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Quick exports</div>
              <h3>Download data</h3>
            </div>
          </div>
          ${[
            { ic: "📊", t: "Sales report · CSV",          sub: "All orders + line items, current range", fn: "_exportCSV" },
            { ic: "📋", t: "GST return · GSTR-1",         sub: "Tax-period output supplies (B2C+B2B)",  fn: "_exportGST" },
            { ic: "📦", t: "Inventory report · CSV",       sub: "Product, stock, value, last sold",      fn: "_exportInventory" },
            { ic: "👥", t: "Customer list · CSV",          sub: "Phone, email, LTV — for marketing",    fn: "_exportCustomers" },
            { ic: "🎟", t: "Coupon usage · CSV",           sub: "All coupon redemptions",               fn: "_exportCoupons" },
          ].map(e => `
            <div onclick="AdminPages.reports.${e.fn}()" style="display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--rule); cursor: pointer; align-items: center;">
              <div class="icon-sq accent">${e.ic}</div>
              <div style="flex: 1;">
                <div style="font-weight: 600; font-size: 13px;">${e.t}</div>
                <div style="font-size: 11px; color: var(--ink-3); margin-top: 2px;">${e.sub}</div>
              </div>
              <span style="color: var(--accent); font-size: 12px; font-weight: 600;">Download →</span>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Product-wise revenue -->
      <div class="table-card">
        <div class="head">
          <div>
            <div class="lbl">Product-wise revenue · ${dateRange}</div>
            <h3>Top performers</h3>
          </div>
          <div class="tools">
            <button class="btn btn-ghost btn-sm" onclick="AdminPages.reports._exportCSV()">Export CSV</button>
          </div>
        </div>
        <div class="scroll-x"><table class="table">
          <thead><tr>
            <th>#</th>
            <th>Product</th>
            <th>HSN</th>
            <th>Units</th>
            <th>Revenue</th>
            <th>GST</th>
            <th>Net</th>
            <th>Share</th>
          </tr></thead>
          <tbody>
            ${productRev.slice(0, 10).map((p, i, arr) => {
              const totalRev = arr.reduce((s,x)=>s+x.revenue, 0);
              const share = totalRev ? (p.revenue / totalRev * 100) : 0;
              return `<tr>
                <td style="font-family: var(--display); color: var(--ink-3);">${i+1}</td>
                <td>
                  <div style="display: flex; gap: 10px; align-items: center;">
                    <img src="${p.img}" style="width: 36px; height: 36px; border-radius: var(--radius); object-fit: cover;"/>
                    <div>
                      <div style="font-weight: 600; font-size: 13px;">${p.en}</div>
                      <div style="font-size: 11px; color: var(--ink-3);">${p.hi || ''}</div>
                    </div>
                  </div>
                </td>
                <td style="font-family: ui-monospace, monospace; font-size: 12px; color: var(--ink-3);">${p.hsn || '1704'}</td>
                <td><strong>${p.sold || 0}</strong></td>
                <td><strong>${AD.rupee(p.revenue)}</strong></td>
                <td style="color: var(--ink-3);">${AD.rupee(Math.round(p.gst))}</td>
                <td><strong>${AD.rupee(Math.round(p.revenue - p.gst))}</strong></td>
                <td>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-weight: 600; min-width: 36px;">${share.toFixed(1)}%</span>
                    <div class="bar" style="width: 60px;"><i style="width: ${share*3}%; background: var(--gold);"></i></div>
                  </div>
                </td>
              </tr>`;
            }).join("")}
            <tr style="background: var(--bg-sub); font-weight: 700;">
              <td colspan="3" style="text-align: right;">Total (top 10)</td>
              <td>${productRev.slice(0,10).reduce((s,p)=>s+(p.sold||0),0)}</td>
              <td>${AD.rupee(productRev.slice(0,10).reduce((s,p)=>s+p.revenue,0))}</td>
              <td>${AD.rupee(Math.round(productRev.slice(0,10).reduce((s,p)=>s+p.gst,0)))}</td>
              <td>${AD.rupee(Math.round(productRev.slice(0,10).reduce((s,p)=>s+p.revenue-p.gst,0)))}</td>
              <td></td>
            </tr>
          </tbody>
        </table></div>
      </div>

      <!-- GST summary -->
      <div class="charts-row" style="grid-template-columns: 1fr 1fr;">
        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">GST summary · April 2026</div>
              <h3>For your filing</h3>
            </div>
            <button class="btn btn-sm" onclick="AdminPages.reports._exportGST()">Download GSTR-1</button>
          </div>
          <table class="table" style="margin-top: -10px;">
            <tbody>
              <tr><td><strong>Taxable supplies (5%)</strong></td><td style="text-align: right;">${AD.rupee(totalSales * 0.7)}</td></tr>
              <tr><td>· CGST 2.5%</td><td style="text-align: right; color: var(--ink-3);">${AD.rupee(totalSales * 0.7 * 0.025)}</td></tr>
              <tr><td>· SGST 2.5%</td><td style="text-align: right; color: var(--ink-3);">${AD.rupee(totalSales * 0.7 * 0.025)}</td></tr>
              <tr><td><strong>Taxable supplies (12%)</strong></td><td style="text-align: right;">${AD.rupee(totalSales * 0.2)}</td></tr>
              <tr><td>· CGST 6%</td><td style="text-align: right; color: var(--ink-3);">${AD.rupee(totalSales * 0.2 * 0.06)}</td></tr>
              <tr><td>· SGST 6%</td><td style="text-align: right; color: var(--ink-3);">${AD.rupee(totalSales * 0.2 * 0.06)}</td></tr>
              <tr><td><strong>Exempt / Nil</strong></td><td style="text-align: right;">${AD.rupee(totalSales * 0.1)}</td></tr>
              <tr style="background: var(--bg-sub);"><td><strong>Total GST</strong></td><td style="text-align: right; font-weight: 700; color: var(--accent);">${AD.rupee(totalSales * 0.7 * 0.05 + totalSales * 0.2 * 0.12)}</td></tr>
            </tbody>
          </table>
          <div style="margin-top: 14px; padding: 10px 14px; background: color-mix(in srgb, var(--gold) 14%, transparent); border-radius: var(--radius); font-size: 12px; color: var(--gold-ink);">
            ⏰ Filing due by <strong>11 May 2026</strong> · 0 days remaining
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Category-wise revenue</div>
              <h3>Where the money's coming from</h3>
            </div>
          </div>
          ${BB.categories.map(cat => {
            const inCat = products.filter(p => p.cat === cat.slug);
            const rev = inCat.reduce((s, p) => s + (p.sold||0) * p.price, 0);
            const max = Math.max(...BB.categories.map(c => products.filter(p => p.cat === c.slug).reduce((s,p) => s + (p.sold||0)*p.price, 0)));
            const pct = max ? (rev / max) * 100 : 0;
            return `<div style="padding: 8px 0;">
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 5px;">
                <strong>${cat.en}</strong>
                <span>${AD.rupee(rev)}</span>
              </div>
              <div class="bar"><i style="width: ${pct}%"></i></div>
            </div>`;
          }).join("")}
        </div>
      </div>

      <!-- P&L mini -->
      <div class="chart-card">
        <div class="chart-head">
          <div>
            <div class="lbl">Quick P&amp;L · this month</div>
            <h3>How the money flowed</h3>
          </div>
          <span style="font-size: 11px; color: var(--ink-3);">Estimate — wire COGS to backend for accurate numbers</span>
        </div>
        <div class="scroll-x"><table class="table">
          <tbody>
            <tr><td><strong>Gross revenue</strong></td><td style="text-align: right;">${AD.rupee(totalSales)}</td></tr>
            <tr><td>− GST collected</td><td style="text-align: right; color: var(--ink-3);">−${AD.rupee(gst5 + gst12)}</td></tr>
            <tr style="background: var(--bg-sub);"><td><strong>Net revenue</strong></td><td style="text-align: right; font-weight: 700;">${AD.rupee(totalSales - gst5 - gst12)}</td></tr>
            <tr><td>− COGS (ingredients, packing) · ~40%</td><td style="text-align: right; color: var(--danger);">−${AD.rupee((totalSales - gst5 - gst12) * 0.4)}</td></tr>
            <tr><td>− Staff salaries</td><td style="text-align: right; color: var(--danger);">−${AD.rupee(180000)}</td></tr>
            <tr><td>− Rent &amp; utilities</td><td style="text-align: right; color: var(--danger);">−${AD.rupee(45000)}</td></tr>
            <tr><td>− Delivery costs</td><td style="text-align: right; color: var(--danger);">−${AD.rupee(38000)}</td></tr>
            <tr><td>− Marketing &amp; ads</td><td style="text-align: right; color: var(--danger);">−${AD.rupee(22000)}</td></tr>
            <tr style="background: color-mix(in srgb, var(--ok) 10%, transparent);"><td><strong>Estimated profit</strong></td><td style="text-align: right; font-weight: 700; color: var(--ok); font-size: 16px;">${AD.rupee((totalSales - gst5 - gst12) * 0.6 - 285000)}</td></tr>
          </tbody>
        </table></div>
      </div>
    `;
  };

  AdminPages.reports._range = function(r) {
    dateRange = r;
    renderTab("reports");
  };

  AdminPages.reports._exportCSV = function() {
    const products = AD.products();
    const head = "Product ID,Name,Category,HSN,Units sold,Revenue,GST %,GST amount,Net";
    const rows = products.map(p => {
      const rev = (p.sold||0) * p.price;
      const gstPct = p.gst || 5;
      const gst = rev * (gstPct/(100+gstPct));
      return [p.id, `"${p.en}"`, p.cat, p.hsn || '1704', p.sold||0, rev, gstPct, Math.round(gst), Math.round(rev - gst)].join(",");
    });
    download("sales-report.csv", head + "\n" + rows.join("\n"));
    BB_APP.toast("Sales report downloaded");
  };

  AdminPages.reports._exportGST = function() {
    const products = AD.products();
    const head = "GSTIN,Invoice No,Date,HSN,Description,Qty,Rate,Taxable Value,CGST %,CGST Amt,SGST %,SGST Amt,Total";
    const rows = products.slice(0, 20).map((p, i) => {
      const qty = p.sold || 1;
      const rate = p.price;
      const taxable = qty * rate / (1 + (p.gst || 5)/100);
      const cgst = taxable * ((p.gst || 5)/200);
      return ["23ABCDE1234F1Z5", `INV/2026/${1000+i}`, "2026-05-12", p.hsn || '1704', `"${p.en}"`, qty, rate, taxable.toFixed(2), (p.gst||5)/2, cgst.toFixed(2), (p.gst||5)/2, cgst.toFixed(2), (taxable + 2*cgst).toFixed(2)].join(",");
    });
    download("GSTR-1-april-2026.csv", head + "\n" + rows.join("\n"));
    BB_APP.toast("GSTR-1 downloaded · ready to upload");
  };

  AdminPages.reports._exportInventory = function() {
    const head = "Product ID,Name,Category,Stock,Price,Value";
    const rows = AD.products().map(p => [p.id, `"${p.en}"`, p.cat, p.stock||0, p.price, (p.stock||0)*p.price].join(","));
    download("inventory.csv", head + "\n" + rows.join("\n"));
    BB_APP.toast("Inventory exported");
  };

  AdminPages.reports._exportCustomers = function() {
    const head = "Name,Phone,Email,Orders,LTV,Segment,Last Order,Joined";
    const rows = AD.mockCustomers.map(c => [`"${c.name}"`, c.phone, c.email, c.orderCount, c.ltv, c.segment, c.last, c.joined].join(","));
    download("customers.csv", head + "\n" + rows.join("\n"));
    BB_APP.toast("Customer list exported");
  };

  AdminPages.reports._exportCoupons = function() {
    const head = "Code,Type,Value,Min Order,Applies,Uses,Max Uses,Valid Till,Status";
    const rows = AD.coupons().map(c => [c.code, c.type, c.value, c.minOrder, c.applies, c.uses, c.maxUses, c.validTill, c.status].join(","));
    download("coupons.csv", head + "\n" + rows.join("\n"));
    BB_APP.toast("Coupon usage exported");
  };

  function download(name, content) {
    const blob = new Blob([content], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  }
})();
