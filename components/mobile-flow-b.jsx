// Direction B — Mobile checkout flow (saffron modern)

const { Icon: IconMB, Rupee: RupeeMB } = window.BBShared;
const DATA_MB = window.BB_DATA;

function PhoneFrameB({ children, label }) {
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:14}}>
      <div className="phone" style={{borderRadius:40, border:"1px solid var(--rule)"}}>
        <div className="phone-notch" style={{background:"#1a1a1a"}}/>
        <div className="phone-status">
          <span>9:41</span>
          <span style={{display:"flex", gap:6, alignItems:"center"}}>
            <span style={{fontSize:10}}>5G</span>
            <span>●●●○</span>
            <span style={{display:"inline-block", width:20, height:9, border:"1px solid currentColor", borderRadius:2, position:"relative"}}>
              <span style={{position:"absolute", inset:1, background:"currentColor", width:"82%"}}/>
            </span>
          </span>
        </div>
        <div style={{height:"calc(100% - 38px)", marginTop:6, overflow:"hidden", position:"relative"}}>
          {children}
        </div>
      </div>
      <div className="badge-pill" style={{background:"var(--paper)", borderColor:"var(--rule)", fontWeight:500, color:"var(--ink-2)"}}>{label}</div>
    </div>
  );
}

function ScreenBHome() {
  return (
    <div style={{height:"100%", background:"var(--bg)", overflow:"hidden", position:"relative"}}>
      <div style={{padding:"4px 16px 8px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <span>☰</span>
        <div className="disp" style={{fontSize:18}}>Bangali</div>
        <span style={{position:"relative"}}>🛍 <span style={{position:"absolute", top:-4, right:-6, background:"var(--accent)", color:"#fff", borderRadius:99, fontSize:9, padding:"1px 5px"}}>3</span></span>
      </div>
      <div style={{padding:"0 16px", marginTop:6}}>
        <input className="input" placeholder="Search sweets, hampers…" style={{padding:"10px 14px", fontSize:13, borderRadius:99, background:"var(--paper)"}}/>
      </div>

      <div style={{padding:"14px 16px 12px"}}>
        <div className="badge-pill" style={{color:"var(--accent)", background:"color-mix(in srgb, var(--accent) 12%, transparent)", border:"none", fontSize:10}}>✦ Diwali 2026</div>
        <div className="disp" style={{fontSize:28, lineHeight:1, margin:"6px 0 2px"}}>Hampers for<br/>every celebration.</div>
        <div className="hindi" style={{fontSize:12, color:"var(--ink-3)"}}>हर ख़ुशी का बहाना</div>
      </div>

      <div style={{padding:"0 16px"}}>
        <div className="tile" style={{height:130, borderRadius:14}}>
          <img src={DATA_MB.hampers[0].img} alt=""/>
          <div style={{position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 40%, rgba(15,8,5,.65))"}}/>
          <div style={{position:"absolute", left:12, bottom:10, color:"#fff"}}>
            <div className="disp" style={{fontSize:16}}>The Heritage Box</div>
            <div style={{fontSize:11, opacity:.9}}>9 mithai · 500g · <strong>₹1,499</strong></div>
          </div>
          <button style={{position:"absolute", right:10, bottom:10, padding:"6px 12px", borderRadius:99, background:"#fff", border:"none", fontSize:11, fontWeight:700}}>Add</button>
        </div>
      </div>

      <div style={{padding:"16px 16px 0"}}>
        <div style={{display:"flex", justifyContent:"space-between", marginBottom:8, alignItems:"baseline"}}>
          <strong style={{fontSize:13}}>Shop by craving</strong>
          <span style={{fontSize:11, color:"var(--accent)"}}>All →</span>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8}}>
          {DATA_MB.categories.slice(0,4).map(c=>(
            <div key={c.slug}>
              <div className="tile" style={{aspectRatio:"1/1.2", borderRadius:10}}>
                <img src={c.hero} alt=""/>
              </div>
              <div style={{fontSize:10, textAlign:"center", marginTop:5, color:"var(--ink-2)"}}>{c.en}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"14px 16px 0"}}>
        <div style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
          <strong style={{fontSize:13}}>Bestsellers</strong>
          <span style={{fontSize:11, color:"var(--accent)"}}>See all →</span>
        </div>
        <div style={{display:"flex", gap:10, overflow:"hidden"}}>
          {DATA_MB.sweets.slice(0,3).map(s=>(
            <article key={s.id} style={{flex:"0 0 100px", background:"var(--paper)", borderRadius:10, border:"1px solid var(--rule)", overflow:"hidden"}}>
              <div className="tile" style={{height:80, borderRadius:0}}>
                <img src={s.img} alt=""/>
              </div>
              <div style={{padding:6}}>
                <div style={{fontSize:11, fontWeight:600, lineHeight:1.2}}>{s.en}</div>
                <div style={{fontSize:10, color:"var(--ink-3)"}}><strong>₹{s.price}</strong> /{s.unit}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom tabs */}
      <div style={{position:"absolute", left:0, right:0, bottom:0, background:"var(--paper)", borderTop:"1px solid var(--rule)", display:"flex", justifyContent:"space-around", padding:"10px 0 12px"}}>
        {[["🏠","Home",true],["🍬","Shop"],["📦","Orders"],["👤","Account"]].map(([i,l,a],k)=>(
          <div key={k} style={{textAlign:"center", color: a ? "var(--accent)" : "var(--ink-3)", fontSize:9, fontWeight: a ? 700 : 500}}>
            <div style={{fontSize:16}}>{i}</div>{l}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenBCart() {
  return (
    <div style={{padding:"6px 14px 14px", height:"100%", display:"flex", flexDirection:"column", background:"var(--bg)"}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, padding:"4px 0"}}>
        <span style={{fontSize:22}}>←</span>
        <span className="disp" style={{fontSize:18}}>Your bag</span>
        <span style={{fontSize:13, color:"var(--accent)"}}>Edit</span>
      </div>

      {[
        [DATA_MB.hampers[0].img, "The Heritage Box", "हेरिटेज बॉक्स · 500g", 1, 1499],
        [DATA_MB.sweets[0].img,  "Kaju Katli",       "काजू कतली · 500g", 2, 1498],
        [DATA_MB.sweets[1].img,  "Motichoor Laddoo", "मोतीचूर लड्डू · 500g", 1, 349],
      ].map(([img, en, hi, q, p], i)=>(
        <div key={i} style={{display:"flex", gap:10, padding:"10px", background:"var(--paper)", borderRadius:14, marginBottom:8, alignItems:"center"}}>
          <div className="tile" style={{width:54, height:54, flex:"0 0 54px", borderRadius:10}}>
            <img src={img} alt=""/>
          </div>
          <div style={{flex:1}}>
            <div className="disp" style={{fontSize:14}}>{en}</div>
            <div className="hindi" style={{fontSize:10, color:"var(--ink-3)"}}>{hi}</div>
            <div style={{display:"flex", justifyContent:"space-between", marginTop:6, alignItems:"center"}}>
              <span style={{fontSize:11, background:"var(--bg-sub)", borderRadius:99, padding:"3px 10px", fontWeight:600}}>− {q} +</span>
              <strong style={{fontSize:13}}><RupeeMB v={p}/></strong>
            </div>
          </div>
        </div>
      ))}

      <div style={{marginTop:6, padding:"10px 12px", background:"color-mix(in srgb, var(--gold) 16%, transparent)", borderRadius:10, fontSize:11, display:"flex", alignItems:"center", gap:8}}>
        <span>🎁</span>
        <span>Add <strong>₹154</strong> more for free Bhind delivery</span>
      </div>

      <div style={{marginTop:"auto", padding:"14px", background:"var(--paper)", borderRadius:16, border:"1px solid var(--rule)"}}>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--ink-3)", marginBottom:4}}>
          <span>Subtotal</span><span><RupeeMB v={3346}/></span>
        </div>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--ink-3)", marginBottom:10}}>
          <span>Delivery</span><span><RupeeMB v={89}/></span>
        </div>
        <div style={{display:"flex", justifyContent:"space-between", marginBottom:12, fontWeight:600}}>
          <span>Total</span><span className="disp" style={{fontSize:18}}><RupeeMB v={3435}/></span>
        </div>
        <button className="btn" style={{width:"100%", justifyContent:"center", padding:"14px", borderRadius:99}}>Checkout →</button>
      </div>
    </div>
  );
}

function ScreenBPhone() {
  return (
    <div style={{padding:"14px", height:"100%", display:"flex", flexDirection:"column", background:"var(--paper)"}}>
      <div style={{display:"flex", justifyContent:"space-between", marginBottom:18}}>
        <span style={{fontSize:22}}>←</span>
        <div style={{display:"flex", gap:5}}>
          <span style={{width:22, height:4, background:"var(--accent)", borderRadius:99}}/>
          <span style={{width:22, height:4, background:"var(--rule)", borderRadius:99}}/>
          <span style={{width:22, height:4, background:"var(--rule)", borderRadius:99}}/>
          <span style={{width:22, height:4, background:"var(--rule)", borderRadius:99}}/>
        </div>
        <span style={{width:22}}/>
      </div>

      <div className="badge-pill" style={{alignSelf:"flex-start", color:"var(--accent)", background:"color-mix(in srgb, var(--accent) 12%, transparent)", border:"none", fontSize:10, marginBottom:14}}>Step 1 · Sign in</div>
      <h2 className="disp" style={{fontSize:32, lineHeight:1, margin:"0 0 6px"}}>Continue with<br/>your phone.</h2>
      <p className="hindi" style={{color:"var(--ink-3)", fontSize:13, marginBottom:22}}>
        OTP भेजेंगे · password नहीं चाहिए
      </p>

      <label className="label">Mobile number</label>
      <div style={{display:"flex", border:"1.5px solid var(--accent)", borderRadius:14, overflow:"hidden", background:"var(--paper)"}}>
        <span style={{padding:"14px 12px", borderRight:"1px solid var(--rule)", fontWeight:600}}>+91</span>
        <input className="input" defaultValue="98765 43210" style={{border:0, borderRadius:0, fontSize:18}}/>
      </div>

      <div style={{display:"flex", flexDirection:"column", gap:10, marginTop:18}}>
        <label style={{display:"flex", alignItems:"center", gap:10, fontSize:12, color:"var(--ink-2)"}}>
          <input type="checkbox" defaultChecked/> WhatsApp me order updates
        </label>
        <label style={{display:"flex", alignItems:"center", gap:10, fontSize:12, color:"var(--ink-2)"}}>
          <input type="checkbox"/> Send me festive offers (twice a month, no spam)
        </label>
      </div>

      <button className="btn" style={{width:"100%", justifyContent:"center", padding:"14px", marginTop:"auto", borderRadius:99}}>
        Send OTP →
      </button>
      <div style={{textAlign:"center", marginTop:10, fontSize:10, color:"var(--ink-3)"}}>
        <IconMB.shield style={{display:"inline", verticalAlign:"middle", width:11, height:11}}/> Secured · TrueCaller verified
      </div>
    </div>
  );
}

function ScreenBOTP() {
  return (
    <div style={{padding:"14px", height:"100%", display:"flex", flexDirection:"column", background:"var(--paper)"}}>
      <div style={{display:"flex", justifyContent:"space-between", marginBottom:18}}>
        <span style={{fontSize:22}}>←</span>
        <div style={{display:"flex", gap:5}}>
          <span style={{width:22, height:4, background:"var(--accent)", borderRadius:99}}/>
          <span style={{width:22, height:4, background:"var(--accent)", borderRadius:99}}/>
          <span style={{width:22, height:4, background:"var(--rule)", borderRadius:99}}/>
          <span style={{width:22, height:4, background:"var(--rule)", borderRadius:99}}/>
        </div>
        <span style={{width:22}}/>
      </div>

      <div className="badge-pill" style={{alignSelf:"flex-start", color:"var(--accent)", background:"color-mix(in srgb, var(--accent) 12%, transparent)", border:"none", fontSize:10, marginBottom:14}}>Step 2 · Verify</div>
      <h2 className="disp" style={{fontSize:32, lineHeight:1, margin:"0 0 6px"}}>Enter 6 digits.</h2>
      <p style={{color:"var(--ink-3)", fontSize:13}}>OTP sent to <strong style={{color:"var(--ink)"}}>+91 98765 43210</strong></p>
      <span style={{color:"var(--accent)", fontSize:12, fontWeight:600, marginBottom:22, alignSelf:"flex-start"}}>Change</span>

      <div style={{display:"flex", gap:8, marginBottom:18}}>
        {["3","9","2","1","",""].map((d,i)=>(
          <div key={i} style={{flex:1, height:52, border:`1.5px solid ${d? "var(--accent)" : "var(--rule)"}`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontFamily:"var(--display)", background: d? "color-mix(in srgb, var(--accent) 5%, var(--paper))" : "var(--paper)"}}>{d}</div>
        ))}
      </div>

      <div style={{fontSize:12, color:"var(--ink-3)", marginBottom:10}}>
        Resend in <strong style={{color:"var(--ink)"}}>00:18</strong> · or use WhatsApp
      </div>
      <div style={{padding:"10px 12px", background:"color-mix(in srgb, var(--leaf) 10%, transparent)", borderRadius:12, fontSize:11, color:"var(--leaf)", display:"flex", alignItems:"center", gap:8}}>
        <IconMB.whatsapp/> OTP also sent on WhatsApp
      </div>

      <button className="btn" style={{width:"100%", justifyContent:"center", padding:"14px", marginTop:"auto", borderRadius:99}}>Verify →</button>
    </div>
  );
}

function ScreenBName() {
  return (
    <div style={{padding:"14px", height:"100%", display:"flex", flexDirection:"column", background:"var(--paper)"}}>
      <div style={{display:"flex", justifyContent:"space-between", marginBottom:18}}>
        <span style={{fontSize:22}}>←</span>
        <div style={{display:"flex", gap:5}}>
          <span style={{width:22, height:4, background:"var(--accent)", borderRadius:99}}/>
          <span style={{width:22, height:4, background:"var(--accent)", borderRadius:99}}/>
          <span style={{width:22, height:4, background:"var(--accent)", borderRadius:99}}/>
          <span style={{width:22, height:4, background:"var(--rule)", borderRadius:99}}/>
        </div>
        <span style={{width:22}}/>
      </div>

      <div className="badge-pill" style={{alignSelf:"flex-start", color:"var(--accent)", background:"color-mix(in srgb, var(--accent) 12%, transparent)", border:"none", fontSize:10, marginBottom:14}}>Step 3 · About you</div>
      <h2 className="disp" style={{fontSize:28, lineHeight:1.05, margin:"0 0 6px"}}>Who&apos;s the bag for?</h2>
      <p className="hindi" style={{color:"var(--ink-3)", fontSize:13, marginBottom:22}}>नाम और email बता दीजिए</p>

      <label className="label">Full name</label>
      <input className="input" defaultValue="Anjali Verma" style={{borderRadius:12, marginBottom:14}}/>

      <label className="label">Email <span style={{textTransform:"none", color:"var(--ink-3)"}}>· optional (invoice)</span></label>
      <input className="input" placeholder="anjali@email.com" style={{borderRadius:12, marginBottom:18}}/>

      <div style={{padding:"14px", background:"color-mix(in srgb, var(--gold) 14%, transparent)", borderRadius:14, display:"flex", alignItems:"center", gap:12}}>
        <div style={{width:38, height:38, borderRadius:10, background:"var(--gold)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center"}}>★</div>
        <div style={{flex:1}}>
          <div style={{fontSize:13, fontWeight:700}}>Mithai Club</div>
          <div style={{fontSize:11, color:"var(--ink-2)"}}>2% back on every order. Free.</div>
        </div>
      </div>

      <button className="btn" style={{width:"100%", justifyContent:"center", padding:"14px", marginTop:"auto", borderRadius:99}}>Continue →</button>
    </div>
  );
}

function ScreenBAddress() {
  return (
    <div style={{padding:"14px", height:"100%", display:"flex", flexDirection:"column", background:"var(--paper)", overflow:"auto"}}>
      <div style={{display:"flex", justifyContent:"space-between", marginBottom:14}}>
        <span style={{fontSize:22}}>←</span>
        <div style={{display:"flex", gap:5}}>
          {[1,2,3,4].map(i=> <span key={i} style={{width:22, height:4, background:"var(--accent)", borderRadius:99}}/>)}
        </div>
        <span style={{width:22}}/>
      </div>

      <div className="badge-pill" style={{alignSelf:"flex-start", color:"var(--accent)", background:"color-mix(in srgb, var(--accent) 12%, transparent)", border:"none", fontSize:10, marginBottom:12}}>Step 4 · Delivery</div>
      <h2 className="disp" style={{fontSize:24, lineHeight:1.05, margin:"0 0 12px"}}>How should we send it?</h2>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, marginBottom:14}}>
        {[
          ["🚚","Delivery","Bhind",true],
          ["🏬","Pickup","FREE"],
          ["📦","Ship","Pan-India"],
        ].map(([i, t, sub, sel], k)=>(
          <div key={k} style={{padding:"10px 6px", textAlign:"center", border:`1.5px solid ${sel? "var(--accent)" : "var(--rule)"}`, borderRadius:12, background: sel? "color-mix(in srgb, var(--accent) 5%, var(--paper))" : "var(--paper)"}}>
            <div style={{fontSize:18}}>{i}</div>
            <div style={{fontSize:11, fontWeight:700, marginTop:2}}>{t}</div>
            <div style={{fontSize:9, color:"var(--ink-3)", marginTop:1}}>{sub}</div>
          </div>
        ))}
      </div>

      <label className="label">Delivery address</label>
      <textarea className="input" rows="3" defaultValue="Flat 3B, Sundar Apartments, Kiratpura Road, Bhind, MP 477001" style={{borderRadius:12}}/>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:10}}>
        <div>
          <label className="label">PIN</label>
          <input className="input" defaultValue="477001" style={{borderRadius:12}}/>
        </div>
        <div>
          <label className="label">Landmark</label>
          <input className="input" defaultValue="Near Pustak Bazar" style={{borderRadius:12}}/>
        </div>
      </div>

      <div style={{marginTop:14, padding:"10px 12px", background:"color-mix(in srgb, var(--leaf) 10%, transparent)", borderRadius:12, fontSize:11, color:"var(--leaf)", display:"flex", alignItems:"center", gap:8}}>
        <IconMB.check/> Free same-day delivery · before 4 PM
      </div>

      <button className="btn" style={{width:"100%", justifyContent:"center", padding:"14px", marginTop:14, borderRadius:99}}>
        Pay <RupeeMB v={3435}/> →
      </button>
    </div>
  );
}

function ScreenBPay() {
  return (
    <div style={{padding:"14px", height:"100%", display:"flex", flexDirection:"column", background:"var(--paper)"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14}}>
        <span style={{fontSize:22}}>←</span>
        <span className="disp" style={{fontSize:18}}>Payment</span>
        <span style={{width:22}}/>
      </div>

      <div style={{padding:"14px", background:"var(--ink)", color:"#fbf7ee", borderRadius:14, marginBottom:14}}>
        <div style={{fontSize:10, opacity:.7, textTransform:"uppercase", letterSpacing:".15em"}}>Total payable</div>
        <div className="disp" style={{fontSize:32, marginTop:4}}><RupeeMB v={3435}/></div>
        <div style={{fontSize:11, opacity:.7, marginTop:4}}>3 items · Bhind 477001 · Today, 6 PM</div>
      </div>

      <div className="eyebrow" style={{marginBottom:8}}>Pay using UPI</div>
      {[
        ["PhonePe", "anjali@ybl", true, "#5F259F"],
        ["Google Pay", "anjali.v@oksbi", false, "#1A73E8"],
        ["Paytm", "9876543210@paytm", false, "#00BAF2"],
      ].map(([app, vpa, sel, c])=>(
        <div key={app} style={{display:"flex", alignItems:"center", gap:12, padding:"12px 14px", border:`1.5px solid ${sel? "var(--accent)" : "var(--rule)"}`, borderRadius:14, marginBottom:8, background: sel? "color-mix(in srgb, var(--accent) 5%, var(--paper))" : "var(--paper)"}}>
          <div style={{width:36, height:36, borderRadius:10, background:c, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700}}>{app[0]}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:13, fontWeight:600}}>{app}</div>
            <div style={{fontSize:11, color:"var(--ink-3)"}}>{vpa}</div>
          </div>
          {sel && <div style={{width:20, height:20, borderRadius:"50%", background:"var(--accent)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center"}}><IconMB.check style={{width:14, height:14}}/></div>}
        </div>
      ))}

      <div style={{display:"flex", gap:6, marginTop:6, marginBottom:6}}>
        <button className="badge-pill" style={{flex:1, justifyContent:"center", border:"1px solid var(--rule)", background:"var(--paper)", padding:"10px"}}>Scan QR</button>
        <button className="badge-pill" style={{flex:1, justifyContent:"center", border:"1px solid var(--rule)", background:"var(--paper)", padding:"10px"}}>Cash on Delivery</button>
      </div>

      <button className="btn" style={{width:"100%", justifyContent:"center", padding:"14px", marginTop:"auto", borderRadius:99}}>
        Pay <RupeeMB v={3435}/> via UPI
      </button>
      <div style={{textAlign:"center", marginTop:8, fontSize:10, color:"var(--ink-3)"}}>
        🔒 Razorpay secure · 256-bit encryption
      </div>
    </div>
  );
}

