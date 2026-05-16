// Direction A — Mobile checkout flow (browse → cart → phone → OTP → name → address → pay → done)

const { Icon: IconMA, Rupee: RupeeMA } = window.BBShared;
const DATA_MA = window.BB_DATA;

function PhoneFrame({ children, label }) {
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:14}}>
      <div className="phone">
        <div className="phone-notch"/>
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
      <div className="eyebrow" style={{color:"var(--ink-2)"}}>{label}</div>
    </div>
  );
}

function ScreenCart() {
  return (
    <div style={{padding:"8px 18px 18px", height:"100%", display:"flex", flexDirection:"column", background:"var(--paper)"}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14}}>
        <span style={{fontSize:22}}>←</span>
        <span className="disp" style={{fontSize:18, fontStyle:"italic"}}>Your bag · 3</span>
        <span style={{fontSize:14, color:"var(--accent)"}}>Save</span>
      </div>

      <div style={{display:"flex", gap:12, padding:"12px 0", borderBottom:"1px solid var(--rule)"}}>
        <div className="tile" style={{width:60, height:60, flex:"0 0 60px"}}>
          <img src={DATA_MA.hampers[0].img} alt=""/>
        </div>
        <div style={{flex:1}}>
          <div className="disp" style={{fontSize:14, fontStyle:"italic"}}>The Heritage Box</div>
          <div className="hindi" style={{fontSize:11, color:"var(--ink-3)"}}>हेरिटेज बॉक्स · 500g</div>
          <div style={{display:"flex", justifyContent:"space-between", marginTop:6, alignItems:"center"}}>
            <span style={{fontSize:11, border:"1px solid var(--rule)", borderRadius:99, padding:"2px 8px"}}>− 1 +</span>
            <strong style={{fontSize:14}}><RupeeMA v={1499}/></strong>
          </div>
        </div>
      </div>
      <div style={{display:"flex", gap:12, padding:"12px 0", borderBottom:"1px solid var(--rule)"}}>
        <div className="tile" style={{width:60, height:60, flex:"0 0 60px"}}>
          <img src={DATA_MA.sweets[0].img} alt=""/>
        </div>
        <div style={{flex:1}}>
          <div className="disp" style={{fontSize:14, fontStyle:"italic"}}>Kaju Katli</div>
          <div className="hindi" style={{fontSize:11, color:"var(--ink-3)"}}>काजू कतली · 500g</div>
          <div style={{display:"flex", justifyContent:"space-between", marginTop:6, alignItems:"center"}}>
            <span style={{fontSize:11, border:"1px solid var(--rule)", borderRadius:99, padding:"2px 8px"}}>− 2 +</span>
            <strong style={{fontSize:14}}><RupeeMA v={1498}/></strong>
          </div>
        </div>
      </div>
      <div style={{display:"flex", gap:12, padding:"12px 0", borderBottom:"1px solid var(--rule)"}}>
        <div className="tile" style={{width:60, height:60, flex:"0 0 60px"}}>
          <img src={DATA_MA.sweets[1].img} alt=""/>
        </div>
        <div style={{flex:1}}>
          <div className="disp" style={{fontSize:14, fontStyle:"italic"}}>Motichoor Laddoo</div>
          <div className="hindi" style={{fontSize:11, color:"var(--ink-3)"}}>मोतीचूर लड्डू · 500g</div>
          <div style={{display:"flex", justifyContent:"space-between", marginTop:6, alignItems:"center"}}>
            <span style={{fontSize:11, border:"1px solid var(--rule)", borderRadius:99, padding:"2px 8px"}}>− 1 +</span>
            <strong style={{fontSize:14}}><RupeeMA v={349}/></strong>
          </div>
        </div>
      </div>

      <div style={{marginTop:14, padding:"10px 12px", background:"color-mix(in srgb, var(--gold) 14%, transparent)", borderRadius:8, fontSize:11, display:"flex", alignItems:"center", gap:8}}>
        <span style={{fontSize:14}}>🎁</span>
        <span>Add <strong>₹154 more</strong> for free Bhind delivery</span>
      </div>

      <div style={{marginTop:"auto", paddingTop:14, borderTop:"1px dashed var(--rule-strong)"}}>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--ink-2)", marginBottom:4}}>
          <span>Subtotal</span><span><RupeeMA v={3346}/></span>
        </div>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--ink-2)", marginBottom:8}}>
          <span>Delivery (Pan-India)</span><span><RupeeMA v={89}/></span>
        </div>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:15, fontWeight:700, marginBottom:12}}>
          <span>Total</span><span className="disp"><RupeeMA v={3435}/></span>
        </div>
        <button className="btn" style={{width:"100%", justifyContent:"center", padding:"14px"}}>Checkout · 3 items <IconMA.arrow/></button>
      </div>
    </div>
  );
}

