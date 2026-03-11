import { useState, useRef, useEffect } from "react";

// ── Luminox brand tokens ──────────────────────────────────────────────────────
const T = {
  purple: "#6B4FA0",
  purpleLight: "#8B6FC0",
  purpleDark: "#4A3570",
  gold: "#C9A96E",
  goldLight: "#DFC28E",
  cream: "#FAF8F5",
  navy: "#2C2C4A",
  navyLight: "#3E3E60",
};

// ── Inline styles ─────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lx-contact {
    min-height: 100vh;
    background: ${T.cream};
    font-family: 'Jost', sans-serif;
    color: ${T.navy};
    overflow-x: hidden;
  }

  /* ── Hero ── */
  .lx-hero {
    position: relative;
    height: 52vh;
    min-height: 340px;
    display: flex;
    align-items: flex-end;
    padding: 0 6vw 56px;
    overflow: hidden;
    background: ${T.navy};
  }
  .lx-hero-bg {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, ${T.navyLight} 0%, ${T.navy} 45%, ${T.purpleDark} 100%);
  }
  .lx-hero-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .lx-hero-orb-1 {
    width: 520px; height: 520px;
    top: -180px; right: -80px;
    background: radial-gradient(circle, ${T.purple}30 0%, transparent 70%);
    animation: orbDrift 12s ease-in-out infinite alternate;
  }
  .lx-hero-orb-2 {
    width: 300px; height: 300px;
    bottom: -100px; left: 20%;
    background: radial-gradient(circle, ${T.gold}18 0%, transparent 70%);
    animation: orbDrift 9s ease-in-out infinite alternate-reverse;
  }
  @keyframes orbDrift {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(20px, -15px) scale(1.04); }
  }
  .lx-hero-line {
    position: absolute;
    top: 0; left: 6vw;
    width: 1px; height: 100%;
    background: linear-gradient(to bottom, transparent, ${T.gold}60, transparent);
    opacity: 0.6;
  }
  .lx-hero-content { position: relative; z-index: 2; }
  .lx-hero-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: ${T.gold};
    margin-bottom: 14px;
    opacity: 0;
    transform: translateY(12px);
    animation: fadeUp 0.7s 0.2s forwards;
  }
  .lx-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(44px, 6vw, 80px);
    font-weight: 300;
    line-height: 1.05;
    color: ${T.cream};
    opacity: 0;
    transform: translateY(16px);
    animation: fadeUp 0.8s 0.35s forwards;
  }
  .lx-hero-title em {
    font-style: italic;
    color: ${T.goldLight};
  }
  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── Layout ── */
  .lx-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    max-width: 1260px;
    margin: 0 auto;
    padding: 80px 6vw 100px;
  }
  @media (max-width: 860px) {
    .lx-body { grid-template-columns: 1fr; padding: 60px 6vw 80px; }
  }

  /* ── Info panel ── */
  .lx-info { padding-right: 60px; }
  @media (max-width: 860px) { .lx-info { padding-right: 0; margin-bottom: 60px; } }

  .lx-section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${T.purple};
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .lx-section-label::after {
    content: '';
    flex: 1;
    max-width: 48px;
    height: 1px;
    background: ${T.gold};
    opacity: 0.6;
  }

  .lx-info-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 3.5vw, 42px);
    font-weight: 400;
    line-height: 1.2;
    color: ${T.navy};
    margin-bottom: 20px;
  }
  .lx-info-heading em { font-style: italic; color: ${T.purple}; }

  .lx-info-body {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.8;
    color: ${T.navyLight};
    margin-bottom: 48px;
  }

  .lx-card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 40px;
  }
  @media (max-width: 520px) { .lx-card-grid { grid-template-columns: 1fr; } }

  .lx-info-card {
    background: white;
    border: 1px solid rgba(107, 79, 160, 0.1);
    border-radius: 12px;
    padding: 22px 20px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    cursor: default;
  }
  .lx-info-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 0;
    background: linear-gradient(to bottom, ${T.purple}, ${T.gold});
    transition: height 0.4s ease;
  }
  .lx-info-card:hover { border-color: ${T.purple}30; box-shadow: 0 8px 32px rgba(107,79,160,0.1); transform: translateY(-2px); }
  .lx-info-card:hover::before { height: 100%; }

  .lx-card-icon {
    width: 36px; height: 36px;
    border-radius: 8px;
    background: linear-gradient(135deg, ${T.purple}15, ${T.gold}15);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px;
    font-size: 16px;
  }
  .lx-card-title {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${T.gold};
    margin-bottom: 6px;
  }
  .lx-card-value {
    font-size: 13.5px;
    font-weight: 400;
    color: ${T.navy};
    line-height: 1.5;
  }

  /* Hours table */
  .lx-hours {
    background: linear-gradient(135deg, ${T.navy} 0%, ${T.purpleDark} 100%);
    border-radius: 14px;
    padding: 28px 28px 24px;
    color: white;
  }
  .lx-hours-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 400;
    color: ${T.goldLight};
    margin-bottom: 18px;
    letter-spacing: 0.04em;
  }
  .lx-hours-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    font-size: 13px;
    font-weight: 300;
  }
  .lx-hours-row:last-child { border-bottom: none; }
  .lx-hours-day { color: rgba(255,255,255,0.7); }
  .lx-hours-time { color: ${T.goldLight}; font-weight: 400; }
  .lx-hours-badge {
    display: inline-block;
    background: ${T.gold}25;
    color: ${T.goldLight};
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 4px;
    margin-top: 16px;
  }

  /* ── Form panel ── */
  .lx-form-panel {
    padding-left: 60px;
    border-left: 1px solid rgba(107,79,160,0.12);
  }
  @media (max-width: 860px) {
    .lx-form-panel { padding-left: 0; border-left: none; border-top: 1px solid rgba(107,79,160,0.12); padding-top: 60px; }
  }

  .lx-form { display: flex; flex-direction: column; gap: 20px; }

  .lx-field { display: flex; flex-direction: column; gap: 7px; }

  .lx-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${T.purple};
  }

  .lx-input, .lx-select, .lx-textarea {
    background: white;
    border: 1.5px solid rgba(107,79,160,0.18);
    border-radius: 8px;
    padding: 13px 16px;
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 300;
    color: ${T.navy};
    outline: none;
    transition: border-color 0.25s, box-shadow 0.25s;
    width: 100%;
    appearance: none;
  }
  .lx-input::placeholder, .lx-textarea::placeholder { color: rgba(44,44,74,0.35); }
  .lx-input:focus, .lx-select:focus, .lx-textarea:focus {
    border-color: ${T.purple};
    box-shadow: 0 0 0 3px ${T.purple}12;
  }
  .lx-textarea { resize: vertical; min-height: 118px; line-height: 1.6; }

  .lx-select-wrap { position: relative; }
  .lx-select-wrap::after {
    content: '▾';
    position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
    color: ${T.purple}; pointer-events: none; font-size: 12px;
  }

  .lx-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 520px) { .lx-row { grid-template-columns: 1fr; } }

  /* Checkbox strip */
  .lx-services {
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-top: 4px;
  }
  .lx-chip {
    cursor: pointer;
    padding: 7px 14px;
    border-radius: 999px;
    border: 1.5px solid rgba(107,79,160,0.22);
    font-size: 12px; font-weight: 400;
    color: ${T.navyLight};
    background: white;
    transition: all 0.22s;
    user-select: none;
  }
  .lx-chip:hover { border-color: ${T.purple}; color: ${T.purple}; }
  .lx-chip.active {
    background: ${T.purple};
    border-color: ${T.purple};
    color: white;
  }

  /* Privacy */
  .lx-privacy {
    display: flex; gap: 10px; align-items: flex-start;
    font-size: 12.5px; font-weight: 300; color: ${T.navyLight};
    line-height: 1.6;
  }
  .lx-privacy-check {
    width: 16px; height: 16px; min-width: 16px;
    border: 1.5px solid ${T.purple}50;
    border-radius: 4px;
    margin-top: 2px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    background: white;
    transition: background 0.2s, border-color 0.2s;
  }
  .lx-privacy-check.checked {
    background: ${T.purple};
    border-color: ${T.purple};
  }
  .lx-privacy-check.checked::after { content: '✓'; color: white; font-size: 10px; }
  .lx-privacy a { color: ${T.purple}; text-decoration: none; border-bottom: 1px solid ${T.purple}40; }

  /* Submit */
  .lx-submit {
    position: relative;
    display: inline-flex; align-items: center; justify-content: center;
    gap: 10px;
    padding: 16px 40px;
    background: linear-gradient(135deg, ${T.purple} 0%, ${T.purpleDark} 100%);
    color: white;
    font-family: 'Jost', sans-serif;
    font-size: 12px; font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    border: none; border-radius: 8px;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.25s, box-shadow 0.25s;
    align-self: flex-start;
  }
  .lx-submit::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, ${T.gold}30, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .lx-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 36px ${T.purple}40; }
  .lx-submit:hover::before { opacity: 1; }
  .lx-submit:active { transform: translateY(0); }
  .lx-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .lx-submit-arrow {
    display: inline-block;
    transition: transform 0.25s;
  }
  .lx-submit:hover .lx-submit-arrow { transform: translateX(4px); }

  /* Success state */
  .lx-success {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center;
    padding: 60px 20px;
    gap: 16px;
    animation: fadeUp 0.6s forwards;
  }
  .lx-success-icon {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${T.purple}18, ${T.gold}18);
    border: 1.5px solid ${T.gold}50;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
    margin-bottom: 8px;
  }
  .lx-success-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px; font-weight: 400;
    color: ${T.navy};
  }
  .lx-success-heading em { font-style: italic; color: ${T.purple}; }
  .lx-success-body { font-size: 14px; font-weight: 300; color: ${T.navyLight}; line-height: 1.7; max-width: 320px; }

  /* Map strip */
  .lx-map-strip {
    background: ${T.navy};
    padding: 64px 6vw;
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 48px;
    align-items: center;
    max-width: 100%;
  }
  @media (max-width: 780px) { .lx-map-strip { grid-template-columns: 1fr; } }

  .lx-map-text {}
  .lx-map-eyebrow {
    font-size: 10px; font-weight: 600; letter-spacing: 0.28em;
    text-transform: uppercase; color: ${T.gold};
    margin-bottom: 14px;
  }
  .lx-map-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(26px, 3vw, 38px); font-weight: 300;
    color: white; line-height: 1.2; margin-bottom: 16px;
  }
  .lx-map-heading em { font-style: italic; color: ${T.goldLight}; }
  .lx-map-addr { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.65); line-height: 1.7; }

  .lx-map-btn {
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 24px;
    padding: 11px 24px;
    border: 1.5px solid ${T.gold}60;
    border-radius: 6px;
    color: ${T.goldLight};
    font-family: 'Jost', sans-serif;
    font-size: 11px; font-weight: 500; letter-spacing: 0.2em;
    text-transform: uppercase;
    background: transparent;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.25s, border-color 0.25s;
  }
  .lx-map-btn:hover { background: ${T.gold}15; border-color: ${T.gold}; }

  .lx-map-frame {
    border-radius: 14px;
    overflow: hidden;
    height: 300px;
    position: relative;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .lx-map-placeholder {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, ${T.navyLight}, ${T.purpleDark});
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 12px;
    color: rgba(255,255,255,0.4);
    font-size: 13px; font-weight: 300;
  }
  .lx-map-pin { font-size: 36px; opacity: 0.5; }

  /* Scroll reveal */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
