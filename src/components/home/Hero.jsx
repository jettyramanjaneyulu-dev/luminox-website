import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const btnsRef = useRef(null);
  const statsRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const elements = [
      { ref: tagRef,     from: 'translateY(24px)',  delay: '0s' },
      { ref: headingRef, from: 'translateY(40px)',  delay: '0.15s' },
      { ref: paraRef,    from: 'translateY(30px)',  delay: '0.3s' },
      { ref: btnsRef,    from: 'translateY(24px)',  delay: '0.45s' },
      { ref: statsRef,   from: 'translateY(20px)',  delay: '0.6s' },
      { ref: rightRef,   from: 'translateX(60px) scale(0.95)', delay: '0.25s' },
    ];

    elements.forEach(({ ref, from }) => {
      if (!ref.current) return;
      ref.current.style.opacity = '0';
      ref.current.style.transform = from;
    });

    const timer = setTimeout(() => {
      elements.forEach(({ ref, delay }) => {
        if (!ref.current) return;
        ref.current.style.transition = `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}`;
        ref.current.style.opacity = '1';
        ref.current.style.transform = 'translateX(0) translateY(0) scale(1)';
      });
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(155deg, #F0EEF8 0%, #EAE8F5 40%, #E8E4F2 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Right-side decorative circles (like the reference image) */}
      <div style={{
        position: 'absolute', top: '8%', right: '4%',
        width: 340, height: 340, borderRadius: '50%',
        border: '1.5px solid rgba(130,100,200,0.15)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '18%', right: '8%',
        width: 240, height: 240, borderRadius: '50%',
        border: '1.5px solid rgba(130,100,200,0.12)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '28%', right: '12%',
        width: 140, height: 140, borderRadius: '50%',
        border: '1.5px solid rgba(130,100,200,0.10)',
        pointerEvents: 'none',
      }} />
      {/* Soft blob glow */}
      <div style={{
        position: 'absolute', top: '-5%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(150,120,220,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-8%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(150,120,220,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="hero-container" style={{ paddingTop: 120, paddingBottom: 80, width: '100%', maxWidth: 1200, margin: '0 auto', padding: '120px 48px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
        }} className="hero-grid">

          {/* LEFT CONTENT */}
          <div>
            {/* Award pill badge */}
            <div ref={tagRef} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(130,100,200,0.2)',
              borderRadius: 100,
              padding: '8px 18px',
              marginBottom: 32,
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{ fontSize: 16 }}>🏆</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, fontWeight: 600,
                letterSpacing: 2, textTransform: 'uppercase',
                color: '#4A3880',
              }}>
                Recognised as Best Skin Clinic — 2024
              </span>
            </div>

            {/* Heading */}
            <h1 ref={headingRef} style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(44px, 5.5vw, 74px)',
              fontWeight: 700,
              color: '#1E1A3C',
              lineHeight: 1.12,
              marginBottom: 28,
              letterSpacing: '-0.5px',
            }}>
              Your Journey to<br />
              <span style={{
                color: '#7B5EA7',
                fontStyle: 'italic',
                fontWeight: 700,
              }}>
                Flawless Skin
              </span><br />
              Starts Here
            </h1>

            {/* Description */}
            <p ref={paraRef} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: '#5A5670',
              lineHeight: 1.85,
              marginBottom: 44,
              maxWidth: 440,
            }}>
              Advanced dermatology &amp; aesthetic treatments by board-certified
              specialists. Personalised care. Proven results.
            </p>

            {/* Buttons */}
            <div ref={btnsRef} style={{
              display: 'flex', gap: 14, flexWrap: 'wrap',
            }}>
              <Link to="/appointment" style={{
                background: '#3D2B7A',
                color: '#fff',
                border: 'none',
                padding: '16px 34px',
                borderRadius: 100,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, fontWeight: 600,
                letterSpacing: 0.3,
                textDecoration: 'none',
                transition: 'transform 0.25s, box-shadow 0.25s, background 0.25s',
                display: 'inline-block',
                boxShadow: '0 4px 20px rgba(61,43,122,0.22)',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 32px rgba(61,43,122,0.35)';
                  e.currentTarget.style.background = '#4e38a0';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(61,43,122,0.22)';
                  e.currentTarget.style.background = '#3D2B7A';
                }}
              >
                Book Free Consultation
              </Link>
              <Link to="/services" style={{
                background: 'rgba(255,255,255,0.7)',
                color: '#3D2B7A',
                border: '1.5px solid rgba(100,80,180,0.25)',
                padding: '15px 34px',
                borderRadius: 100,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.25s',
                display: 'inline-block',
                backdropFilter: 'blur(8px)',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                  e.currentTarget.style.borderColor = 'rgba(100,80,180,0.5)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(61,43,122,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.borderColor = 'rgba(100,80,180,0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                View All Services
              </Link>
            </div>

            {/* Stats */}
            <div ref={statsRef} style={{
              display: 'flex',
              gap: 48,
              marginTop: 60,
              flexWrap: 'wrap',
              paddingTop: 40,
              borderTop: '1px solid rgba(100,80,180,0.12)',
            }}>
              {[
                ['5000+', 'Happy Patients'],
                ['15+',   'Expert Doctors'],
                ['8+',    'Years Experience'],
                ['3',     'Branches'],
              ].map(([num, label]) => (
                <div key={label}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 36, fontWeight: 700,
                    color: '#1E1A3C', lineHeight: 1,
                  }}>{num}</div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: '#8A86A8',
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    marginTop: 8,
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — decorative abstract circles (visible, styled) */}
          <div ref={rightRef} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: 480,
          }}>
            {/* Outer ring */}
            <div style={{
              position: 'absolute',
              width: 420, height: 420,
              borderRadius: '50%',
              border: '1.5px solid rgba(123,94,167,0.18)',
              animation: 'spinSlow 30s linear infinite',
            }}>
              {/* Small dot on orbit */}
              <div style={{
                position: 'absolute', top: -6, left: '50%',
                width: 12, height: 12, borderRadius: '50%',
                background: '#C4B0E8', transform: 'translateX(-50%)',
                boxShadow: '0 0 12px rgba(150,100,220,0.4)',
              }} />
            </div>
            {/* Middle ring */}
            <div style={{
              position: 'absolute',
              width: 300, height: 300,
              borderRadius: '50%',
              border: '1.5px solid rgba(123,94,167,0.14)',
              animation: 'spinSlow 20s linear infinite reverse',
            }}>
              <div style={{
                position: 'absolute', bottom: -5, right: '20%',
                width: 10, height: 10, borderRadius: '50%',
                background: '#A990D4',
                boxShadow: '0 0 10px rgba(150,100,220,0.35)',
              }} />
            </div>
            {/* Inner ring */}
            <div style={{
              position: 'absolute',
              width: 190, height: 190,
              borderRadius: '50%',
              border: '1.5px solid rgba(123,94,167,0.18)',
            }} />
            {/* Center circle */}
            <div style={{
              position: 'absolute',
              width: 100, height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(123,94,167,0.15), rgba(100,70,200,0.08))',
              border: '1.5px solid rgba(123,94,167,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 40px rgba(100,70,200,0.12)',
            }}>
              <span style={{ fontSize: 40 }}>✦</span>
            </div>
            {/* Floating stat cards */}
            <div style={{
              position: 'absolute', top: '10%', right: '0%',
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(123,94,167,0.18)',
              borderRadius: 16,
              padding: '14px 20px',
              boxShadow: '0 4px 24px rgba(100,70,200,0.10)',
              animation: 'floatA 5s ease-in-out infinite',
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#1E1A3C' }}>98%</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#8A86A8', letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>Satisfaction Rate</div>
            </div>
            <div style={{
              position: 'absolute', bottom: '14%', left: '-2%',
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(123,94,167,0.18)',
              borderRadius: 16,
              padding: '14px 20px',
              boxShadow: '0 4px 24px rgba(100,70,200,0.10)',
              animation: 'floatB 6s ease-in-out infinite',
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#1E1A3C' }}>50+</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#8A86A8', letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>Treatments</div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div style={{
        position: 'absolute', bottom: -1,
        left: 0, right: 0, pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none"
          style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z"
            fill="#FAF8F5" />
        </svg>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes floatA {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }

        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