function ScreenPhone() {
  return (
    <div style={{padding:"18px", height:"100%", display:"flex", flexDirection:"column", background:"var(--paper)"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24}}>
        <span style={{fontSize:22}}>←</span>
        <div style={{display:"flex", gap:4}}>
          <span style={{width:24, height:3, background:"var(--accent)", borderRadius:3}}/>
          <span style={{width:24, height:3, background:"var(--rule)", borderRadius:3}}/>
          <span style={{width:24, height:3, background:"var(--rule)", borderRadius:3}}/>
          <span style={{width:24, height:3, background:"var(--rule)", borderRadius:3}}/>
        </div>
        <span style={{width:22}}/>
      </div>

      <div style={{marginBottom:6}} className="eyebrow">Step 1 of 4 · Sign in</div>
      <h2 className="disp" style={{fontSize:32, lineHeight:1.05, fontStyle:"italic", margin:"6px 0 6px"}}>Almost there.</h2>
      <p className="hindi" style={{color:"var(--ink-3)", fontSize:14, marginBottom:22}}>
        फ़ोन नंबर डालिए, OTP भेज देंगे
      </p>

      <label className="label">Mobile number</label>
      <div style={{display:"flex", border:"1px solid var(--accent)", borderRadius:"var(--radius)", overflow:"hidden", background:"var(--paper)"}}>
        <span style={{padding:"14px 12px", borderRight:"1px solid var(--rule)", fontWeight:600}}>+91</span>
        <input className="input" defaultValue="98765 43210" style={{border:0, borderRadius:0}}/>
      </div>
      <p style={{fontSize:11, color:"var(--ink-3)", marginTop:8, lineHeight:1.5}}>
        We&apos;ll send a 6-digit OTP. No password. By continuing you agree to our T&amp;Cs.
      </p>

      <label style={{display:"flex", alignItems:"center", gap:8, marginTop:18, fontSize:12, color:"var(--ink-2)"}}>
        <input type="checkbox" defaultChecked/> WhatsApp me order updates
      </label>

      <button className="btn" style={{width:"100%", justifyContent:"center", padding:"14px", marginTop:"auto"}}>Send OTP <IconMA.arrow/></button>

      <div style={{textAlign:"center", marginTop:12, fontSize:11, color:"var(--ink-3)"}}>
        <IconMA.shield style={{display:"inline", verticalAlign:"middle", width:12, height:12}}/> Secured by TrueCaller verification
      </div>
    </div>
  );
}

