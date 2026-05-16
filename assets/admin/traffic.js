/* Admin / Traffic & funnel */

(function() {
  AdminPages.traffic = function(root) {
    const analytics = BB_APP.analytics.read();
    const maxFunnel = AD.funnel[0].v;

    root.innerHTML = `
      <div class="kpi-row">
        ${AD.kpiCard("Sessions · 7d", "12,442", "↑ 18%")}
        ${AD.kpiCard("Avg session", "2:14", "↑ 12s")}
        ${AD.kpiCard("Pages / session", "4.8", "↑ 0.4")}
        ${AD.kpiCard("Conversion", "7.8%", "↑ 1.4 pp")}
      </div>

      <div class="charts-row">
        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Checkout funnel · 7d</div>
              <h3>7.8% overall conversion</h3>
            </div>
            <span class="chip" style="background: color-mix(in srgb, var(--ok) 14%, transparent); color: var(--ok); font-weight: 600;">↑ healthy</span>
          </div>
          ${AD.funnel.map((f, i) => {
            const pct = (f.v/maxFunnel)*100;
            const drop = i > 0 ? Math.round((1 - f.v/AD.funnel[i-1].v)*100) : 0;
            return `<div style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 5px;">
                <span style="font-weight: 500; color: var(--ink-2);">${f.step}</span>
                <span><strong>${f.v.toLocaleString('en-IN')}</strong> ${i>0 ? `<span style="color: var(--ink-3);">(−${drop}%)</span>` : ''}</span>
              </div>
              <div style="height: 24px; background: var(--bg-sub); border-radius: 6px; overflow: hidden;">
                <div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 70%, var(--gold))); border-radius: 6px; display: flex; align-items: center; justify-content: flex-end; padding-right: 12px; color: #fff; font-size: 11px; font-weight: 600;">${Math.round(pct)}%</div>
              </div>
            </div>`;
          }).join("")}
          <div style="margin-top: 14px; padding: 12px 14px; background: var(--bg-sub); border-radius: var(--radius); font-size: 12px; color: var(--ink-2);">
            💡 Biggest drop is <strong>Product View → Cart</strong>. Test: stickier "Add to bag" button, social proof, urgency.
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Devices</div>
              <h3>How they visit</h3>
            </div>
          </div>
          ${[["📱","Mobile",68],["💻","Desktop",26],["📋","Tablet",6]].map(([ic,n,v]) => `
            <div style="display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--rule);">
              <div style="font-size: 24px;">${ic}</div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
                  <strong>${n}</strong>
                  <span><strong>${v}%</strong></span>
                </div>
                <div class="bar"><i style="width: ${v}%"></i></div>
              </div>
            </div>
          `).join("")}
          <div style="margin-top: 14px; padding: 12px 14px; background: var(--bg-sub); border-radius: var(--radius); font-size: 12px; color: var(--ink-2);">
            💡 Mobile leads — invest in WhatsApp catalog &amp; mobile checkout flow.
          </div>
        </div>
      </div>

      <div class="charts-row" style="grid-template-columns: 1fr 1fr;">
        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Traffic sources · 7d</div>
              <h3>12,442 sessions</h3>
            </div>
          </div>
          <div style="display: flex; height: 10px; border-radius: 99px; overflow: hidden; margin-bottom: 14px;">
            ${AD.traffic.map(t => `<div style="width: ${t.v}%; background: ${t.color};"></div>`).join("")}
          </div>
          ${AD.traffic.map(t => `
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; padding: 6px 0; border-bottom: 1px solid var(--rule);">
              <span style="width: 9px; height: 9px; border-radius: 2px; background: ${t.color}"></span>
              <span style="flex: 1; color: var(--ink-2)">${t.label}</span>
              <span><strong>${t.v}%</strong></span>
              <span style="color: var(--ink-3); min-width: 60px; text-align: right;">${Math.round(12442*t.v/100).toLocaleString('en-IN')}</span>
            </div>
          `).join("")}
        </div>

        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Top cities · 30d</div>
              <h3>Where orders ship to</h3>
            </div>
          </div>
          ${[
            ["Bhind, MP",      342, 38],
            ["Gwalior, MP",    188, 21],
            ["Delhi NCR",      152, 17],
            ["Mumbai, MH",      88, 10],
            ["Jaipur, RJ",      64,  7],
            ["Other (52 cities)", 64, 7],
          ].map(([city, n, pct], i, a) => {
            const max = Math.max(...a.map(x => x[1]));
            return `<div style="display: flex; align-items: center; gap: 10px; padding: 6px 0; border-bottom: 1px solid var(--rule);">
              <span style="font-size: 13px; flex: 1;">${city}</span>
              <div class="bar" style="width: 100px;"><i style="width: ${(n/max)*100}%"></i></div>
              <span style="font-size: 13px; min-width: 50px; text-align: right;"><strong>${n}</strong> <span style="color: var(--ink-3); font-size: 11px;">(${pct}%)</span></span>
            </div>`;
          }).join("")}
        </div>
      </div>

      <div class="table-card">
        <div class="head">
          <div>
            <div class="lbl">Top pages · 7d (live + mock)</div>
            <h3>Where they linger</h3>
          </div>
          <span style="font-size: 11px; color: var(--ink-3);">Live data captured from this session</span>
        </div>
        <div class="scroll-x"><table class="table">
          <thead><tr><th>Page</th><th>Views</th><th>Avg time</th><th>Bounce</th><th>Exit %</th><th>Conversion</th></tr></thead>
          <tbody>
            ${[
              ["/collections/sweets", 4820, "1:42", 22, 11, 8.2],
              ["/collections/hampers", 3104, "2:18", 18, 8, 12.4],
              ["/product/kaju-katli", 2944, "1:09", 31, 18, 9.8],
              ["/collections/dryfruits", 2102, "1:33", 28, 14, 6.1],
              ["/product/diwali-gold-box", 1888, "2:51", 14, 6, 14.7],
              ["/", 1644, "0:58", 38, 21, 5.4],
              ["/about", 912, "0:48", 64, 32, 0.4],
            ].map(([p, v, t, b, ex, conv]) => `
              <tr>
                <td style="font-family: ui-monospace, monospace; font-size: 12px;">${p}</td>
                <td><strong>${v.toLocaleString('en-IN')}</strong></td>
                <td style="color: var(--ink-3);">${t}</td>
                <td>${b}%</td>
                <td>${ex}%</td>
                <td><strong style="color: ${conv > 5 ? 'var(--ok)' : 'var(--ink-3)'}">${conv}%</strong></td>
              </tr>
            `).join("")}
            <tr style="background: color-mix(in srgb, var(--gold) 8%, transparent);">
              <td style="font-family: ui-monospace, monospace; font-size: 12px; color: var(--accent); font-weight: 700;">Live this session ↓</td>
              <td colspan="5" style="color: var(--ink-3); font-size: 12px;">Captured from your own browsing — refresh and navigate to see counts change.</td>
            </tr>
            ${Object.entries(analytics.pageViews).length === 0
              ? `<tr><td colspan='6' style='color: var(--ink-3); padding: 20px; text-align: center;'>Browse the site and come back — your views will show here.</td></tr>`
              : Object.entries(analytics.pageViews).slice(0, 8).map(([p, v]) => `
                <tr>
                  <td style="font-family: ui-monospace, monospace; font-size: 12px;">/${p}</td>
                  <td><strong>${v}</strong></td>
                  <td style="color: var(--ink-3);">—</td>
                  <td>—</td><td>—</td><td>—</td>
                </tr>
              `).join("")
            }
          </tbody>
        </table></div>
      </div>
    `;
  };
})();
