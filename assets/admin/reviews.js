/* Admin / Reviews moderation */

(function() {
  let filter = "pending";

  AdminPages.reviews = function(root) {
    const reviews = AD.reviews();
    const pending = reviews.filter(r => r.status === "pending");
    const approved = reviews.filter(r => r.status === "approved");
    const flagged = reviews.filter(r => r.status === "flagged");
    const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "—";
    const fiveStar = reviews.filter(r => r.rating === 5).length;

    let list = reviews;
    if (filter === "pending") list = pending;
    else if (filter === "approved") list = approved;
    else if (filter === "flagged") list = flagged;

    root.innerHTML = `
      <div class="kpi-row">
        ${AD.kpiCard("Pending review", `<span style="color:${pending.length>0?'var(--danger)':'var(--ink)'}">${pending.length}</span>`, pending.length ? "needs action" : "all clear", pending.length ? "down" : "up")}
        ${AD.kpiCard("Approved", approved.length, "live on site")}
        ${AD.kpiCard("Average rating", `${avgRating} <span style="color:var(--gold); font-size: 18px;">★</span>`, `${fiveStar} five-star`)}
        ${AD.kpiCard("Flagged", `<span style="color:${flagged.length>0?'var(--danger)':'var(--ink)'}">${flagged.length}</span>`, "needs moderation", flagged.length ? "down" : "muted")}
      </div>

      <div class="table-card">
        <div class="head">
          <div>
            <div class="lbl">Review moderation</div>
            <h3>${list.length} ${filter} review${list.length !== 1 ? 's' : ''}</h3>
          </div>
          <div class="tools">
            <div class="pills-row">
              <span class="filter-chip ${filter==='pending'?'sel':''}" data-rf="pending">Pending · ${pending.length}</span>
              <span class="filter-chip ${filter==='approved'?'sel':''}" data-rf="approved">Approved · ${approved.length}</span>
              <span class="filter-chip ${filter==='flagged'?'sel':''}" data-rf="flagged">Flagged · ${flagged.length}</span>
              <span class="filter-chip ${filter==='all'?'sel':''}" data-rf="all">All · ${reviews.length}</span>
            </div>
            ${pending.length > 0 ? `<button class="btn btn-sm" onclick="AdminPages.reviews._bulkApprove()">Approve all (${pending.length})</button>` : ''}
          </div>
        </div>
        <div style="padding: 18px;">
          ${list.length === 0 ? `<div style="text-align: center; padding: 32px; color: var(--ink-3);">No ${filter} reviews.</div>` : list.map(r => {
            const product = BB.products.find(p => p.id === r.productId);
            return `<div class="review-card">
              <div class="top">
                <div class="av">${r.customer.split(" ").map(p => p[0]).join("").slice(0,2)}</div>
                <div style="flex: 1;">
                  <div class="nm">${r.customer}</div>
                  <div class="meta">${r.phone} · ${r.date}</div>
                </div>
                <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div>
              </div>
              ${product ? `
                <div style="display: flex; gap: 10px; margin-bottom: 12px; padding: 8px 12px; background: var(--bg-sub); border-radius: var(--radius); align-items: center;">
                  <img src="${product.img}" style="width: 32px; height: 32px; border-radius: var(--radius); object-fit: cover;"/>
                  <div style="font-size: 12px;"><strong>${product.en}</strong> · ${product.hi}</div>
                  <a href="product.html?id=${product.id}" target="_blank" style="margin-left: auto; font-size: 11px; color: var(--accent); font-weight: 600;">View ↗</a>
                </div>
              ` : ''}
              <p class="text">"${r.text}"</p>
              <div class="acts">
                ${AD.statusChip(r.status, r.status === "approved" ? "ok" : r.status === "flagged" ? "danger" : "accent")}
                ${r.status === "pending" ? `
                  <button class="btn btn-sm" onclick="AdminPages.reviews._setStatus('${r.id}', 'approved')">✓ Approve</button>
                  <button class="btn btn-ghost btn-sm" onclick="AdminPages.reviews._setStatus('${r.id}', 'flagged')" style="border-color: var(--danger); color: var(--danger);">⚠ Flag</button>
                ` : r.status === "flagged" ? `
                  <button class="btn btn-sm" onclick="AdminPages.reviews._setStatus('${r.id}', 'approved')">Approve</button>
                  <button class="btn btn-ghost btn-sm" style="color: var(--danger); border-color: var(--danger);" onclick="AdminPages.reviews._delete('${r.id}')">Delete</button>
                ` : `
                  <button class="btn btn-ghost btn-sm" onclick="AdminPages.reviews._setStatus('${r.id}', 'flagged')">Flag</button>
                `}
                <button class="btn btn-ghost btn-sm" onclick="AdminPages.reviews._reply('${r.id}')">💬 Reply</button>
                <span style="margin-left: auto; font-size: 11px; color: var(--ink-3); cursor: pointer;">Spotlight on homepage</span>
              </div>
            </div>`;
          }).join("")}
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-head">
          <div>
            <div class="lbl">Rating distribution · all-time</div>
            <h3>${avgRating} average · ${reviews.length} reviews</h3>
          </div>
        </div>
        ${[5,4,3,2,1].map(r => {
          const count = reviews.filter(x => x.rating === r).length;
          const pct = reviews.length ? (count/reviews.length)*100 : 0;
          return `<div style="display: flex; align-items: center; gap: 14px; padding: 6px 0;">
            <span style="font-size: 13px; min-width: 60px; color: var(--gold);">${"★".repeat(r)}</span>
            <div class="bar" style="flex: 1;"><i style="width: ${pct}%; background: var(--gold);"></i></div>
            <span style="font-size: 13px; min-width: 50px; text-align: right;"><strong>${count}</strong> <span style="color: var(--ink-3);">(${pct.toFixed(0)}%)</span></span>
          </div>`;
        }).join("")}
      </div>
    `;

    document.querySelectorAll(".filter-chip[data-rf]").forEach(el => {
      el.addEventListener("click", () => {
        filter = el.dataset.rf;
        renderTab("reviews");
      });
    });
  };

  AdminPages.reviews._setStatus = function(id, status) {
    const reviews = AD.reviews();
    const r = reviews.find(x => x.id === id);
    if (!r) return;
    r.status = status;
    AD.saveReviews(reviews);
    BB_APP.toast(`Review ${status === 'approved' ? '✓ approved' : status === 'flagged' ? '⚠ flagged' : 'updated'}`);
    updateBadges();
    renderTab("reviews");
  };

  AdminPages.reviews._bulkApprove = function() {
    const reviews = AD.reviews();
    const pending = reviews.filter(r => r.status === "pending");
    if (!pending.length) { BB_APP.toast("No pending reviews"); return; }
    if (!confirm(`Approve all ${pending.length} pending reviews?`)) return;
    pending.forEach(r => r.status = "approved");
    AD.saveReviews(reviews);
    BB_APP.toast(`${pending.length} reviews approved ✦`);
    updateBadges();
    renderTab("reviews");
  };

  AdminPages.reviews._delete = function(id) {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    AD.saveReviews(AD.reviews().filter(r => r.id !== id));
    BB_APP.toast("Review deleted");
    updateBadges();
    renderTab("reviews");
  };

  AdminPages.reviews._reply = function(id) {
    const reply = prompt("Reply publicly to this review:");
    if (!reply) return;
    BB_APP.toast("Reply posted (mock — wire to backend)");
  };
})();