function ScreenOTP() {
  return (
    <div style={{padding:"18px", height:"100%", display:"flex", flexDirection:"column", background:"var(--paper)"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24}}>
        <span style={{fontSize:22}}>←</span>
        <div style={{display:"flex", gap:4}}>
          <span style={{width:24, height:3, background:"var(--accent)", borderRadius:3}}/>
          <span style={{width:24, height:3, background:"var(--accent)", borderRadius:3}}/>
          <span style={{width:24, height:3, background:"var(--rule)", borderRadius:3}}/>
          <span style={{width:24, height:3, background:"var(--rule)", borderRadius:3}}/>
        </div>
        <span style={{width:22}}/>
      </div>

      <div className="eyebrow">Step 2 · Verify</div>
      <h2 className="disp" style={{fontSize:32, fontStyle:"italic", lineHeight:1.05, margin:"6px 0 6px"}}>Six digits, please.</h2>
      <p style={{color:"var(--ink-3)", fontSize:13, marginBottom:6}}>
        OTP sent to <strong style={{color:"var(--ink)"}}>+91 98765 43210</strong>
      </p>
      <span style={{color:"var(--accent)", fontSize:12, fontWeight:600, marginBottom:22}}>Edit number</span>

      <div style={{display:"flex", gap:8, marginBottom:18}}>
        {["3","9","2","1","4",""].map((d,i)=>(
          <div key={i} style={{flex:1, height:54, border:`1px solid ${d? "var(--accent)" : "var(--rule)"}`, borderRadius:"var(--radius)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, fontFamily:"var(--display)", color:"var(--ink)", background: d? "color-mix(in srgb, var(--accent) 5%, var(--paper))" : "var(--paper)"}}>{d}</div>
        ))}
      </div>

      <div style={{fontSize:12, color:"var(--ink-3)"}}>
        Resend OTP in <strong style={{color:"var(--ink)"}}>00:24</strong>
      </div>
      <div style={{marginTop:14, padding:"10px 12px", background:"var(--bg-sub)", borderRadius:8, fontSize:11, color:"var(--ink-2)", display:"flex", alignItems:"center", gap:8}}>
        <IconMA.whatsapp/> WhatsApp OTP also sent
      </div>

      <button className="btn" style={{width:"100%", justifyContent:"center", padding:"14px", marginTop:"auto"}}>Verify <IconMA.arrow/></button>
    </div>
  );
}

function ScreenName() {
  return (
    <div style={{padding:"18px", height:"100%", display:"flex", flexDirection:"column", background:"var(--paper)"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24}}>
        <span style={{fontSize:22}}>←</span>
        <div style={{display:"flex", gap:4}}>
          <span style={{width:24, height:3, background:"var(--accent)", borderRadius:3}}/>
          <span style={{width:24, height:3, background:"var(--accent)", borderRadius:3}}/>
          <span style={{width:24, height:3, background:"var(--accent)", borderRadius:3}}/>
          <span style={{width:24, height:3, background:"var(--rule)", borderRadius:3}}/>
        </div>
        <span style={{width:22}}/>
      </div>

      <div className="eyebrow">Step 3 · About you</div>
      <h2 className="disp" style={{fontSize:30, fontStyle:"italic", lineHeight:1.05, margin:"6px 0 6px"}}>Who do we send it to?</h2>
      <p className="hindi" style={{color:"var(--ink-3)", fontSize:13, marginBottom:22}}>नाम बताइए, हम चुटकी में पैक कर देंगे</p>

      <label className="label">Full name</label>
      <input className="input" defaultValue="Anjali Verma" style={{marginBottom:14}}/>

      <label className="label">Email <span style={{color:"var(--ink-3)", textTransform:"none", letterSpacing:0}}>(for invoice — optional)</span></label>
      <input className="input" placeholder="anjali@email.com" style={{marginBottom:18}}/>

      <div style={{padding:"12px 14px", background:"var(--bg-sub)", borderRadius:8, display:"flex", alignItems:"center", gap:12}}>
        <span className="seal" style={{width:38, height:38, fontSize:14}}>★</span>
        <div style={{flex:1}}>
          <div style={{fontSize:13, fontWeight:600}}>Earn Mithai Points</div>
          <div style={{fontSize:11, color:"var(--ink-3)"}}>2% back on every order · auto-enrolled</div>
        </div>
      </div>

      <button className="btn" style={{width:"100%", justifyContent:"center", padding:"14px", marginTop:"auto"}}>Continue to address <IconMA.arrow/></button>
    </div>
  );
}

function ScreenAddress() {
  return (
    <div style={{padding:"18px", height:"100%", display:"flex", flexDirection:"column", background:"var(--paper)"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18}}>
        <span style={{fontSize:22}}>←</span>
        <div style={{display:"flex", gap:4}}>
          <span style={{width:24, height:3, background:"var(--accent)", borderRadius:3}}/>
          <span style={{width:24, height:3, background:"var(--accent)", borderRadius:3}}/>
          <span style={{width:24, height:3, background:"var(--accent)", borderRadius:3}}/>
          <span style={{width:24, height:3, background:"var(--accent)", borderRadius:3}}/>
        </div>
        <span style={{width:22}}/>
      </div>

      <div className="eyebrow">Step 4 · Delivery</div>
      <h2 className="disp" style={{fontSize:26, fontStyle:"italic", lineHeight:1.05, margin:"6px 0 14px"}}>How should we send it?</h2>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, marginBottom:14, padding:4, background:"var(--bg-sub)", borderRadius:8}}>
        <div style={{padding:"8px 4px", textAlign:"center", fontSize:11, background:"var(--paper)", borderRadius:6, fontWeight:600, boxShadow:"var(--shadow-sm)"}}>🚚 Delivery</div>
        <div style={{padding:"8px 4px", textAlign:"center", fontSize:11, color:"var(--ink-3)"}}>🏬 Pickup</div>
        <div style={{padding:"8px 4px", textAlign:"center", fontSize:11, color:"var(--ink-3)"}}>📦 Ship anywhere</div>
      </div>

      <label className="label">Delivery address</label>
      <textarea className="input" rows="3" defaultValue="Flat 3B, Sundar Apartments, Kiratpura Road, Bhind, MP 477001"/>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:10}}>
        <div>
          <label className="label">PIN code</label>
          <input className="input" defaultValue="477001"/>
        </div>
        <div>
          <label className="label">Landmark</label>
          <input className="input" defaultValue="Near Pustak Bazar"/>
        </div>
      </div>

      <div style={{marginTop:14, padding:"10px 12px", background:"color-mix(in srgb, var(--ok) 12%, transparent)", borderRadius:8, fontSize:11, color:"var(--ok)", display:"flex", alignItems:"center", gap:8}}>
        <IconMA.check/> Free same-day delivery available · before 4 PM today
      </div>

      <label style={{display:"flex", alignItems:"center", gap:8, marginTop:14, fontSize:12, color:"var(--ink-2)"}}>
        <input type="checkbox" defaultChecked/> Save this address for next time
      </label>

      <button className="btn" style={{width:"100%", justifyContent:"center", padding:"14px", marginTop:"auto"}}>
        Pay <RupeeMA v={3435}/> via UPI <IconMA.arrow/>
      </button>
    </div>
  );
}

