/* Admin / Banners & CMS — homepage editor */

(function() {
  AdminPages.banners = function(root) {
    const b = AD.banners();

    root.innerHTML = `
      <div class="kpi-row">
        ${AD.kpiCard("Hero status", `<span style="color:var(--ok); font-size: 18px;">● Live</span>`, "since Diwali 2026 edit")}
        ${AD.kpiCard("Featured products", b.featuredHampers.length, "on homepage")}
        ${AD.kpiCard("Hero CTR", "8.2%", "↑ 1.4pp vs prev")}
        ${AD.kpiCard("Banner edits", "12", "this month")}
      </div>

      <div class="charts-row" style="grid-template-columns: 1fr 1fr;">
        <!-- Promo bar -->
        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Top promo bar</div>
              <h3>Tiny ribbon above header</h3>
            </div>
          </div>
          <div class="field"><label class="label">Message</label>
            <input class="input" id="b-promo" value="${b.promo}" placeholder="🎁 Free delivery above ₹999"/>
          </div>
          <div class="banner-preview">
            <div class="lbl" style="color: var(--ink-3); font-size: 10px; text-transform: uppercase; letter-spacing: .12em; margin-bottom: 8px;">Preview</div>
            <div style="background: var(--ink); color: #dac6a8; padding: 8px 14px; border-radius: var(--radius); font-size: 12px; text-align: center;" id="b-promo-preview">${b.promo}</div>
          </div>
          <p style="font-size: 12px; color: var(--ink-3); margin: 14px 0 0;">Shows on every page · max 90 characters · supports emoji</p>
        </div>

        <!-- SEO -->
        <div class="chart-card">
          <div class="chart-head">
            <div>
              <div class="lbl">Homepage SEO</div>
              <h3>How Google sees you</h3>
            </div>
          </div>
          <div class="field"><label class="label">Meta title</label>
            <input class="input" id="b-seo-title" value="${b.seo.title}"/>
          </div>
          <div class="field"><label class="label">Meta description</label>
            <textarea class="input" id="b-seo-desc" rows="3">${b.seo.desc}</textarea>
          </div>
          <div class="banner-preview" style="background: #fff;">
            <div class="lbl" style="color: var(--ink-3); font-size: 10px; text-transform: uppercase; letter-spacing: .12em; margin-bottom: 8px;">Google search preview</div>
            <div style="font-size: 12px; color: #006621;">bangalisweets.in › home</div>
            <div style="font-size: 18px; color: #1a0dab; margin: 4px 0 2px;" id="seo-title-prev">${b.seo.title}</div>
            <div style="font-size: 13px; color: #545454;" id="seo-desc-prev">${b.seo.desc}</div>
          </div>
        </div>
      </div>

      <!-- Hero banner -->
      <div class="chart-card">
        <div class="chart-head">
          <div>
            <div class="lbl">Homepage hero</div>
            <h3>The first thing visitors see</h3>
          </div>
          <a class="btn btn-ghost btn-sm" href="index.html" target="_blank">View live →</a>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <div>
            <div class="field"><label class="label">Eyebrow text</label>
              <input class="input" id="h-eyebrow" value="${b.hero.eyebrow}" placeholder="Festive Edit · Diwali 2026"/>
            </div>
            <div class="field"><label class="label">Headline</label>
              <textarea class="input" id="h-title" rows="2">${b.hero.title}</textarea>
            </div>
            <div class="field"><label class="label">Hindi sub (हिंदी)</label>
              <textarea class="input" style="font-family: var(--hindi);" id="h-titlehi" rows="2">${b.hero.titleHi}</textarea>
            </div>
            <div class="field-row cols-2 field">
              <div><label class="label">Primary CTA</label><input class="input" id="h-ctap" value="${b.hero.ctaPrimary}"/></div>
              <div><label class="label">Primary CTA link</label><input class="input" id="h-ctapl" value="${b.hero.ctaPrimaryLink}"/></div>
            </div>
            <div class="field-row cols-2 field">
              <div><label class="label">Secondary CTA</label><input class="input" id="h-ctas" value="${b.hero.ctaSecondary}"/></div>
              <div><label class="label">Secondary CTA link</label><input class="input" id="h-ctasl" value="${b.hero.ctaSecondaryLink}"/></div>
            </div>
            <button class="btn" style="margin-top: 14px;" onclick="AdminPages.banners._save()">Save changes</button>
          </div>
          <div>
            <div class="banner-preview" style="padding: 28px; background: var(--bg-sub);">
              <div class="lbl" style="color: var(--gold); font-size: 11px; text-transform: uppercase; letter-spacing: .14em;">${b.hero.eyebrow}</div>
              <div class="bn-title" style="white-space: pre-line;">${b.hero.title}</div>
              <p style="font-family: var(--hindi); color: var(--ink-3); margin: 6px 0 12px;">${b.hero.titleHi}</p>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <span class="btn btn-sm">${b.hero.ctaPrimary} →</span>
                <span class="btn btn-ghost btn-sm">${b.hero.ctaSecondary}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured products -->
      <div class="chart-card" style="margin-top: 16px;">
        <div class="chart-head">
          <div>
            <div class="lbl">Featured collections</div>
            <h3>What shows on the homepage</h3>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <div>
            <h4 style="font-family: var(--display); font-size: 16px; margin: 0 0 10px; font-weight: 500;">Featured hampers</h4>
            <p style="font-size: 12px; color: var(--ink-3); margin: 0 0 12px;">Shown in "The Hamper Edit" section · max 4</p>
            ${b.featuredHampers.map(id => {
              const p = BB.products.find(x => x.id === id);
              if (!p) return '';
              return `<div style="display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--rule); align-items: center;">
                <div style="cursor: grab; color: var(--ink-3);">⋮⋮</div>
                <img src="${p.img}" style="width: 44px; height: 44px; object-fit: cover; border-radius: var(--radius);"/>
                <div style="flex: 1;">
                  <div style="font-weight: 600; font-size: 13px;">${p.en}</div>
                  <div style="font-size: 11px; color: var(--ink-3);">${p.pieces || p.unit || ''}</div>
                </div>
                <button style="color: var(--danger); font-size: 12px;">Remove</button>
              </div>`;
            }).join("")}
            <button class="btn btn-ghost btn-sm" style="margin-top: 10px; width: 100%;">+ Add hamper</button>
          </div>

          <div>
            <h4 style="font-family: var(--display); font-size: 16px; margin: 0 0 10px; font-weight: 500;">Bestsellers</h4>
            <p style="font-size: 12px; color: var(--ink-3); margin: 0 0 12px;">"Kiratpura's favourites" section · max 4</p>
            ${b.bestsellerIds.map(id => {
              const p = BB.products.find(x => x.id === id);
              if (!p) return '';
              return `<div style="display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--rule); align-items: center;">
                <div style="cursor: grab; color: var(--ink-3);">⋮⋮</div>
                <img src="${p.img}" style="width: 44px; height: 44px; object-fit: cover; border-radius: var(--radius);"/>
                <div style="flex: 1;">
                  <div style="font-weight: 600; font-size: 13px;">${p.en}</div>
                  <div style="font-size: 11px; color: var(--ink-3);">${p.unit || ''}</div>
                </div>
                <button style="color: var(--danger); font-size: 12px;">Remove</button>
              </div>`;
            }).join("")}
            <button class="btn btn-ghost btn-sm" style="margin-top: 10px; width: 100%;">+ Add product</button>
          </div>
        </div>
      </div>
    `;

    // live preview hookup
    document.getElementById("b-promo").addEventListener("input", e => {
      document.getElementById("b-promo-preview").textContent = e.target.value;
    });
    document.getElementById("b-seo-title").addEventListener("input", e => {
      document.getElementById("seo-title-prev").textContent = e.target.value;
    });
    document.getElementById("b-seo-desc").addEventListener("input", e => {
      document.getElementById("seo-desc-prev").textContent = e.target.value;
    });
  };

  AdminPages.banners._save = function() {
    const b = AD.banners();
    b.promo = document.getElementById("b-promo").value;
    b.seo.title = document.getElementById("b-seo-title").value;
    b.seo.desc = document.getElementById("b-seo-desc").value;
    b.hero.eyebrow = document.getElementById("h-eyebrow").value;
    b.hero.title = document.getElementById("h-title").value;
    b.hero.titleHi = document.getElementById("h-titlehi").value;
    b.hero.ctaPrimary = document.getElementById("h-ctap").value;
    b.hero.ctaPrimaryLink = document.getElementById("h-ctapl").value;
    b.hero.ctaSecondary = document.getElementById("h-ctas").value;
    b.hero.ctaSecondaryLink = document.getElementById("h-ctasl").value;
    AD.saveBanners(b);
    BB_APP.toast("Banner saved · publish to push live");
  };
})();