function ScreenBDone() {
  return (
    <div style={{padding:"18px", height:"100%", display:"flex", flexDirection:"column", background:"linear-gradient(180deg, color-mix(in srgb, var(--accent) 10%, transparent), var(--paper) 40%)", textAlign:"center"}}>
      <div style={{height:40}}/>
      <div style={{width:90, height:90, borderRadius:"50%", background:"var(--accent)", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", boxShadow:"0 12px 30px color-mix(in srgb, var(--accent) 30%, transparent)"}}>
        <IconMB.check style={{width:46, height:46}}/>
      </div>
      <h2 className="disp" style={{fontSize:32, margin:"22px 0 4px"}}>Mithai on the way!</h2>
      <p className="hindi" style={{color:"var(--accent)", fontSize:15, marginBottom:18}}>मिठाई पैक हो रही है ✨</p>

      <div style={{padding:"16px", background:"var(--paper)", borderRadius:16, textAlign:"left", border:"1px solid var(--rule)"}}>
        <div className="eyebrow">Order</div>
        <div className="disp" style={{fontSize:20}}>#BS-2026-04812</div>
        <div style={{height:1, background:"var(--rule)", margin:"10px 0"}}/>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5}}><span>Total paid</span><strong><RupeeMB v={3435}/></strong></div>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5}}><span>Delivery by</span><strong>Today · 6 PM</strong></div>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}><span>Mithai Club</span><strong style={{color:"var(--gold)"}}>+69 points ★</strong></div>
      </div>

      <div style={{marginTop:14, padding:"12px 14px", background:"color-mix(in srgb, var(--leaf) 10%, transparent)", color:"var(--leaf)", borderRadius:12, fontSize:12, display:"flex", alignItems:"center", gap:8, textAlign:"left"}}>
        <IconMB.whatsapp/>
        <div style={{flex:1}}>Track on WhatsApp · we&apos;ll ping you at each step</div>
      </div>

      <button className="btn btn-ghost" style={{width:"100%", justifyContent:"center", padding:"12px", marginTop:"auto", borderRadius:99}}>Continue shopping</button>
    </div>
  );
}

