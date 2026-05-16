// Direction B — Home (Saffron Modern)
// Contemporary, more whitespace, bigger imagery, softer rounded UI

const { Icon: IconB, Rupee: RupeeB } = window.BBShared;
const DATA_B = window.BB_DATA;

function HomeB() {
  return (
    <div className="artboard dir-b" data-screen-label="B · Home">
      {/* Slim top promo */}
      <div style={{background:"var(--ink)", color:"#fbf7ee", fontSize:12, padding:"8px 48px", display:"flex", justifyContent:"space-between"}}>
        <span>🚚 Same-day Bhind delivery · before 4 PM</span>
        <span>Track Order · Bulk Orders · WhatsApp 📞 0797 4096 667</span>
      </div>

      {/* Header */}
      <header style={{padding:"22px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"var(--paper)", borderBottom:"1px solid var(--rule)"}}>
        <div style={{display:"flex", alignItems:"center", gap:14}}>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="21" fill="var(--accent)"/>
            <circle cx="22" cy="22" r="18" fill="none" stroke="var(--gold)" strokeWidth="0.6"/>
            <text x="22" y="29" textAnchor="middle" fontFamily="DM Serif Display, Georgia, serif" fontSize="22" fill="#fff">B</text>
          </svg>
          <div>
            <div className="disp" style={{fontSize:24, lineHeight:1}}>Bangali Sweets</div>
            <div className="hindi" style={{fontSize:12, color:"var(--ink-3)", marginTop:3}}>बंगाली स्वीट्स · est. 1987 · Bhind</div>
          </div>
        </div>
        <nav style={{display:"flex", gap:6, alignItems:"center"}}>
          {["Sweets","Namkeen","Dry Fruits","Hampers","Bakery","Dairy","Birthday"].map((l,i)=>(
            <span key={l} className="badge-pill" style={{background: i===3 ? "var(--ink)" : "var(--paper)", color: i===3 ? "var(--paper)" : "var(--ink-2)", border: i===3 ? "1px solid var(--ink)" : "1px solid var(--rule)", cursor:"pointer"}}>
              {l}
            </span>
          ))}
        </nav>
        <div style={{display:"flex", alignItems:"center", gap:14}}>
          <IconB.search/>
          <IconB.user/>
          <span className="badge-pill" style={{background:"var(--accent)", color:"#fff", border:"none", fontWeight:600}}>
            <IconB.bag/> 3 · ₹3,435
          </span>
        </div>
      </header>

      {/* HERO — magazine-style */}
      <section className="warm-grad-b" style={{padding:"40px 48px 48px"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:36, alignItems:"stretch", minHeight:520}}>
          {/* Left: huge headline */}
          <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <div>
              <span className="badge-pill" style={{background:"color-mix(in srgb, var(--accent) 12%, transparent)", color:"var(--accent)", border:"none", fontWeight:600}}>
                ✦ Diwali 2026 · Pre-order open
              </span>
              <h1 className="disp" style={{fontSize:96, lineHeight:0.92, margin:"22px 0 0", letterSpacing:"-0.02em"}}>
                Hampers<br/>
                for every<br/>
                <span style={{color:"var(--accent)"}}>celebration.</span>
              </h1>
              <p className="hindi" style={{fontSize:22, color:"var(--ink-2)", marginTop:18}}>
                हर ख़ुशी के लिए, एक मीठा बहाना
              </p>
            </div>
            <div>
              <p style={{fontSize:15, color:"var(--ink-2)", lineHeight:1.7, maxWidth:460, marginBottom:24}}>
                Three generations of Bhind&apos;s favourite mithai, packed into keepsake brass-trimmed boxes. Same-day delivery in Bhind, fresh shipping across India.
              </p>
              <div style={{display:"flex", gap:12, alignItems:"center"}}>
                <button className="btn btn-lg" style={{borderRadius:99}}>Shop hampers <IconB.arrow/></button>
                <button className="btn btn-ghost btn-lg" style={{borderRadius:99}}>Build your box</button>
              </div>
              <div style={{display:"flex", gap:28, marginTop:30, fontSize:12, color:"var(--ink-3)"}}>
                <span>🚚 Free delivery ₹999+</span>
                <span>🥛 100% pure-veg</span>
                <span>📦 Pan-India shipping</span>
              </div>
            </div>
          </div>

          {/* Right: big image with quick-buy hampers */}
          <div style={{position:"relative", borderRadius:"var(--radius-lg)", overflow:"hidden", background:"var(--accent)"}}>
            <img src={DATA_B.hampers[0].img} alt="" style={{width:"100%", height:"100%", objectFit:"cover", opacity:.95}}/>
            <div style={{position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 40%, rgba(15,8,5,.7))"}}/>
            <div style={{position:"absolute", top:20, left:20, display:"flex", gap:8}}>
              <span className="badge-pill" style={{background:"#fff", color:"var(--ink)", border:"none", fontWeight:600}}>★ Bestseller hamper</span>
            </div>
            <div style={{position:"absolute", bottom:24, left:24, right:24, color:"#fff"}}>
              <div className="hindi" style={{fontSize:14, opacity:.9}}>हेरिटेज बॉक्स</div>
              <div className="disp" style={{fontSize:38, lineHeight:1, margin:"4px 0 10px"}}>The Heritage Box</div>
              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <div>
                  <div style={{fontSize:11, opacity:.8, textTransform:"uppercase", letterSpacing:".12em"}}>9 mithai · 500g</div>
                  <div className="disp" style={{fontSize:26, marginTop:4}}><RupeeB v={1499}/> <span style={{fontSize:13, textDecoration:"line-through", opacity:.7}}>₹1799</span></div>
                </div>
                <button className="btn btn-gold btn-sm" style={{borderRadius:99}}>Add to bag →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY ROW — large rounded pills with hero images */}
      <section style={{padding:"48px 48px 12px"}}>
        <div style={{display:"flex", alignItems:"end", justifyContent:"space-between", marginBottom:20}}>
          <div>
            <span className="badge-pill" style={{background:"var(--paper)", color:"var(--ink-3)", fontWeight:500}}>Categories</span>
            <h2 className="disp" style={{fontSize:46, margin:"12px 0 0"}}>Shop by craving</h2>
          </div>
          <span style={{fontSize:13, fontWeight:600, color:"var(--accent)"}}>View all 257 items →</span>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:14}}>
          {DATA_B.categories.map((c, i)=>(
            <div key={c.slug}>
              <div className="tile" style={{aspectRatio:"4/5", borderRadius:"var(--radius-lg)"}}>
                <img src={c.hero} alt=""/>
                <div style={{position:"absolute", inset:"auto 0 0 0", padding:"16px 14px 14px", color:"#fff", background:"linear-gradient(180deg, transparent, rgba(15,8,5,.78))"}}>
                  <div className="hindi" style={{fontSize:13, opacity:.9}}>{c.hi}</div>
                  <div className="disp" style={{fontSize:18, lineHeight:1.1, marginTop:2}}>{c.en}</div>
                </div>
                <span className="badge-pill" style={{position:"absolute", top:10, right:10, background:"#fff", border:"none", fontSize:10, fontWeight:600, padding:"3px 8px"}}>{c.items}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HAMPERS GRID */}
      <section style={{padding:"56px 48px"}}>
        <div style={{display:"flex", alignItems:"end", justifyContent:"space-between", marginBottom:24}}>
          <div>
            <span className="badge-pill" style={{color:"var(--accent)", borderColor:"color-mix(in srgb, var(--accent) 24%, var(--rule))"}}>The hamper edit</span>
            <h2 className="disp" style={{fontSize:46, margin:"12px 0 0"}}>Built to be gifted</h2>
          </div>
          <div style={{display:"flex", gap:8}}>
            {["All","Diwali","Rakhi","Corporate","Wedding"].map((t,i)=>(
              <span key={t} className="badge-pill" style={{background: i===0 ? "var(--ink)" : "var(--paper)", color: i===0 ? "var(--paper)" : "var(--ink-2)", border: i===0 ? "1px solid var(--ink)" : "1px solid var(--rule)", cursor:"pointer"}}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:20}}>
          {DATA_B.hampers.map(h => (
            <article key={h.id}>
              <div className="tile" style={{aspectRatio:"4/5", borderRadius:"var(--radius-lg)", marginBottom:14}}>
                <img src={h.img} alt=""/>
                <span className="badge-pill" style={{position:"absolute", top:14, left:14, background:"#fff", border:"none", fontSize:10, fontWeight:700, padding:"4px 10px"}}>{h.tag}</span>
                <button style={{position:"absolute", bottom:14, right:14, width:48, height:48, borderRadius:"50%", background:"#fff", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"var(--ink)", boxShadow:"0 6px 18px rgba(0,0,0,.18)"}}>
                  <IconB.plus/>
                </button>
              </div>
              <div style={{padding:"0 4px"}}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:4}}>
                  <div className="hindi" style={{fontSize:13, color:"var(--accent)"}}>{h.hi}</div>
                  <div style={{display:"flex", alignItems:"center", gap:3, fontSize:11, color:"var(--ink-3)"}}>
                    <IconB.star style={{width:12, height:12, color:"var(--gold)"}}/> 4.{8 - (parseInt(h.id.slice(1)) % 3)}
                  </div>
                </div>
                <div className="disp" style={{fontSize:22, lineHeight:1.1}}>{h.en}</div>
                <div style={{fontSize:12, color:"var(--ink-3)", margin:"4px 0 10px"}}>{h.pieces}</div>
                <div style={{display:"flex", alignItems:"baseline", gap:8}}>
                  <span className="disp" style={{fontSize:22}}><RupeeB v={h.price}/></span>
                  <span style={{fontSize:12, color:"var(--ink-3)", textDecoration:"line-through"}}>₹{h.mrp}</span>
                  <span style={{marginLeft:"auto", fontSize:11, color:"var(--ok)", fontWeight:600}}>
                    Save ₹{h.mrp - h.price}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BESTSELLERS — horizontal scroll feel */}
      <section style={{padding:"48px 48px 56px", background:"var(--bg-sub)"}}>
        <div style={{display:"flex", alignItems:"end", justifyContent:"space-between", marginBottom:22}}>
          <div>
            <span className="badge-pill" style={{borderColor:"var(--rule-strong)"}}>Bhind&apos;s favourites</span>
            <h2 className="disp" style={{fontSize:46, margin:"12px 0 0"}}>Bestselling mithai</h2>
          </div>
          <div style={{display:"flex", gap:8}}>
            <button className="badge-pill" style={{border:"1px solid var(--rule)", background:"var(--paper)", cursor:"pointer"}}>←</button>
            <button className="badge-pill" style={{border:"1px solid var(--rule)", background:"var(--paper)", cursor:"pointer"}}>→</button>
          </div>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:16}}>
          {DATA_B.sweets.map(s => (
            <article key={s.id} style={{background:"var(--paper)", borderRadius:"var(--radius-lg)", overflow:"hidden", border:"1px solid var(--rule)"}}>
              <div className="tile" style={{aspectRatio:"1/1", borderRadius:0}}>
                <img src={s.img} alt=""/>
                <button style={{position:"absolute", bottom:8, right:8, width:34, height:34, borderRadius:"50%", background:"#fff", border:"none", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--accent)", cursor:"pointer", boxShadow:"0 4px 12px rgba(0,0,0,.12)"}}>
                  <IconB.plus/>
                </button>
              </div>
              <div style={{padding:14}}>
                <div className="hindi" style={{fontSize:11, color:"var(--accent)"}}>{s.hi}</div>
                <div className="disp" style={{fontSize:16, lineHeight:1.1, margin:"3px 0 6px"}}>{s.en}</div>
                <div style={{display:"flex", alignItems:"baseline", gap:6}}>
                  <strong style={{fontSize:14}}><RupeeB v={s.price}/></strong>
                  <span style={{fontSize:11, color:"var(--ink-3)"}}>/ {s.unit}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STORY + OUTLET — split */}
      <section style={{padding:"72px 48px", background:"var(--paper)"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center"}}>
          <div>
            <span className="badge-pill" style={{color:"var(--leaf)", borderColor:"color-mix(in srgb, var(--leaf) 24%, var(--rule))"}}>Our outlet · since 1987</span>
            <h2 className="disp" style={{fontSize:64, lineHeight:0.95, margin:"16px 0 16px"}}>
              From <span style={{fontStyle:"italic", color:"var(--accent)"}}>Pustak Bazaar</span><br/>
              to your doorstep.
            </h2>
            <p style={{fontSize:16, color:"var(--ink-2)", lineHeight:1.7, maxWidth:520, marginBottom:24}}>
              A single counter in Mahveer Ganj market, three generations of mithaiwallahs, and one promise — every sweet is hand-made, never machine-cut, never compromised.
            </p>
            <div style={{display:"grid", gridTemplateColumns:"auto 1fr auto", gap:14, alignItems:"center", padding:"18px 20px", border:"1px solid var(--rule-strong)", borderRadius:"var(--radius-lg)", background:"var(--bg-sub)"}}>
              <div style={{width:42, height:42, borderRadius:12, background:"var(--accent)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center"}}><IconB.store/></div>
              <div>
                <div style={{fontWeight:600}}>HQ8P+P6R, Pustak Bazar, Mahveer Ganj</div>
                <div style={{fontSize:13, color:"var(--ink-3)"}}>Kiratpura, Bhind, MP 477001 · 9 AM – 10 PM</div>
              </div>
              <button className="btn btn-ghost btn-sm" style={{borderRadius:99}}>Directions →</button>
            </div>
          </div>
          <div style={{position:"relative", borderRadius:"var(--radius-lg)", overflow:"hidden", aspectRatio:"4/3"}}>
            <img src={DATA_B.hampers[1].img} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
            <div style={{position:"absolute", left:18, bottom:18, padding:"14px 18px", background:"rgba(255,255,255,.94)", borderRadius:12, backdropFilter:"blur(8px)"}}>
              <div style={{fontSize:11, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".15em"}}>Trust</div>
              <div className="disp" style={{fontSize:20, marginTop:2}}>2,442 repeat customers</div>
              <div style={{fontSize:11, color:"var(--ink-2)", marginTop:2}}>4.8 ★ on Google · 1,204 reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"48px 48px 24px", background:"var(--ink)", color:"#dac6a8"}}>
        <div style={{display:"grid", gridTemplateColumns:"1.6fr 1fr 1fr 1fr", gap:36, marginBottom:32}}>
          <div>
            <div className="disp" style={{fontSize:28, color:"#fff"}}>Bangali Sweets</div>
            <div className="hindi" style={{fontSize:13, marginTop:4}}>बंगाली स्वीट्स</div>
            <p style={{fontSize:13, marginTop:14, opacity:.75, maxWidth:300, lineHeight:1.6}}>
              Hand-made mithai, namkeen and dry fruits from Bhind. Fresh from our kitchen, delivered with care.
            </p>
            <div style={{marginTop:18, fontSize:12, opacity:.7}}>📍 Pustak Bazar, Bhind MP · 📞 0797 4096 667</div>
            <div style={{display:"flex", gap:10, marginTop:18}}>
              {["Instagram","Facebook","YouTube","WhatsApp"].map(s=> <span key={s} className="badge-pill" style={{background:"transparent", border:"1px solid #5a4a3a", color:"#dac6a8"}}>{s}</span>)}
            </div>
          </div>
          {[
            ["Shop", ["Sweets","Namkeen","Dry Fruits","Dairy","Bakery","Hampers","Birthday"]],
            ["Company", ["About","Outlet","Press","Careers"]],
            ["Help", ["Track Order","Shipping","FAQs","Returns"]],
          ].map(([h, items])=>(
            <div key={h}>
              <div style={{fontSize:11, letterSpacing:".18em", textTransform:"uppercase", color:"var(--gold)", marginBottom:14}}>{h}</div>
              {items.map(i=> <div key={i} style={{fontSize:13, marginBottom:8, opacity:.85}}>{i}</div>)}
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid #3a2a1a", paddingTop:18, display:"flex", justifyContent:"space-between", fontSize:11, opacity:.55}}>
          <span>© 2026 Bangali Sweets &amp; Dryfruits · FSSAI 12345678901234 · GSTIN 23ABCDE1234F1Z5</span>
          <span>Privacy · Terms · Refunds</span>
        </div>
      </footer>
    </div>
  );
}

window.HomeB = HomeB;
