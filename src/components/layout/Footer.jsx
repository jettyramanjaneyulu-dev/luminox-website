import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// ✅ Scroll To Top Button — fixed on screen, works on ALL pages
export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: 36, right: 36,
        zIndex: 9999,
        width: 52, height: 52,
        borderRadius: '50%',
        background: hovered
          ? 'linear-gradient(135deg, #C9A96E, #E8C98A)'
          : 'linear-gradient(135deg, #6B4FA0, #8B6FBF)',
        color: hovered ? '#2C2C4A' : 'white',
        border: 'none', cursor: 'pointer',
        fontSize: 22,
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        boxShadow: hovered
          ? '0 8px 24px rgba(201,169,110,0.5)'
          : '0 8px 24px rgba(107,79,160,0.4)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        transition: 'all 0.35s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      title="Back to Top"
    >
      ↑
    </button>
  );
};

// ─────────────────────────────────────────────
// Footer Component
// ─────────────────────────────────────────────
const Footer = () => {
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const cols = [brandRef, col1Ref, col2Ref, col3Ref];

    const setHidden = () => {
      cols.forEach((col, i) => {
        if (!col.current) return;
        col.current.style.opacity = '0';
        col.current.style.transform = 'translateY(40px)';
        col.current.style.transition = `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`;
      });
      if (bottomRef.current) {
        bottomRef.current.style.opacity = '0';
        bottomRef.current.style.transform = 'translateY(20px)';
        bottomRef.current.style.transition = 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s';
      }
    };

    const setVisible = () => {
      cols.forEach((col) => {
        if (!col.current) return;
        col.current.style.opacity = '1';
        col.current.style.transform = 'translateY(0)';
      });
      if (bottomRef.current) {
        bottomRef.current.style.opacity = '1';
        bottomRef.current.style.transform = 'translateY(0)';
      }
    };

    setHidden();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible();
        } else {
          setHidden();
        }
      },
      { threshold: 0.1 }
    );

    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollToTop />

      <footer ref={footerRef} style={{
        background: '#2C2C4A',
        color: 'white',
        padding: '80px 0 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Top gold shimmer line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 3,
          background: 'linear-gradient(90deg, transparent, #C9A96E, #E8C98A, #C9A96E, transparent)',
        }} />

        {/* Background orb */}
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-5%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(107,79,160,0.08)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />

        <div className="container">

          {/* Top Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 48, marginBottom: 60,
          }} className="footer-grid">

            {/* Brand */}
            <div ref={brandRef}>
              <div style={{
                display: 'flex', alignItems: 'center',
                gap: 10, marginBottom: 20,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6B4FA0, #C9A96E)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 14,
                }}>✦</div>
                <div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22, fontWeight: 700, letterSpacing: 3,
                  }}>LUMINOX</div>
                  <div style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 10, letterSpacing: 3, color: '#C9A96E',
                  }}>Skin · Hair · Laser</div>
                </div>
              </div>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14, color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.9, maxWidth: 260,
              }}>
                Premium skin, hair & laser clinic offering
                world-class treatments by certified
                dermatologists using advanced technology.
              </p>

              {/* Social */}
              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                {['FB', 'IG', 'YT', 'IN'].map(s => (
                  <div key={s} style={{
                    width: 38, height: 38, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer',
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 12, color: 'rgba(255,255,255,0.5)',
                    transition: 'all 0.3s',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#C9A96E';
                      e.currentTarget.style.color = '#C9A96E';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div ref={col1Ref}>
              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 12, fontWeight: 600,
                letterSpacing: 3, textTransform: 'uppercase',
                color: '#C9A96E', marginBottom: 20,
              }}>Services</div>
              <ul style={{
                display: 'flex', flexDirection: 'column',
                gap: 12, listStyle: 'none', padding: 0,
              }}>
                {['Skin Care', 'Hair Treatment', 'Laser Treatment', 'Anti-Ageing', 'Advanced Procedures'].map(item => (
                  <li key={item}>
                    <Link to="/services" style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 14, color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none', transition: 'all 0.3s',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#C9A96E';
                        e.currentTarget.style.paddingLeft = '6px';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                        e.currentTarget.style.paddingLeft = '0px';
                      }}
                    >
                      <span style={{ color: '#C9A96E', fontSize: 10 }}>✦</span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div ref={col2Ref}>
              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 12, fontWeight: 600,
                letterSpacing: 3, textTransform: 'uppercase',
                color: '#C9A96E', marginBottom: 20,
              }}>Quick Links</div>
              <ul style={{
                display: 'flex', flexDirection: 'column',
                gap: 12, listStyle: 'none', padding: 0,
              }}>
                {[
                  { label: 'About Us', path: '/about' },
                  { label: 'Our Doctors', path: '/doctors' },
                  { label: 'Gallery', path: '/gallery' },
                  { label: 'Before & After', path: '/before-after' },
                  { label: 'Contact Us', path: '/contact' },
                ].map(item => (
                  <li key={item.label}>
                    <Link to={item.path} style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 14, color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none', transition: 'all 0.3s',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#C9A96E';
                        e.currentTarget.style.paddingLeft = '6px';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                        e.currentTarget.style.paddingLeft = '0px';
                      }}
                    >
                      <span style={{ color: '#C9A96E', fontSize: 10 }}>✦</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div ref={col3Ref}>
              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 12, fontWeight: 600,
                letterSpacing: 3, textTransform: 'uppercase',
                color: '#C9A96E', marginBottom: 20,
              }}>Contact</div>
              <ul style={{
                display: 'flex', flexDirection: 'column',
                gap: 14, listStyle: 'none', padding: 0,
              }}>
                {[
                  { icon: '📍', text: 'Clinic Address, City' },
                  { icon: '📞', text: '+91 98765 43210' },
                  { icon: '✉️', text: 'hello@luminox.com' },
                  { icon: '⏰', text: 'Mon–Sat: 10AM–8PM' },
                  { icon: '⏰', text: 'Sun: 10AM–5PM' },
                ].map((item, i) => (
                  <li key={i} style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 14, color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.6,
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div ref={bottomRef} style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingTop: 28,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap', gap: 16,
          }}>
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 13, color: 'rgba(255,255,255,0.35)',
            }}>
              © 2026 Luminox Skin · Hair · Laser. All Rights Reserved.
            </div>
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 13, color: 'rgba(255,255,255,0.35)',
              display: 'flex', gap: 20,
            }}>
              <span style={{ cursor: 'pointer', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
              >Privacy Policy</span>
              <span>·</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
              >Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;