// Shared atoms and SVG icons used by both directions

const Icon = {
  search: (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  bag:    (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>,
  user:   (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>,
  heart:  (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z"/></svg>,
  menu:   (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M3 7h18M3 12h18M3 17h18"/></svg>,
  arrow:  (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  star:   (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 3 7 7 .6-5.3 4.7L18.5 22 12 18l-6.5 4 1.8-7.7L2 9.6 9 9z"/></svg>,
  shield: (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/></svg>,
  truck:  (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>,
  store:  (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M4 9h16l-1-4H5L4 9Z"/><path d="M5 9v11h14V9"/><path d="M10 20v-6h4v6"/></svg>,
  pkg:    (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="m3 7 9-4 9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>,
  check:  (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="m5 12 5 5L20 7"/></svg>,
  plus:   (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  pin:    (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  phone:  (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M5 5a2 2 0 0 1 2-2h2l2 5-2 1a10 10 0 0 0 5 5l1-2 5 2v2a2 2 0 0 1-2 2A14 14 0 0 1 5 5Z"/></svg>,
  whatsapp:(p={}) => <svg className="icon" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M20 12a8 8 0 1 1-3.4-6.5L20 4l-1.6 3.4A8 8 0 0 1 20 12Zm-3.7 1.6c-.2-.1-1.2-.6-1.4-.6-.2 0-.3 0-.5.2l-.6.7c-.1.1-.2.1-.4 0a5.6 5.6 0 0 1-2.7-2.4c-.2-.3 0-.4.1-.5l.3-.4c.1-.1.1-.2.2-.4 0-.1 0-.3 0-.4l-.6-1.4c-.2-.4-.4-.4-.5-.4h-.4c-.1 0-.4 0-.6.3-.2.3-.7.7-.7 1.7 0 1 .7 2 .8 2.1.1.2 1.5 2.4 3.6 3.3 1.3.5 1.8.5 2.4.4.4 0 1.2-.5 1.4-1 .2-.5.2-.9.1-1Z"/></svg>,
  edit:   (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="m4 20 4-1 11-11-3-3L5 16l-1 4Z"/></svg>,
  trash:  (p={}) => <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>,
  rupee:  () => <span style={{fontFamily:"system-ui"}}>₹</span>,
  upi:    () => <span style={{fontWeight:700, letterSpacing: ".05em"}}>UPI</span>,
};

function Rupee({ v }) {
  return <span><span style={{fontFamily:"system-ui"}}>₹</span>{v.toLocaleString("en-IN")}</span>;
}

// Header used in both directions; slight per-direction styling
function ShopHeader({ dir }) {
  const logo = dir === "a" ? (
    <div style={{display:"flex", alignItems:"center", gap:14}}>
      <div className="seal">B</div>
      <div>
        <div className="disp" style={{fontSize:24, lineHeight:1, letterSpacing:".01em"}}>Bangali Sweets</div>
        <div className="hindi" style={{fontSize:13, color:"var(--accent)", marginTop:3}}>
          <span className="swash">बंगाली स्वीट्स</span>
        </div>
      </div>
    </div>
  ) : (
    <div style={{display:"flex", alignItems:"center", gap:12}}>
      <svg width="38" height="38" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="19" fill="var(--accent)"/>
        <text x="20" y="26" textAnchor="middle" fontFamily="var(--display)" fontSize="20" fill="#fff">B</text>
      </svg>
      <div>
        <div className="disp" style={{fontSize:22, lineHeight:1}}>Bangali Sweets</div>
        <div className="hindi" style={{fontSize:12, color:"var(--ink-3)", marginTop:2}}>बंगाली स्वीट्स · since 1987</div>
      </div>
    </div>
  );

  const navLinks = ["Sweets","Namkeen","Dry Fruits","Dairy","Bakery","Hampers","Birthday"];

  return (
    <header style={{borderBottom:"1px solid var(--rule)", background:"var(--paper)"}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 48px", fontSize:12, color:"var(--ink-3)", borderBottom:"1px solid var(--rule)"}}>
        <span>Free delivery on orders above ₹999 in Bhind · Same-day before 4 PM</span>
        <span style={{display:"flex", gap:18}}>
          <span>Track Order</span><span>Bulk &amp; Corporate</span><span style={{color:"var(--accent)", fontWeight:600}}>📞 0797 4096 667</span>
        </span>
      </div>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 48px"}}>
        {logo}
        <div style={{flex:1, maxWidth:480, margin:"0 48px", position:"relative"}}>
          <input className="input" placeholder="Search Kaju Katli, Diwali hampers, dry fruits…" style={{paddingLeft:42, background:"var(--bg-sub)", border:"1px solid transparent"}}/>
          <span style={{position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"var(--ink-3)"}}><Icon.search/></span>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:22, color:"var(--ink-2)"}}>
          <div style={{display:"flex", alignItems:"center", gap:6, fontSize:13}}><Icon.pin/> Bhind, MP</div>
          <Icon.heart/>
          <Icon.user/>
          <div style={{display:"flex", alignItems:"center", gap:6, fontSize:13, fontWeight:600, color:"var(--ink)"}}>
            <Icon.bag/> Cart · 3
          </div>
        </div>
      </div>
      <nav style={{display:"flex", gap:32, padding:"12px 48px", borderTop:"1px solid var(--rule)", fontSize:13, fontWeight:500}}>
        {navLinks.map(l => (
          <span key={l} style={{cursor:"pointer", color: l==="Hampers" ? "var(--accent)" : "var(--ink-2)", fontWeight: l==="Hampers" ? 700 : 500}}>
            {l}
          </span>
        ))}
        <span style={{marginLeft:"auto", color:"var(--ink-3)"}}>About · Our Outlet · Track Order · My Account</span>
      </nav>
    </header>
  );
}

window.BBShared = { Icon, Rupee, ShopHeader };