function ScreenPay() {
  return (
    <div style={{padding:"18px", height:"100%", display:"flex", flexDirection:"column", background:"var(--paper)"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14}}>
        <span style={{fontSize:22}}>←</span>
        <span className="disp" style={{fontSize:16, fontStyle:"italic"}}>Payment</span>
        <span style={{width:22}}/>
      </div>

      <div style={{padding:"14px", background:"var(--bg-sub)", borderRadius:10, marginBottom:14}}>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--ink-2)", marginBottom:4}}>
          <span>Order total</span>
          <strong style={{fontSize:18, color:"var(--ink)"}} className="disp"><RupeeMA v={3435}/></strong>
        </div>
        <div style={{fontSize:10, color:"var(--ink-3)"}}>3 items · Delivery to 477001</div>
      </div>

      <div className="eyebrow" style={{marginBottom:10}}>Pay using UPI</div>
      {[
        ["PhonePe", "anjali@ybl", true],
        ["Google Pay", "anjali.v@oksbi", false],
        ["Paytm", "9876543210@paytm", false],
      ].map(([app, vpa, sel])=>(
        <div key={app} style={{display:"flex", alignItems:"center", gap:12, padding:"12px 14px", border:`1px solid ${sel? "var(--accent)" : "var(--rule)"}`, borderRadius:"var(--radius)", marginBottom:8, background: sel? "color-mix(in srgb, var(--accent) 4%, var(--paper))" : "var(--paper)"}}>
          <div style={{width:34, height:34, borderRadius:8, background:"var(--bg-sub)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700}}>UPI</div>
          <div style={{flex:1}}>
            <div style={{fontSize:13, fontWeight:600}}>{app}</div>
            <div style={{fontSize:11, color:"var(--ink-3)"}}>{vpa}</div>
          </div>
          {sel && <div style={{width:18, height:18, borderRadius:"50%", background:"var(--accent)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center"}}><IconMA.check style={{width:12, height:12}}/></div>}
        </div>
      ))}

      <div style={{textAlign:"center", padding:"8px 0", fontSize:11, color:"var(--ink-3)"}}>or scan QR · pay COD · pay later</div>

      <button className="btn" style={{width:"100%", justifyContent:"center", padding:"14px", marginTop:"auto"}}>
        Pay <RupeeMA v={3435}/>
      </button>
      <div style={{textAlign:"center", marginTop:10, fontSize:10, color:"var(--ink-3)"}}>
        <IconMA.shield style={{display:"inline", verticalAlign:"middle", width:11, height:11}}/> Razorpay secure · 256-bit encryption
      </div>
    </div>
  );
}

function ScreenDone() {
  return (
    <div style={{padding:"22px", height:"100%", display:"flex", flexDirection:"column", background:"var(--paper)", textAlign:"center"}}>
      <div style={{height:60}}/>
      <div style={{width:90, height:90, borderRadius:"50%", background:"color-mix(in srgb, var(--ok) 14%, transparent)", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--ok)"}}>
        <IconMA.check style={{width:48, height:48}}/>
      </div>
      <h2 className="disp" style={{fontStyle:"italic", fontSize:32, margin:"22px 0 4px"}}>Mithai on its way!</h2>
      <p className="hindi" style={{color:"var(--accent)", fontSize:15, marginBottom:18}}>मिठाई पैक हो रही है ✨</p>

      <div style={{padding:"14px", background:"var(--bg-sub)", borderRadius:10, textAlign:"left"}}>
        <div style={{fontSize:11, color:"var(--ink-3)", letterSpacing:".1em", textTransform:"uppercase"}}>Order</div>
        <div className="disp" style={{fontSize:18}}>#BS-2026-04812</div>
        <div style={{height:1, background:"var(--rule)", margin:"10px 0"}}/>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4}}><span>Total paid</span><strong><RupeeMA v={3435}/></strong></div>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4}}><span>Delivery by</span><strong>Today, 6 PM</strong></div>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}><span>Mithai Points</span><strong style={{color:"var(--gold)"}}>+69 pts</strong></div>
      </div>

      <div style={{marginTop:18, fontSize:12, color:"var(--ink-2)", textAlign:"left"}}>
        <div style={{display:"flex", gap:10, marginBottom:10}}>
          <span style={{width:18, height:18, borderRadius:"50%", background:"var(--ok)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11}}>✓</span>
          <div>Order received</div>
        </div>
        <div style={{display:"flex", gap:10, marginBottom:10}}>
          <span style={{width:18, height:18, borderRadius:"50%", background:"var(--accent)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11}}>●</span>
          <div>Packing now · <span style={{color:"var(--accent)"}}>live</span></div>
        </div>
        <div style={{display:"flex", gap:10, marginBottom:10, opacity:.5}}>
          <span style={{width:18, height:18, borderRadius:"50%", border:"1px solid var(--rule-strong)"}}/>
          <div>Out for delivery</div>
        </div>
        <div style={{display:"flex", gap:10, opacity:.5}}>
          <span style={{width:18, height:18, borderRadius:"50%", border:"1px solid var(--rule-strong)"}}/>
          <div>Delivered</div>
        </div>
      </div>

      <button className="btn btn-ghost" style={{width:"100%", justifyContent:"center", padding:"12px", marginTop:"auto"}}>Track on WhatsApp</button>
    </div>
  );
}

function MobileFlowA() {
  return (
    <div className="artboard dir-a" data-screen-label="A · Mobile Flow" style={{padding:"40px 30px", display:"flex", gap:24, alignItems:"flex-start", overflowX:"auto"}}>
      <div style={{position:"absolute", left:30, top:18}}>
        <div className="eyebrow">Storefront mobile</div>
        <div className="disp" style={{fontSize:22, fontStyle:"italic"}}>Cart → checkout-first signup → pay</div>
      </div>
      <div style={{flex:"0 0 60px"}}/>
      <PhoneFrame label="01 · Cart"><ScreenCart/></PhoneFrame>
      <PhoneFrame label="02 · Phone"><ScreenPhone/></PhoneFrame>
      <PhoneFrame label="03 · OTP"><ScreenOTP/></PhoneFrame>
      <PhoneFrame label="04 · Name"><ScreenName/></PhoneFrame>
      <PhoneFrame label="05 · Address"><ScreenAddress/></PhoneFrame>
      <PhoneFrame label="06 · Pay (UPI)"><ScreenPay/></PhoneFrame>
      <PhoneFrame label="07 · Done"><ScreenDone/></PhoneFrame>
    </div>
  );
}

window.MobileFlowA = MobileFlowA;