function MobileFlowB() {
  return (
    <div className="artboard dir-b" data-screen-label="B · Mobile Flow" style={{padding:"40px 30px", display:"flex", gap:22, alignItems:"flex-start", overflowX:"auto"}}>
      <div style={{position:"absolute", left:30, top:18}}>
        <span className="badge-pill" style={{color:"var(--ink-3)"}}>Storefront mobile</span>
        <div className="disp" style={{fontSize:22, marginTop:4}}>Home → cart → checkout flow</div>
      </div>
      <div style={{flex:"0 0 60px"}}/>
      <PhoneFrameB label="00 · Home"><ScreenBHome/></PhoneFrameB>
      <PhoneFrameB label="01 · Cart"><ScreenBCart/></PhoneFrameB>
      <PhoneFrameB label="02 · Phone"><ScreenBPhone/></PhoneFrameB>
      <PhoneFrameB label="03 · OTP"><ScreenBOTP/></PhoneFrameB>
      <PhoneFrameB label="04 · Name"><ScreenBName/></PhoneFrameB>
      <PhoneFrameB label="05 · Address"><ScreenBAddress/></PhoneFrameB>
      <PhoneFrameB label="06 · Pay"><ScreenBPay/></PhoneFrameB>
      <PhoneFrameB label="07 · Done"><ScreenBDone/></PhoneFrameB>
    </div>
  );
}

window.MobileFlowB = MobileFlowB;
