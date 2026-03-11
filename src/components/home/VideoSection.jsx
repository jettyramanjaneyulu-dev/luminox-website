import { useState, useRef, useEffect } from "react";

const DEFAULT_VIDEOS = [
  {
    id: 1,
    youtubeId: "LXb3EKWsInQ",
    title: "Acne Treatment Results",
    subtitle: "Patient Transformation",
  },
  {
    id: 2,
    youtubeId: "dQw4w9WgXcQ",
    title: "Laser Skin Resurfacing",
    subtitle: "Advanced Procedure",
  },
  {
    id: 3,
    youtubeId: "9bZkp7q19f0",
    title: "Pigmentation Treatment",
    subtitle: "Before & After",
  },
  {
    id: 4,
    youtubeId: "kJQP7kiw5Fk",
    title: "Hair Restoration",
    subtitle: "Real Patient Story",
  },
  {
    id: 5,
    youtubeId: "fJ9rUzIMcZQ",
    title: "Anti-Ageing Protocol",
    subtitle: "Expert Consultation",
  },
];

function extractYoutubeId(input) {
  input = input.trim();
  // Already an ID (11 chars, no slash)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  // Full URL
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = input.match(p);
    if (m) return m[1];
  }
  return null;
}

function EditModal({ video, onSave, onClose }) {
  const [url,      setUrl]      = useState(video.youtubeId);
  const [title,    setTitle]    = useState(video.title);
  const [subtitle, setSubtitle] = useState(video.subtitle);
  const [error,    setError]    = useState("");

  const handleSave = () => {
    const id = extractYoutubeId(url);
    if (!id) { setError("Invalid YouTube URL or ID"); return; }
    onSave({ ...video, youtubeId: id, title, subtitle });
  };

  const inp = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    border: "1.5px solid rgba(123,94,167,0.25)",
    fontFamily: "'DM Sans',sans-serif", fontSize: 13,
    background: "rgba(255,255,255,0.9)", color: "#1E1A3C",
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(10,5,25,0.65)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }} onClick={onClose}>
      <div style={{
        background: "white", borderRadius: 20, padding: 32,
        width: "100%", maxWidth: 440,
        boxShadow: "0 24px 80px rgba(61,43,122,0.25)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#1E1A3C", marginBottom: 6 }}>
          Edit Video #{video.id}
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#8A86A8", marginBottom: 24, marginTop: 0 }}>
          Paste any YouTube link or just the video ID
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#6B4FA0", display: "block", marginBottom: 6 }}>
              YouTube URL or Video ID
            </label>
            <input
              style={{ ...inp, borderColor: error ? "rgba(200,60,60,0.5)" : "rgba(123,94,167,0.25)" }}
              value={url} onChange={e => { setUrl(e.target.value); setError(""); }}
              placeholder="https://youtube.com/watch?v=... or dQw4w9WgXcQ"
            />
            {error && <div style={{ fontSize: 11, color: "#c03030", marginTop: 5 }}>⚠ {error}</div>}
            <div style={{ fontSize: 11, color: "#A8A5C0", marginTop: 5 }}>
              Supports: youtube.com/watch, youtu.be, /shorts, /embed
            </div>
          </div>

          <div>
            <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#6B4FA0", display: "block", marginBottom: 6 }}>
              Video Title
            </label>
            <input style={inp} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Acne Treatment Results" />
          </div>

          <div>
            <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#6B4FA0", display: "block", marginBottom: 6 }}>
              Subtitle
            </label>
            <input style={inp} value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="e.g. Patient Transformation" />
          </div>
        </div>

        {/* Preview thumbnail */}
        {extractYoutubeId(url) && (
          <div style={{ marginTop: 18, borderRadius: 10, overflow: "hidden", position: "relative" }}>
            <img
              src={`https://img.youtube.com/vi/${extractYoutubeId(url)}/mqdefault.jpg`}
              alt="preview" style={{ width: "100%", display: "block", borderRadius: 10 }}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(61,43,122,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "14px solid #3D2B7A", marginLeft: 3 }}/>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "12px", borderRadius: 100,
            border: "1.5px solid rgba(100,80,180,0.2)",
            background: "transparent", color: "#5A5480",
            fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={handleSave} style={{
            flex: 2, padding: "12px", borderRadius: 100,
            border: "none", background: "#3D2B7A", color: "white",
            fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 4px 18px rgba(61,43,122,0.3)",
          }}>Save Video</button>
        </div>
      </div>
    </div>
  );
}