`;

// ── Data ──────────────────────────────────────────────────────────────────────
const INFO_CARDS = [
  { icon: "📞", title: "Phone", value: "+1 (800) 586-4669" },
  { icon: "✉️", title: "Email", value: "hello@luminoxclinic.com" },
  { icon: "📍", title: "Address", value: "12 Harley Street\nLondon, W1G 9PQ" },
  { icon: "💬", title: "WhatsApp", value: "Chat with us\nanytime" },
];

const HOURS = [
  { day: "Monday – Friday", time: "08:00 – 20:00" },
  { day: "Saturday", time: "09:00 – 17:00" },
  { day: "Sunday", time: "10:00 – 14:00" },
];

const SERVICES = [
  "Aesthetics", "Dermatology", "IV Therapy",
  "Wellness", "Laser", "Consultations",
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    service: "", message: "", services: [], privacy: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const revealRefs = useRef([]);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addReveal = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  const toggleService = (s) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.privacy) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <style>{globalStyles}</style>

      <div className="lx-contact">
        {/* ── Hero ── */}
        <section className="lx-hero">
          <div className="lx-hero-bg" />
          <div className="lx-hero-orb lx-hero-orb-1" />
          <div className="lx-hero-orb lx-hero-orb-2" />
          <div className="lx-hero-line" />
          <div className="lx-hero-content">
            <p className="lx-hero-eyebrow">Luminox Clinic · Contact</p>
            <h1 className="lx-hero-title">
              Begin Your<br /><em>Journey</em>
            </h1>
          </div>
        </section>

        {/* ── Body ── */}
        <div className="lx-body">

          {/* Info Panel */}
          <div className="lx-info" ref={addReveal} style={{ transitionDelay: "0.05s" }}>
            <p className="lx-section-label reveal visible">Get in touch</p>

            <h2 className="lx-info-heading">
              We'd love to<br /><em>hear from you</em>
            </h2>
            <p className="lx-info-body">
              Whether you're ready to book a consultation or simply want to
              learn more, our team is here to guide you through every step
              with warmth and expertise.
            </p>

            <div className="lx-card-grid">
              {INFO_CARDS.map((c) => (
                <div className="lx-info-card" key={c.title}>
                  <div className="lx-card-icon">{c.icon}</div>
                  <p className="lx-card-title">{c.title}</p>
                  <p className="lx-card-value" style={{ whiteSpace: "pre-line" }}>{c.value}</p>
                </div>
              ))}
            </div>

            <div className="lx-hours">
              <p className="lx-hours-title">Clinic Hours</p>
              {HOURS.map((h) => (
                <div className="lx-hours-row" key={h.day}>
                  <span className="lx-hours-day">{h.day}</span>
                  <span className="lx-hours-time">{h.time}</span>
                </div>
              ))}
              <span className="lx-hours-badge">Open Today</span>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lx-form-panel" ref={addReveal} style={{ transitionDelay: "0.15s" }}>
            <p className="lx-section-label reveal visible">Book a consultation</p>

            {submitted ? (
              <div className="lx-success">
                <div className="lx-success-icon">✦</div>
                <h3 className="lx-success-heading">Thank <em>you</em></h3>
                <p className="lx-success-body">
                  Your message has been received. A member of our team
                  will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form className="lx-form" onSubmit={handleSubmit}>
                <div className="lx-row">
                  <div className="lx-field">
                    <label className="lx-label">First name</label>
                    <input className="lx-input" placeholder="Eleanor"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      required />
                  </div>
                  <div className="lx-field">
                    <label className="lx-label">Last name</label>
                    <input className="lx-input" placeholder="Voss"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      required />
                  </div>
                </div>

                <div className="lx-row">
                  <div className="lx-field">
                    <label className="lx-label">Email</label>
                    <input className="lx-input" type="email" placeholder="hello@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required />
                  </div>
                  <div className="lx-field">
                    <label className="lx-label">Phone</label>
                    <input className="lx-input" type="tel" placeholder="+44 7700 900000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>

                <div className="lx-field">
                  <label className="lx-label">Primary service</label>
                  <div className="lx-select-wrap">
                    <select className="lx-select"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}>
                      <option value="">Select a service…</option>
                      {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="lx-field">
                  <label className="lx-label">I'm interested in</label>
                  <div className="lx-services">
                    {SERVICES.map((s) => (
                      <span key={s}
                        className={`lx-chip${form.services.includes(s) ? " active" : ""}`}
                        onClick={() => toggleService(s)}>{s}</span>
                    ))}
                  </div>
                </div>

                <div className="lx-field">
                  <label className="lx-label">Message</label>
                  <textarea className="lx-textarea"
                    placeholder="Tell us about your goals or any questions you have…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>

                <div className="lx-privacy">
                  <div
                    className={`lx-privacy-check${form.privacy ? " checked" : ""}`}
                    onClick={() => setForm({ ...form, privacy: !form.privacy })}
                    role="checkbox"
                    aria-checked={form.privacy}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === " " && setForm({ ...form, privacy: !form.privacy })}
                  />
                  <span>
                    I agree to the <a href="/privacy">Privacy Policy</a> and
                    consent to Luminox Clinic processing my personal data for
                    the purpose of responding to my enquiry.
                  </span>
                </div>

                <button
                  className="lx-submit"
                  type="submit"
                  disabled={loading || !form.privacy}>
                  {loading ? "Sending…" : (
                    <>
                      Send Enquiry
                      <span className="lx-submit-arrow">→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Map strip ── */}
        <section className="lx-map-strip">
          <div className="lx-map-text" ref={addReveal} style={{ transitionDelay: "0.05s" }}>
            <p className="lx-map-eyebrow">Find us</p>
            <h2 className="lx-map-heading">
              Visit our<br /><em>Harley Street</em><br />clinic
            </h2>
            <p className="lx-map-addr">
              12 Harley Street<br />
              London, W1G 9PQ<br />
              United Kingdom
            </p>
            <a
              className="lx-map-btn"
              href="https://maps.google.com/?q=12+Harley+Street+London"
              target="_blank"
              rel="noopener noreferrer">
              Get Directions →
            </a>
          </div>

          <div className="lx-map-frame" ref={addReveal} style={{ transitionDelay: "0.15s" }}>
            {/* Replace the placeholder below with a real <iframe> Google Maps embed */}
            <div className="lx-map-placeholder">
              <span className="lx-map-pin">📍</span>
              <span>Replace with Google Maps embed</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}