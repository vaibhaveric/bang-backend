// Direction A — Admin dashboard (catalog + analytics + traffic + customers)

const { Icon: IconAd, Rupee: RupeeAd } = window.BBShared;
const DATA_AD = window.BB_DATA;

function AdminA() {
  const max = Math.max(...DATA_AD.sales14d);
  const pts = DATA_AD.sales14d
    .map((v, i) => `${(i / (DATA_AD.sales14d.length - 1)) * 100},${100 - (v / max) * 90}`)
    .join(" ");

  return (
    <div className="artboard dir-a" data-screen-label="A · Admin" style={{display:"grid", gridTemplateColumns:"230px 1fr", height:"100%"}}>
      {/* SIDEBAR */}
      <aside style={{background:"var(--ink)", color:"#dac6a8", padding:"24px 0", display:"flex", flexDirection:"column"}}>
        <div style={{padding:"0 22px 24px", borderBottom:"1px solid #3a2a1a"}}>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <div style={{width:36, height:36, borderRadius:"50%", border:"1px solid var(--gold)", color:"var(--gold)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--display)", fontStyle:"italic", fontSize:18}}>B</div>
            <div>
              <div className="disp" style={{fontSize:15, color:"var(--gold)"}}>Bangali Sweets</div>
              <div style={{fontSize:10, opacity:.6, letterSpacing:".1em", textTransform:"uppercase"}}>Admin · Bhind HQ</div>
            </div>
          </div>
        </div>

        <div style={{padding:"18px 14px 6px"}}>
          <div style={{fontSize:9, letterSpacing:".18em", textTransform:"uppercase", color:"#8a7860", padding:"0 8px", marginBottom:8}}>Operate</div>
          {[
            ["📥","Orders","42","badge"],
            ["📦","Catalog",null,"active"],
            ["📂","Categories",null],
            ["📊","Stock & Inventory","6","warn"],
            ["💳","Payments",null],
          ].map(([i,l,b,state],k)=>(
            <div key={k} style={{display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:6, background: state==="active" ? "color-mix(in srgb, var(--gold) 16%, transparent)" : "transparent", color: state==="active" ? "var(--gold)" : "#dac6a8", fontWeight: state==="active" ? 600 : 400, fontSize:13, marginBottom:2}}>
              <span>{i}</span>
              <span style={{flex:1}}>{l}</span>
              {b && <span style={{padding:"1px 7px", borderRadius:99, fontSize:10, fontWeight:600, background: state==="warn" ? "var(--danger)" : "var(--accent)", color:"#fff"}}>{b}</span>}
            </div>
          ))}
        </div>

        <div style={{padding:"14px 14px 6px"}}>
          <div style={{fontSize:9, letterSpacing:".18em", textTransform:"uppercase", color:"#8a7860", padding:"0 8px", marginBottom:8}}>Analyse</div>
          {[
            ["📈","Sales analytics"],
            ["🌐","Traffic"],
            ["👤","Customers"],
            ["🎟","Coupons"],
            ["🏬","Outlets"],
          ].map(([i,l],k)=>(
            <div key={k} style={{display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:6, color:"#dac6a8", fontSize:13, marginBottom:2}}>
              <span>{i}</span>
              <span>{l}</span>
            </div>
          ))}
        </div>

        <div style={{marginTop:"auto", padding:"14px 18px", borderTop:"1px solid #3a2a1a", display:"flex", gap:10, alignItems:"center"}}>
          <div style={{width:32, height:32, borderRadius:"50%", background:"var(--accent)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13}}>RK</div>
          <div>
            <div style={{fontSize:12, fontWeight:600, color:"#fdfaf2"}}>Ramesh Kumar</div>
            <div style={{fontSize:10, opacity:.6}}>Owner · since 1987</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{padding:"24px 32px", overflow:"hidden", background:"var(--bg)"}}>
        <header style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22}}>
          <div>
            <div className="eyebrow">Tuesday · 12 May 2026</div>
            <h1 className="disp" style={{fontSize:34, fontStyle:"italic", margin:"4px 0 0"}}>Good morning, Ramesh ji</h1>
          </div>
          <div style={{display:"flex", gap:10, alignItems:"center"}}>
            <div style={{position:"relative"}}>
              <input className="input" placeholder="Search products, orders, customers…" style={{paddingLeft:38, width:300, padding:"10px 12px 10px 38px"}}/>
              <span style={{position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--ink-3)"}}><IconAd.search/></span>
            </div>
            <button className="btn btn-sm">+ New product</button>
          </div>
        </header>

        {/* KPI ROW */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:14, marginBottom:18}}>
          {[
            ["Revenue · today", <RupeeAd v={84230} key="r"/>, "+12.4%", "var(--ok)"],
            ["Orders · today", "67", "+8 vs avg", "var(--ok)"],
            ["AOV", <RupeeAd v={1257} key="a"/>, "+4.1%", "var(--ok)"],
            ["Cart abandonment", "23.4%", "−2.1%", "var(--ok)"],
          ].map(([l, v, d, c], k)=>(
            <div key={k} className="card" style={{padding:16}}>
              <div className="eyebrow">{l}</div>
              <div className="disp" style={{fontSize:30, margin:"6px 0 4px"}}>{v}</div>
              <div style={{fontSize:11, color:c, fontWeight:600}}>{d} vs last week</div>
            </div>
          ))}
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:14, marginBottom:18}}>
          {/* Sales chart */}
          <div className="card" style={{padding:18}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"start", marginBottom:12}}>
              <div>
                <div className="eyebrow">Sales · last 14 days</div>
                <div className="disp" style={{fontSize:24, marginTop:4}}><RupeeAd v={9_82_400}/></div>
              </div>
              <div style={{display:"flex", gap:6, fontSize:11}}>
                {["7D","14D","30D","90D"].map((p,i)=>(
                  <span key={p} style={{padding:"5px 10px", borderRadius:99, background: i===1 ? "var(--ink)" : "transparent", color: i===1 ? "#fff" : "var(--ink-2)", fontWeight: i===1 ? 600 : 400, cursor:"pointer", border:"1px solid var(--rule)"}}>{p}</span>
                ))}
              </div>
            </div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width:"100%", height:130}}>
              <defs>
                <linearGradient id="salesfill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity=".22"/>
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <polygon points={`0,100 ${pts} 100,100`} fill="url(#salesfill)"/>
              <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="0.6" vectorEffect="non-scaling-stroke"/>
              {DATA_AD.sales14d.map((v,i)=>(
                <circle key={i} cx={(i/(DATA_AD.sales14d.length-1))*100} cy={100-(v/max)*90} r="0.6" fill="var(--accent)" vectorEffect="non-scaling-stroke"/>
              ))}
            </svg>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:10, color:"var(--ink-3)", marginTop:6}}>
              <span>Apr 28</span><span>May 5</span><span>May 12</span>
            </div>
          </div>

          {/* Traffic sources */}
          <div className="card" style={{padding:18}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"start", marginBottom:12}}>
              <div>
                <div className="eyebrow">Traffic sources · 7d</div>
                <div className="disp" style={{fontSize:24, marginTop:4}}>12,442 sessions</div>
              </div>
              <span className="chip">Live</span>
            </div>
            <div style={{display:"flex", height:10, borderRadius:99, overflow:"hidden", marginBottom:14}}>
              {DATA_AD.trafficSrc.map((t,i)=>(
                <div key={i} style={{width:`${t.v}%`, background:t.color}}/>
              ))}
            </div>
            {DATA_AD.trafficSrc.map((t,i)=>(
              <div key={i} style={{display:"flex", alignItems:"center", gap:10, fontSize:12, padding:"5px 0"}}>
                <span style={{width:9, height:9, borderRadius:2, background:t.color}}/>
                <span style={{flex:1, color:"var(--ink-2)"}}>{t.label}</span>
                <span style={{fontWeight:600}}>{t.v}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* CATALOG */}
        <div className="card" style={{padding:0, overflow:"hidden", marginBottom:18}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 18px", borderBottom:"1px solid var(--rule)"}}>
            <div>
              <div className="eyebrow">Catalog · 257 active SKUs</div>
              <div className="disp" style={{fontSize:20, fontStyle:"italic", marginTop:2}}>Manage products &amp; stock</div>
            </div>
            <div style={{display:"flex", gap:8, alignItems:"center"}}>
              <span style={{display:"flex", gap:6, fontSize:11}}>
                {["All","Sweets","Namkeen","Hampers","Low stock"].map((f,i)=>(
                  <span key={f} style={{padding:"5px 10px", borderRadius:99, background: i===0 ? "var(--ink)" : "var(--bg-sub)", color: i===0 ? "#fff" : "var(--ink-2)", fontWeight: i===0 ? 600 : 400}}>{f}</span>
                ))}
              </span>
              <button className="btn btn-ghost btn-sm">Export</button>
              <button className="btn btn-sm">+ Add</button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th style={{width:36}}><input type="checkbox"/></th>
                <th style={{width:280}}>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Views · 7d</th>
                <th>Sold · 30d</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {DATA_AD.sweets.map((s,i) => {
                const lowStock = s.stock < 15;
                const views = [1820, 2104, 1488, 944, 3211, 612][i] || 800;
                return (
                  <tr key={s.id}>
                    <td><input type="checkbox"/></td>
                    <td>
                      <div style={{display:"flex", gap:12, alignItems:"center"}}>
                        <div className="tile" style={{width:40, height:40}}><img src={s.img} alt=""/></div>
                        <div>
                          <div style={{fontWeight:600, fontSize:13}}>{s.en}</div>
                          <div className="hindi" style={{fontSize:11, color:"var(--ink-3)"}}>{s.hi} · {s.unit}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="chip">Sweets</span></td>
                    <td>
                      <div style={{fontWeight:600}}><RupeeAd v={s.price}/></div>
                      <div style={{fontSize:10, color:"var(--ink-3)", textDecoration:"line-through"}}>₹{s.mrp}</div>
                    </td>
                    <td>
                      <div style={{display:"flex", alignItems:"center", gap:8}}>
                        <span className={`dot ${lowStock? "dot-low" : "dot-ok"}`}/>
                        <span style={{fontWeight:600, color: lowStock ? "var(--danger)" : "var(--ink)"}}>{s.stock}</span>
                        <span style={{color:"var(--ink-3)", fontSize:11}}>kg</span>
                      </div>
                    </td>
                    <td>
                      <div style={{fontWeight:600}}>{views.toLocaleString("en-IN")}</div>
                      <div style={{height:4, background:"var(--bg-sub)", borderRadius:99, marginTop:4, overflow:"hidden"}}><div style={{width:`${(views/3500)*100}%`, height:"100%", background:"var(--gold)"}}/></div>
                    </td>
                    <td><strong>{s.sold}</strong> <span style={{color:"var(--ink-3)", fontSize:11}}>kg</span></td>
                    <td>
                      <span style={{display:"inline-flex", alignItems:"center", gap:6, fontSize:11, color: lowStock ? "var(--danger)" : "var(--ok)", fontWeight:600}}>
                        ● {lowStock ? "Reorder" : "Live"}
                      </span>
                    </td>
                    <td style={{textAlign:"right"}}>
                      <span style={{display:"inline-flex", gap:10, color:"var(--ink-3)"}}>
                        <IconAd.edit/> <IconAd.trash/>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom row: top pages + customers */}
        <div style={{display:"grid", gridTemplateColumns:"1.2fr 1.6fr", gap:14}}>
          <div className="card" style={{padding:18}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:12}}>
              <div>
                <div className="eyebrow">Top pages · 7d</div>
                <div className="disp" style={{fontSize:18, fontStyle:"italic", marginTop:2}}>Where they linger</div>
              </div>
              <span style={{fontSize:11, color:"var(--accent)", fontWeight:600}}>Full funnel →</span>
            </div>
            {DATA_AD.topPages.map((p, i)=>{
              const maxV = DATA_AD.topPages[0].v;
              return (
                <div key={p.p} style={{padding:"10px 0", borderBottom: i<DATA_AD.topPages.length-1 ? "1px solid var(--rule)" : "none"}}>
                  <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5}}>
                    <span style={{fontFamily:"ui-monospace, monospace", color:"var(--ink)"}}>{p.p}</span>
                    <span><strong>{p.v.toLocaleString("en-IN")}</strong> <span style={{color:"var(--ink-3)"}}> · avg {p.t}</span></span>
                  </div>
                  <div className="bar"><i style={{width:`${(p.v/maxV)*100}%`}}/></div>
                </div>
              );
            })}
          </div>

          <div className="card" style={{padding:18}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:12}}>
              <div>
                <div className="eyebrow">Customers · top by LTV</div>
                <div className="disp" style={{fontSize:18, fontStyle:"italic", marginTop:2}}>2,442 repeat buyers</div>
              </div>
              <button className="btn btn-ghost btn-sm">All customers</button>
            </div>
            <table className="table">
              <thead>
                <tr><th>Customer</th><th>Phone</th><th>Orders</th><th>LTV</th><th>Last</th><th>Segment</th></tr>
              </thead>
              <tbody>
                {DATA_AD.customers.slice(0,5).map(c=>(
                  <tr key={c.phone}>
                    <td><strong>{c.name}</strong></td>
                    <td style={{color:"var(--ink-2)"}}>{c.phone}</td>
                    <td>{c.orders}</td>
                    <td><strong><RupeeAd v={c.ltv}/></strong></td>
                    <td style={{color:"var(--ink-3)"}}>{c.last}</td>
                    <td>
                      <span className={`chip ${c.segment==="VIP" ? "chip-gold" : c.segment==="Loyal" ? "chip-leaf" : c.segment==="At-risk" ? "chip-berry" : ""}`}>{c.segment}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

window.AdminA = AdminA;