export default function VideoSection() {
  const [videos,      setVideos]      = useState(DEFAULT_VIDEOS);
  const [centerIdx,   setCenterIdx]   = useState(2);
  const [editingIdx,  setEditingIdx]  = useState(null);
  const [playing,     setPlaying]     = useState(null);
  const [autoPlay,    setAutoPlay]    = useState(true);
  const sectionRef  = useRef(null);
  const intervalRef = useRef(null);

  // Auto-advance center
  useEffect(() => {
    if (!autoPlay) return;
    intervalRef.current = setInterval(() => {
      setCenterIdx(p => (p + 1) % videos.length);
      setPlaying(null);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [autoPlay, videos.length]);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) sectionRef.current?.classList.add("vs-vis"); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleCardClick = (i) => {
    if (i === centerIdx) {
      setPlaying(playing === i ? null : i);
    } else {
      setCenterIdx(i);
      setPlaying(null);
      setAutoPlay(false);
      clearInterval(intervalRef.current);
    }
  };

  const saveVideo = (updated) => {
    setVideos(vs => vs.map(v => v.id === updated.id ? updated : v));
    setEditingIdx(null);
    setPlaying(null);
  };

  // Build display order: put centerIdx in middle slot (index 2 of 5)
  const getOrder = () => {
    const n = videos.length;
    return [-2, -1, 0, 1, 2].map(offset => (centerIdx + offset + n) % n);
  };
  const order = getOrder();

  const cardConfig = [
    { scale: 0.62, opacity: 0.45, z: 1,  translateX: -300, blur: 3 },
    { scale: 0.78, opacity: 0.65, z: 2,  translateX: -160, blur: 1.5 },
    { scale: 1.00, opacity: 1.00, z: 3,  translateX:    0, blur: 0 },
    { scale: 0.78, opacity: 0.65, z: 2,  translateX:  160, blur: 1.5 },
    { scale: 0.62, opacity: 0.45, z: 1,  translateX:  300, blur: 3 },
  ];

  return (
    <section ref={sectionRef} style={{
      background: "linear-gradient(160deg,#1A1030 0%,#2C1F50 50%,#1E1540 100%)",
      padding: "100px 0 110px",
      position: "relative", overflow: "hidden",
      fontFamily: "'DM Sans',sans-serif",
    }}>
      {/* bg glow */}
      <div style={{ position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:700,height:400,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(123,94,167,0.18) 0%,transparent 70%)",pointerEvents:"none" }}/>
      <div style={{ position:"absolute",top:"-10%",right:"-5%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,176,232,0.08) 0%,transparent 70%)",pointerEvents:"none" }}/>
      <div style={{ position:"absolute",bottom:"-10%",left:"-5%",width:350,height:350,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,176,232,0.06) 0%,transparent 70%)",pointerEvents:"none" }}/>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div className="vs-head" style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(196,176,232,0.12)", border:"1px solid rgba(196,176,232,0.2)", borderRadius:100, padding:"8px 20px", marginBottom:22 }}>
            <span style={{ color:"#C4B0E8" }}>▶</span>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:2.5, textTransform:"uppercase", color:"#C4B0E8" }}>Patient Stories & Results</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(34px,5vw,56px)", fontWeight:700, color:"white", lineHeight:1.15, marginBottom:14 }}>
            See the{" "}
            <em style={{ color:"#C4B0E8", fontStyle:"italic" }}>Results in Action</em>
          </h2>
          <p style={{ fontSize:15, color:"rgba(196,176,232,0.7)", maxWidth:460, margin:"0 auto", lineHeight:1.85 }}>
            Watch real patient journeys and treatment walkthroughs from our certified dermatologists.
          </p>
        </div>

        {/* Carousel */}
        <div className="vs-carousel"
          style={{
            position: "relative",
            height: 360,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {order.map((vidIdx, slotIdx) => {
            const cfg   = cardConfig[slotIdx];
            const video = videos[vidIdx];
            const isCenter = slotIdx === 2;
            const isPlaying = playing === vidIdx && isCenter;

            return (
              <div
                key={video.id}
                onClick={() => handleCardClick(vidIdx)}
                style={{
                  position: "absolute",
                  width: 340,
                  borderRadius: 18,
                  overflow: "hidden",
                  transform: `translateX(${cfg.translateX}px) scale(${cfg.scale})`,
                  opacity: cfg.opacity,
                  zIndex: cfg.z,
                  filter: `blur(${cfg.blur}px)`,
                  transition: "all 0.55s cubic-bezier(0.22,1,0.36,1)",
                  cursor: isCenter ? "pointer" : "pointer",
                  boxShadow: isCenter
                    ? "0 24px 80px rgba(0,0,0,0.5), 0 0 0 2px rgba(196,176,232,0.3)"
                    : "0 12px 40px rgba(0,0,0,0.3)",
                }}
              >
                {/* Iframe or thumbnail */}
                <div style={{ position: "relative", paddingBottom: "56.25%", background: "#0a0518" }}>
                  {isPlaying ? (
                    <iframe
                      style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none" }}
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={video.title}
                    />
                  ) : (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        onError={e => { e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`; }}
                        alt={video.title}
                        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}
                      />
                      {/* Overlay */}
                      <div style={{
                        position:"absolute", inset:0,
                        background: isCenter
                          ? "linear-gradient(180deg,rgba(0,0,0,0.1) 0%,rgba(10,5,30,0.75) 100%)"
                          : "linear-gradient(180deg,rgba(0,0,0,0.2) 0%,rgba(10,5,30,0.85) 100%)",
                      }}/>
                      {/* Play button */}
                      {isCenter && (
                        <div style={{
                          position:"absolute", top:"50%", left:"50%",
                          transform:"translate(-50%,-60%)",
                          width:60, height:60, borderRadius:"50%",
                          background:"rgba(255,255,255,0.92)",
                          boxShadow:"0 4px 24px rgba(0,0,0,0.4)",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          transition:"transform 0.2s",
                        }}>
                          <div style={{ width:0,height:0,borderTop:"11px solid transparent",borderBottom:"11px solid transparent",borderLeft:"18px solid #3D2B7A",marginLeft:4 }}/>
                        </div>
                      )}
                      {/* Text */}
                      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 18px" }}>
                        <div style={{ fontSize:10, color:"rgba(196,176,232,0.8)", letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>{video.subtitle}</div>
                        <div style={{ fontFamily:"'Playfair Display',serif", fontSize: isCenter ? 17 : 14, fontWeight:700, color:"white", lineHeight:1.3 }}>{video.title}</div>
                      </div>
                    </>
                  )}
                </div>

                {/* Edit button — only on center */}
                {isCenter && !isPlaying && (
                  <button
                    onClick={e => { e.stopPropagation(); setEditingIdx(vidIdx); setAutoPlay(false); }}
                    style={{
                      position:"absolute", top:12, right:12,
                      background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)",
                      border:"1px solid rgba(255,255,255,0.25)",
                      borderRadius:100, padding:"5px 12px",
                      color:"white", fontSize:11, fontWeight:600, cursor:"pointer",
                      display:"flex", alignItems:"center", gap:5,
                      transition:"all 0.2s",
                    }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.28)"}
                    onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.15)"}
                  >
                    ✎ Edit Link
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:36 }}>
          {videos.map((_, i) => (
            <button key={i} onClick={()=>{ setCenterIdx(i); setPlaying(null); setAutoPlay(false); }} style={{
              width: i===centerIdx ? 28 : 8,
              height: 8, borderRadius: 100,
              background: i===centerIdx ? "#C4B0E8" : "rgba(196,176,232,0.3)",
              border:"none", cursor:"pointer",
              transition:"all 0.3s", padding:0,
            }}/>
          ))}
        </div>

        {/* Nav arrows + autoplay toggle */}
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:16, marginTop:28 }}>
          <button onClick={()=>{ setCenterIdx(p=>(p-1+videos.length)%videos.length); setPlaying(null); setAutoPlay(false); }} style={{
            width:44, height:44, borderRadius:"50%",
            background:"rgba(196,176,232,0.12)", border:"1px solid rgba(196,176,232,0.2)",
            color:"white", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            transition:"all 0.2s",
          }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(196,176,232,0.25)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(196,176,232,0.12)"}
          >‹</button>

          <button onClick={()=>setAutoPlay(p=>!p)} style={{
            padding:"9px 22px", borderRadius:100,
            background: autoPlay ? "rgba(196,176,232,0.18)" : "rgba(255,255,255,0.08)",
            border:"1px solid rgba(196,176,232,0.25)",
            color:"rgba(196,176,232,0.85)", fontSize:12, fontWeight:600,
            cursor:"pointer", letterSpacing:0.5,
            transition:"all 0.2s",
          }}>
            {autoPlay ? "⏸ Pause Auto" : "▶ Auto Play"}
          </button>

          <button onClick={()=>{ setCenterIdx(p=>(p+1)%videos.length); setPlaying(null); setAutoPlay(false); }} style={{
            width:44, height:44, borderRadius:"50%",
            background:"rgba(196,176,232,0.12)", border:"1px solid rgba(196,176,232,0.2)",
            color:"white", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            transition:"all 0.2s",
          }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(196,176,232,0.25)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(196,176,232,0.12)"}
          >›</button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingIdx !== null && (
        <EditModal
          video={videos[editingIdx]}
          onSave={saveVideo}
          onClose={()=>setEditingIdx(null)}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        .vs-head     { opacity:0; transform:translateY(28px); transition:opacity 0.85s ease,transform 0.85s ease; }
        .vs-carousel { opacity:0; transform:translateY(22px); transition:opacity 0.85s ease 0.2s,transform 0.85s ease 0.2s; }
        .vs-vis .vs-head, .vs-vis .vs-carousel { opacity:1; transform:none; }
        @media(max-width:700px){
          .vs-carousel { height:220px !important; }
        }
      `}</style>
    </section>
  );
}