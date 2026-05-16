// Direction B — Admin dashboard (Saffron Modern)
// Focus on analytics / funnel / customers + catalog table

const { Icon: IconAdB, Rupee: RupeeAdB } = window.BBShared;
const DATA_ADB = window.BB_DATA;

function AdminB() {
  const max = Math.max(...DATA_ADB.sales14d);
  const pts = DATA_ADB.sales14d
    .map((v, i) => `${(i / (DATA_ADB.sales14d.length - 1)) * 100},${100 - (v / max) * 88}`)
    .join(" ");
  const maxFunnel = DATA_ADB.funnel[0].v;

  return (
    <div className="artboard dir-b" data-screen-label="B · Admin" style={{display:"grid", gridTemplateColumns:"220px 1fr", height:"100%"}}>
      {/* SIDEBAR — light */}
      <aside style={{background:"var(--paper)", borderRight:"1px solid var(--rule)", padding:"22px 0", display:"flex", flexDirection:"column"}}>
        <div style={{padding:"0 20px 22px"}}>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <svg width="34" height="34" viewBox="0 0 34 34">
              <circle cx="17" cy="17" r="16" fill="var(--accent)"/>
              <text x="17" y="22" textAnchor="middle" fontFamily="DM Serif Display, Georgia, serif" fontSize="16" fill="#fff">B</text>
            </svg>
            <div>
              <div className="disp" style={{fontSize:15}}>Bangali</div>
              <div style={{fontSize:9, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".15em"}}>Admin · Bhind</div>
            </div>
          </div>
        </div>

        <div style={{padding:"0 12px"}}>
          {[
            ["section","Operate"],
            ["📊","Overview","",true],
            ["📥","Orders","42","badge"],
            ["📦","Catalog"],
            ["📂","Categories"],
            ["💳","Payments"],
            ["section","Grow"],
            ["📈","Sales analytics"],
            ["🌐","Traffic & funnel"],
            ["👤","Customers","2.4k"],
            ["🎟","Coupons"],
            ["section","Setup"],
            ["🏬","Outlets"],
            ["⚙","Settings"],
          ].map((row,k)=>{
            if(row[0]==="section") return <div key={k} style={{fontSize:9, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".18em", padding:"14px 10px 6px"}}>{row[1]}</div>;
            const [i, l, b, active] = row;
            return (
              <div key={k} style={{display:"flex", alignItems:"center", gap:10, padding:"9px 10px", borderRadius:10, background: active ? "var(--ink)" : "transparent", color: active ? "#fff" : "var(--ink-2)", fontWeight: active ? 600 : 500, fontSize:13, marginBottom:2, cursor:"pointer"}}>
                <span style={{width:18}}>{i}</span>
                <span style={{flex:1}}>{l}</span>
                {b && <span className="badge-pill" style={{background:"color-mix(in srgb, var(--accent) 14%, transparent)", color:"var(--accent)", border:"none", padding:"1px 8px", fontSize:10, fontWeight:600}}>{b}</span>}
              </div>
            );
          })}
        </div>

        <div style={{marginTop:"auto", padding:"14px 18px", borderTop:"1px solid var(--rule)", display:"flex", gap:10, alignItems:"center"}}>
          <div style={{width:32, height:32, borderRadius:10, background:"var(--gold)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13}}>RK</div>
          <div style={{flex:1}}>
            <div style={{fontSize:12, fontWeight:600}}>Ramesh Kumar</div>
            <div style={{fontSize:10, color:"var(--ink-3)"}}>Owner</div>
          </div>
          <span style={{color:"var(--ink-3)"}}>⋯</span>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{padding:"22px 28px", overflow:"hidden", background:"var(--bg)"}}>
        <header style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18}}>
          <div>
            <div style={{display:"flex", gap:8, alignItems:"center", fontSize:11, color:"var(--ink-3)"}}>
              <span>Overview</span> <span>›</span> <span>Tuesday, 12 May 2026</span>
            </div>
            <h1 className="disp" style={{fontSize:32, margin:"4px 0 0"}}>Dashboard</h1>
          </div>
          <div style={{display:"flex", gap:10, alignItems:"center"}}>
            <span className="badge-pill" style={{background:"var(--paper)", borderColor:"var(--rule)"}}>Last 7 days ▾</span>
            <span className="badge-pill" style={{background:"var(--paper)", borderColor:"var(--rule)"}}>All outlets ▾</span>
            <button className="btn btn-sm" style={{borderRadius:99}}>+ New product</button>
          </div>
        </header>

        {/* KPI ROW */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:12, marginBottom:14}}>
          {[
            ["Revenue · 7d", <RupeeAdB v={482400} key="r"/>, "+18%", "📈"],
            ["Orders · 7d", "412", "+11%", "📥"],
            ["AOV", <RupeeAdB v={1170} key="a"/>, "+6.2%", "💰"],
            ["Conversion", "7.8%", "+1.4pp", "🎯"],
          ].map(([l, v, d, icon], k)=>(
            <div key={k} className="card" style={{padding:16, display:"flex", gap:12, alignItems:"start"}}>
              <div style={{width:38, height:38, borderRadius:10, background:"color-mix(in srgb, var(--accent) 12%, transparent)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18}}>{icon}</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:11, color:"var(--ink-3)"}}>{l}</div>
                <div className="disp" style={{fontSize:24, margin:"3px 0 2px"}}>{v}</div>
                <div style={{fontSize:11, color:"var(--ok)", fontWeight:600, display:"flex", alignItems:"center", gap:4}}>↑ {d} vs prior 7d</div>
              </div>
            </div>
          ))}
        </div>

        {/* Sales chart + Funnel */}
        <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:12, marginBottom:14}}>
          <div className="card" style={{padding:18}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"start", marginBottom:14}}>
              <div>
                <div style={{fontSize:11, color:"var(--ink-3)"}}>Revenue trend</div>
                <div className="disp" style={{fontSize:24, marginTop:4}}><RupeeAdB v={9_82_400}/></div>
                <div style={{fontSize:11, color:"var(--ok)", marginTop:2}}>↑ 18% · ₹1.49L more than last period</div>
              </div>
              <div style={{display:"flex", gap:6, fontSize:11}}>
                {["7D","14D","30D","90D","1Y"].map((p,i)=>(
                  <span key={p} className="badge-pill" style={{background: i===1 ? "var(--ink)" : "var(--paper)", color: i===1 ? "#fff" : "var(--ink-2)", border: i===1 ? "1px solid var(--ink)" : "1px solid var(--rule)", fontWeight: i===1 ? 600 : 500, cursor:"pointer", fontSize:10}}>{p}</span>
                ))}
              </div>
            </div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width:"100%", height:160}}>
              <defs>
                <linearGradient id="bfill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity=".25"/>
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {[20,40,60,80].map(y => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="var(--rule)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" strokeDasharray="0.8 1.6"/>)}
              <polygon points={`0,100 ${pts} 100,100`} fill="url(#bfill)"/>
              <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="0.7" vectorEffect="non-scaling-stroke" strokeLinejoin="round"/>
              {DATA_ADB.sales14d.map((v,i)=>(
                <circle key={i} cx={(i/(DATA_ADB.sales14d.length-1))*100} cy={100-(v/max)*88} r="0.8" fill="#fff" stroke="var(--accent)" strokeWidth="0.6" vectorEffect="non-scaling-stroke"/>
              ))}
            </svg>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:10, color:"var(--ink-3)", marginTop:6}}>
              <span>Apr 28</span><span>Apr 30</span><span>May 2</span><span>May 4</span><span>May 6</span><span>May 8</span><span>May 10</span><span>May 12</span>
            </div>
          </div>

          {/* Funnel */}
          <div className="card" style={{padding:18}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"start", marginBottom:14}}>
              <div>
                <div style={{fontSize:11, color:"var(--ink-3)"}}>Checkout funnel · 7d</div>
                <div className="disp" style={{fontSize:24, marginTop:4}}>7.8% overall</div>
              </div>
              <span className="badge-pill" style={{background:"color-mix(in srgb, var(--ok) 12%, transparent)", color:"var(--ok)", border:"none", fontWeight:600}}>↑ healthy</span>
            </div>
            {DATA_ADB.funnel.map((f, i)=>{
              const pct = (f.v/maxFunnel)*100;
              const drop = i>0 ? Math.round((1 - f.v/DATA_ADB.funnel[i-1].v)*100) : 0;
              return (
                <div key={f.step} style={{marginBottom:8}}>
                  <div style={{display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4}}>
                    <span style={{color:"var(--ink-2)", fontWeight:500}}>{f.step}</span>
                    <span><strong>{f.v.toLocaleString("en-IN")}</strong> {i>0 && <span style={{color:"var(--ink-3)"}}>(−{drop}%)</span>}</span>
                  </div>
                  <div style={{height:18, background:"var(--bg-sub)", borderRadius:6, overflow:"hidden", position:"relative"}}>
                    <div style={{width:`${pct}%`, height:"100%", background:`linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 70%, var(--gold)))`, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:8, color:"#fff", fontSize:9, fontWeight:600}}>
                      {Math.round(pct)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Traffic + Top items */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:12, marginBottom:14}}>
          <div className="card" style={{padding:18}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:14}}>
              <div>
                <div style={{fontSize:11, color:"var(--ink-3)"}}>Traffic sources · 7d</div>
                <div className="disp" style={{fontSize:22, marginTop:4}}>12,442</div>
                <div style={{fontSize:10, color:"var(--ink-3)"}}>sessions</div>
              </div>
              <div style={{position:"relative", width:100, height:100}}>
                <svg viewBox="0 0 36 36" style={{transform:"rotate(-90deg)"}}>
                  {(() => {
                    let acc = 0;
                    return DATA_ADB.trafficSrc.map((t, i) => {
                      const dash = `${(t.v/100)*100} 100`;
                      const offset = -acc;
                      acc += (t.v/100)*100;
                      return <circle key={i} cx="18" cy="18" r="15.9" fill="none" stroke={t.color} strokeWidth="4" strokeDasharray={dash} strokeDashoffset={offset} pathLength="100"/>;
                    });
                  })()}
                </svg>
                <div style={{position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                  <div className="disp" style={{fontSize:18}}>38%</div>
                  <div style={{fontSize:9, color:"var(--ink-3)"}}>Direct</div>
                </div>
              </div>
            </div>
            {DATA_ADB.trafficSrc.map((t,i)=>(
              <div key={i} style={{display:"flex", alignItems:"center", gap:10, fontSize:12, padding:"5px 0", borderBottom: i<DATA_ADB.trafficSrc.length-1 ? "1px solid var(--rule)" : "none"}}>
                <span style={{width:9, height:9, borderRadius:3, background:t.color}}/>
                <span style={{flex:1}}>{t.label}</span>
                <span><strong>{t.v}%</strong> <span style={{color:"var(--ink-3)"}}>· {Math.round(12442*t.v/100).toLocaleString("en-IN")}</span></span>
              </div>
            ))}
          </div>

          <div className="card" style={{padding:18}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:12}}>
              <div>
                <div style={{fontSize:11, color:"var(--ink-3)"}}>Top pages · 7d</div>
                <div className="disp" style={{fontSize:22, marginTop:4}}>Where they linger</div>
              </div>
              <span className="badge-pill" style={{background:"var(--paper)"}}>Page views ▾</span>
            </div>
            <table className="table">
              <thead><tr><th>Page</th><th>Views</th><th>Avg time</th><th>Bounce</th><th>Conv.</th></tr></thead>
              <tbody>
                {DATA_ADB.topPages.map((p, i)=>{
                  const bounce = [22, 31, 18, 28, 14, 64][i];
                  const conv = [8.2, 12.4, 9.8, 6.1, 14.7, 0.4][i];
                  return (
                    <tr key={p.p}>
                      <td style={{fontFamily:"ui-monospace, monospace", fontSize:11}}>{p.p}</td>
                      <td><strong>{p.v.toLocaleString("en-IN")}</strong></td>
                      <td style={{color:"var(--ink-3)"}}>{p.t}</td>
                      <td>{bounce}%</td>
                      <td><strong style={{color:"var(--ok)"}}>{conv}%</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* CATALOG TABLE */}
        <div className="card" style={{padding:0, overflow:"hidden", marginBottom:14}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", borderBottom:"1px solid var(--rule)"}}>
            <div>
              <div style={{fontSize:11, color:"var(--ink-3)"}}>Catalog</div>
              <div className="disp" style={{fontSize:20, marginTop:2}}>Products &amp; stock</div>
            </div>
            <div style={{display:"flex", gap:6, alignItems:"center"}}>
              {["All · 257","Sweets · 84","Namkeen · 42","Hampers · 17","Low stock · 6"].map((f,i)=>(
                <span key={f} className="badge-pill" style={{background: i===0 ? "var(--ink)" : "var(--paper)", color: i===0 ? "#fff" : "var(--ink-2)", border: i===0 ? "1px solid var(--ink)" : "1px solid var(--rule)", fontSize:11, fontWeight: i===0 ? 600 : 500, cursor:"pointer"}}>{f}</span>
              ))}
              <button className="btn btn-sm" style={{borderRadius:99, marginLeft:8}}>+ Add product</button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th style={{width:36}}><input type="checkbox"/></th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Views · 7d</th>
                <th>Conv.</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {DATA_ADB.sweets.map((s,i) => {
                const lowStock = s.stock < 15;
                const views = [1820, 2104, 1488, 944, 3211, 612][i] || 800;
                const conv = [6.8, 8.4, 7.2, 4.1, 12.4, 5.6][i];
                return (
                  <tr key={s.id}>
                    <td><input type="checkbox"/></td>
                    <td>
                      <div style={{display:"flex", gap:12, alignItems:"center"}}>
                        <div className="tile" style={{width:44, height:44, borderRadius:10}}><img src={s.img} alt=""/></div>
                        <div>
                          <div style={{fontWeight:600, fontSize:13}}>{s.en}</div>
                          <div className="hindi" style={{fontSize:11, color:"var(--ink-3)"}}>{s.hi} · {s.unit}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge-pill" style={{borderColor:"var(--rule)", background:"var(--bg-sub)", border:"none"}}>Sweets</span></td>
                    <td>
                      <div style={{fontWeight:600}}><RupeeAdB v={s.price}/></div>
                      <div style={{fontSize:10, color:"var(--ink-3)", textDecoration:"line-through"}}>₹{s.mrp}</div>
                    </td>
                    <td>
                      <div style={{display:"flex", alignItems:"center", gap:8}}>
                        <span className={`dot ${lowStock? "dot-low" : "dot-ok"}`}/>
                        <span style={{fontWeight:600, color: lowStock ? "var(--danger)" : "var(--ink)"}}>{s.stock} kg</span>
                      </div>
                    </td>
                    <td>
                      <div style={{display:"flex", alignItems:"center", gap:8}}>
                        <strong>{views.toLocaleString("en-IN")}</strong>
                        <svg width="40" height="14" viewBox="0 0 40 14">
                          <polyline points={`0,${10-Math.random()*6} 10,${10-Math.random()*7} 20,${4-Math.random()*2} 30,${6-Math.random()*4} 40,${2}`} fill="none" stroke="var(--gold)" strokeWidth="1.4"/>
                        </svg>
                      </div>
                    </td>
                    <td><strong style={{color:"var(--ok)"}}>{conv}%</strong></td>
                    <td>
                      <span style={{display:"inline-flex", alignItems:"center", gap:6, fontSize:11, padding:"3px 10px", borderRadius:99, background: lowStock ? "color-mix(in srgb, var(--danger) 14%, transparent)" : "color-mix(in srgb, var(--ok) 12%, transparent)", color: lowStock ? "var(--danger)" : "var(--ok)", fontWeight:600}}>
                        ● {lowStock ? "Reorder" : "Live"}
                      </span>
                    </td>
                    <td style={{textAlign:"right"}}>
                      <span style={{display:"inline-flex", gap:10, color:"var(--ink-3)"}}>
                        <IconAdB.edit/> ⋯
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Customers + Live orders */}
        <div style={{display:"grid", gridTemplateColumns:"1.6fr 1fr", gap:12}}>
          <div className="card" style={{padding:18}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:12}}>
              <div>
                <div style={{fontSize:11, color:"var(--ink-3)"}}>Customers · top by LTV</div>
                <div className="disp" style={{fontSize:20, marginTop:2}}>2,442 repeat buyers</div>
              </div>
              <div style={{display:"flex", gap:6, fontSize:11}}>
                {["All","VIP","Loyal","At-risk"].map((s,i)=>(
                  <span key={s} className="badge-pill" style={{background: i===0 ? "var(--ink)" : "var(--paper)", color: i===0 ? "#fff" : "var(--ink-2)", border: i===0 ? "1px solid var(--ink)" : "1px solid var(--rule)"}}>{s}</span>
                ))}
              </div>
            </div>
            <table className="table">
              <thead>
                <tr><th>Customer</th><th>Orders</th><th>LTV</th><th>Last</th><th>Segment</th></tr>
              </thead>
              <tbody>
                {DATA_ADB.customers.slice(0,5).map(c=>(
                  <tr key={c.phone}>
                    <td>
                      <div style={{display:"flex", gap:10, alignItems:"center"}}>
                        <div style={{width:32, height:32, borderRadius:"50%", background:"color-mix(in srgb, var(--accent) 14%, transparent)", color:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700}}>{c.name.split(" ").map(p=>p[0]).join("")}</div>
                        <div>
                          <div style={{fontWeight:600, fontSize:13}}>{c.name}</div>
                          <div style={{fontSize:10, color:"var(--ink-3)"}}>{c.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td><strong>{c.orders}</strong></td>
                    <td><strong><RupeeAdB v={c.ltv}/></strong></td>
                    <td style={{color:"var(--ink-3)"}}>{c.last}</td>
                    <td>
                      <span className="badge-pill" style={{background: c.segment==="VIP" ? "var(--gold)" : c.segment==="Loyal" ? "color-mix(in srgb, var(--leaf) 14%, transparent)" : c.segment==="At-risk" ? "color-mix(in srgb, var(--danger) 14%, transparent)" : "var(--bg-sub)", color: c.segment==="VIP" ? "#fff" : c.segment==="Loyal" ? "var(--leaf)" : c.segment==="At-risk" ? "var(--danger)" : "var(--ink-2)", border:"none", fontSize:10, fontWeight:600}}>
                        {c.segment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card" style={{padding:18}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:12}}>
              <div>
                <div style={{fontSize:11, color:"var(--ink-3)"}}>Live orders queue</div>
                <div className="disp" style={{fontSize:20, marginTop:2}}>42 orders today</div>
              </div>
              <span className="badge-pill" style={{background:"color-mix(in srgb, var(--accent) 14%, transparent)", color:"var(--accent)", border:"none", fontWeight:600}}>● Live</span>
            </div>
            {[
              ["#BS-04812", "Anjali V.", 3435, "Packing", "var(--accent)"],
              ["#BS-04811", "Vikas G.", 2199, "Out for delivery", "var(--gold)"],
              ["#BS-04810", "Priya S.",  899, "Delivered", "var(--ok)"],
              ["#BS-04809", "Rohit S.", 4290, "Packing", "var(--accent)"],
              ["#BS-04808", "Meena T.",  549, "Ready · Pickup", "var(--leaf)"],
            ].map((o,i)=>(
              <div key={i} style={{display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom: i<4 ? "1px solid var(--rule)" : "none"}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:13, fontWeight:600, fontFamily:"ui-monospace, monospace"}}>{o[0]}</div>
                  <div style={{fontSize:11, color:"var(--ink-3)"}}>{o[1]} · 5 min ago</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div className="disp" style={{fontSize:15}}><RupeeAdB v={o[2]}/></div>
                  <div style={{fontSize:10, color:o[4], fontWeight:600}}>● {o[3]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

window.AdminB = AdminB;
