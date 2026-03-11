import { useState, useRef, useEffect } from "react";

// ── Import your images from src/assets/before-after/ ──
import acneBefore    from "../../assets/before-after/acne-before.jpg";
import acneAfter     from "../../assets/before-after/acne-after.jpg";
import pigmentBefore from "../../assets/before-after/pigment-before.jpg";
import pigmentAfter  from "../../assets/before-after/pigment-after.jpg";
import laserBefore   from "../../assets/before-after/laser-before.jpg";
import laserAfter    from "../../assets/before-after/laser-after.jpg";

const treatments = [
  {
    id: 1, label: "Acne Treatment", tag: "Most Popular",
    duration: "6 weeks", icon: "✦", result: "95% clearer skin",
    beforeImg: acneBefore, afterImg: acneAfter,
  },
  {
    id: 2, label: "Pigmentation", tag: "Editor's Pick",
    duration: "8 weeks", icon: "◈", result: "90% fade achieved",
    beforeImg: pigmentBefore, afterImg: pigmentAfter,
  },
  {
    id: 3, label: "Laser Resurfacing", tag: "Advanced",
    duration: "4 weeks", icon: "⬡", result: "Visibly smoother",
    beforeImg: laserBefore, afterImg: laserAfter,
  },
];

function ComparisonWidget({ t }) {
  const [sliderVal, setSliderVal] = useState(50);

  return (
    <div>
      <div style={{
        width: "100%", paddingBottom: "70%",
        position: "relative", borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 28px 80px rgba(61,43,122,0.18)",
      }}>
        {/* BEFORE layer */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <img src={t.beforeImg} alt="before"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position:"absolute", top:16, left:16, zIndex:4, background:"rgba(18,12,28,0.58)", backdropFilter:"blur(8px)", color:"white", padding:"5px 16px", borderRadius:100, fontSize:10, fontWeight:700, letterSpacing:2.5, textTransform:"uppercase" }}>Before</div>
          <div style={{ position:"absolute", bottom:16, left:16, zIndex:4, background:"rgba(18,12,28,0.45)", backdropFilter:"blur(8px)", color:"rgba(255,255,255,0.88)", padding:"5px 14px", borderRadius:100, fontSize:11 }}>{t.duration} ago</div>
        </div>

        {/* AFTER layer (divisor) */}
        <div style={{
          position: "absolute", top: 0, left: 0, zIndex: 2,
          width: `${sliderVal}%`, height: "100%",
          overflow: "hidden",
          boxShadow: "4px 0 20px rgba(0,0,0,0.25)",
        }}>
          <div style={{ position:"absolute", top:0, left:0, height:"100%", width:`${10000/sliderVal}%` }}>
            <img src={t.afterImg} alt="after"
              style={{ height:"100%", objectFit:"cover", display:"block", minWidth:`${10000/sliderVal}%` }} />
          </div>
          {/* Divider line */}
          <div style={{ position:"absolute", top:0, right:0, width:3, height:"100%", background:"white", boxShadow:"0 0 14px rgba(255,255,255,0.9),0 0 32px rgba(123,94,167,0.5)", zIndex:5 }}/>
          <div style={{ position:"absolute", top:16, right:16, zIndex:6, background:"rgba(61,43,122,0.82)", backdropFilter:"blur(8px)", color:"white", padding:"5px 16px", borderRadius:100, fontSize:10, fontWeight:700, letterSpacing:2.5, textTransform:"uppercase" }}>After</div>
          <div style={{ position:"absolute", bottom:16, right:16, zIndex:6, background:"rgba(61,43,122,0.75)", backdropFilter:"blur(8px)", color:"white", padding:"5px 14px", borderRadius:100, fontSize:11, fontWeight:600 }}>✦ {t.result}</div>
        </div>

        {/* Handle */}
        <div style={{
          position:"absolute", top:"50%", left:`${sliderVal}%`,
          transform:"translateY(-50%) translateX(-50%)",
          width:52, height:52, borderRadius:"50%", background:"white",
          boxShadow:"0 0 0 4px rgba(255,255,255,0.5),0 4px 24px rgba(61,43,122,0.35)",
          display:"flex", alignItems:"center", justifyContent:"center",
          zIndex:6, pointerEvents:"none",
        }}>
          <div style={{ width:0,height:0,borderTop:"7px solid transparent",borderBottom:"7px solid transparent",borderRight:"8px solid #7B5EA7",marginRight:5 }}/>
          <div style={{ width:0,height:0,borderTop:"7px solid transparent",borderBottom:"7px solid transparent",borderLeft:"8px solid #7B5EA7",marginLeft:5 }}/>
        </div>

        {/* Invisible range input */}
        <input type="range" min="0" max="100" value={sliderVal}
          onChange={e => setSliderVal(Number(e.target.value))}
          style={{ position:"absolute", top:"50%", left:-26, transform:"translateY(-50%)", width:"calc(100% + 52px)", height:52, opacity:0, cursor:"ew-resize", zIndex:10, margin:0 }}
        />
      </div>

      {/* Progress bar */}
      <div style={{ marginTop:12, height:4, background:"rgba(123,94,167,0.13)", borderRadius:4, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${sliderVal}%`, background:"linear-gradient(90deg,#C4B0E8,#7B5EA7)", borderRadius:4 }}/>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
        <span style={{ fontSize:11, color:"#A8A5C0", letterSpacing:1.5, textTransform:"uppercase" }}>Before</span>
        <span style={{ fontSize:11, color:"#7B5EA7", fontWeight:700, letterSpacing:1.5, textTransform:"uppercase" }}>After</span>
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const t = treatments[active];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) sectionRef.current?.classList.add("ba-vis"); },
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      background:"linear-gradient(160deg,#FAF8FE 0%,#F0EDF8 55%,#EDE8F5 100%)",
      padding:"100px 24px 110px", position:"relative", overflow:"hidden",
      fontFamily:"'DM Sans',sans-serif",
    }}>
      <div style={{ position:"absolute",top:"-12%",right:"-6%",width:520,height:520,borderRadius:"50%",background:"radial-gradient(circle,rgba(123,94,167,0.07) 0%,transparent 70%)",pointerEvents:"none" }}/>
      <div style={{ position:"absolute",bottom:"-10%",left:"-6%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(123,94,167,0.05) 0%,transparent 70%)",pointerEvents:"none" }}/>

      <div style={{ maxWidth:860, margin:"0 auto" }}>

        {/* Header */}
        <div className="ba-head" style={{ textAlign:"center", marginBottom:56 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(123,94,167,0.1)", border:"1px solid rgba(123,94,167,0.2)", borderRadius:100, padding:"8px 20px", marginBottom:22 }}>
            <span style={{ color:"#7B5EA7" }}>✦</span>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:2.5, textTransform:"uppercase", color:"#6B4FA0" }}>Real Results · Real People</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(34px,5vw,56px)", fontWeight:700, color:"#1E1A3C", lineHeight:1.15, marginBottom:14 }}>
            Witness the <em style={{ color:"#7B5EA7", fontStyle:"italic" }}>Transformation</em>
          </h2>
          <p style={{ fontSize:15, color:"#6B6585", maxWidth:460, margin:"0 auto", lineHeight:1.85 }}>
            Drag the slider to reveal the difference — real outcomes from our certified dermatologists.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", justifyContent:"center", gap:10, marginBottom:44, flexWrap:"wrap" }}>
          {treatments.map((tr,i) => (
            <button key={tr.id} onClick={()=>setActive(i)} style={{
              background: active===i?"#3D2B7A":"rgba(255,255,255,0.82)",
              color:      active===i?"white":"#5A5480",
              border:     active===i?"none":"1.5px solid rgba(100,80,180,0.2)",
              padding:"10px 22px", borderRadius:100, fontSize:13, fontWeight:600,
              cursor:"pointer", transition:"all 0.28s",
              boxShadow: active===i?"0 4px 18px rgba(61,43,122,0.28)":"none",
              display:"flex", alignItems:"center", gap:7,
            }}>
              <span>{tr.icon}</span> {tr.label}
              {active===i && <span style={{ background:"rgba(255,255,255,0.22)", borderRadius:20, padding:"1px 8px", fontSize:10 }}>{tr.tag}</span>}
            </button>
          ))}
        </div>

        {/* Widget — key resets slider on tab change */}
        <div className="ba-widget">
          <ComparisonWidget key={active} t={t} />
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginTop:32 }}>
          {[
            { icon:"🕐", label:"Treatment Duration", val:t.duration },
            { icon:"📈", label:"Success Rate",        val:"97%"      },
            { icon:"⭐", label:"Patient Rating",      val:"4.9 / 5"  },
          ].map((item,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.68)", backdropFilter:"blur(12px)", border:"1.5px solid rgba(100,80,180,0.12)", borderRadius:16, padding:"16px 20px", display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ fontSize:22 }}>{item.icon}</span>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#1E1A3C" }}>{item.val}</div>
                <div style={{ fontSize:10, color:"#A8A5C0", letterSpacing:1.5, textTransform:"uppercase", marginTop:3 }}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign:"center", marginTop:52 }}>
          <button
            style={{ background:"#3D2B7A", color:"white", border:"none", padding:"17px 48px", borderRadius:100, fontSize:15, fontWeight:600, cursor:"pointer", boxShadow:"0 6px 28px rgba(61,43,122,0.28)", transition:"all 0.3s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.background="#4e38a0";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.background="#3D2B7A";}}
          >
            Start Your Transformation →
          </button>
          <p style={{ fontSize:12, color:"#B0ADCC", marginTop:14 }}>Free consultation · No commitment required</p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        .ba-head   { opacity:0; transform:translateY(28px); transition:opacity 0.85s ease,transform 0.85s ease; }
        .ba-widget { opacity:0; transform:translateY(22px); transition:opacity 0.85s ease 0.2s,transform 0.85s ease 0.2s; }
        .ba-vis .ba-head, .ba-vis .ba-widget { opacity:1; transform:none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:52px; height:52px; border-radius:50%; background:transparent; cursor:ew-resize; }
        input[type=range]::-moz-range-thumb { width:52px; height:52px; border-radius:50%; background:transparent; border:none; cursor:ew-resize; }
        input[type=range]:focus { outline:none; }
        @media(max-width:600px){ section{ padding:70px 16px 80px !important; } }
      `}</style>
    </section>
  );
}
