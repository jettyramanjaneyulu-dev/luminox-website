import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const btnsRef = useRef(null);
  const statsRef = useRef(null);
  const rightRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const badge3Ref = useRef(null);

  useEffect(() => {
    const elements = [
      { ref: tagRef,     from: 'translateY(30px)',          delay: '0s' },
      { ref: headingRef, from: 'translateY(50px)',          delay: '0.15s' },
      { ref: paraRef,    from: 'translateY(35px)',          delay: '0.3s' },
      { ref: btnsRef,    from: 'translateY(30px)',          delay: '0.45s' },
      { ref: statsRef,   from: 'translateY(25px)',          delay: '0.6s' },
      { ref: rightRef,   from: 'translateX(80px) scale(0.9)', delay: '0.3s' },
      { ref: badge1Ref,  from: 'translateX(-40px) scale(0.8)', delay: '0.7s' },
      { ref: badge2Ref,  from: 'translateX(40px) scale(0.8)',  delay: '0.85s' },
      { ref: badge3Ref,  from: 'translateX(-40px) scale(0.8)', delay: '1s' },
    ];

    // Set initial hidden state
    elements.forEach(({ ref, from, delay }) => {
      if (!ref.current) return;
      ref.current.style.opacity = '0';
      ref.current.style.transform = from;
      ref.current.style.transition = `opacity 0.8s ease ${delay}, transform 0.8s ease ${delay}`;
    });

    // Hero is always visible on load — use setTimeout instead of IntersectionObserver
    const timer = setTimeout(() => {
      elements.forEach(({ ref }) => {
        if (!ref.current) return;
        ref.current.style.opacity = '1';
        ref.current.style.transform = 'translateX(0) translateY(0) scale(1)';
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4A3570 0%, #6B4FA0 50%, #8B6FBF 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background decorative circles */}
      <div style={{
        position: 'absolute', top: '10%', right: '8%',
        width: 350, height: 350, borderRadius: '50%',
        background: 'rgba(201,169,110,0.08)', filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '5%',
        width: 250, height: 250, borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)', filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: '30%',
        width: 150, height: 150, borderRadius: '50%',
        background: 'rgba(201,169,110,0.05)', filter: 'blur(30px)',
        pointerEvents: 'none',
      }} />

      {/* Vertical decorative line */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%',
        width: 1, height: '60%',
        background: 'rgba(201,169,110,0.15)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
        }} className="hero-grid">

          {/* LEFT CONTENT */}
          <div>
            {/* Tag */}
            <div ref={tagRef} style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 14, fontWeight: 600,
              letterSpacing: 3, textTransform: 'uppercase',
              color: '#E8C98A', marginBottom: 22,
            }}>
              ✦ Premium Skin · Hair · Laser Clinic
            </div>

            {/* Heading */}
            <h1 ref={headingRef} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(52px, 6vw, 82px)',
              fontWeight: 700, color: 'white',
              lineHeight: 1.1, marginBottom: 28,
            }}>
              Reveal Your<br />
              <span style={{ color: '#E8C98A', fontStyle: 'italic' }}>
                Most Radiant
              </span><br />
              Self
            </h1>

            {/* Description */}
            <p ref={paraRef} style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 18, color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.9, marginBottom: 40, maxWidth: 460,
            }}>
              Experience world-class skin, hair & laser treatments
              by certified dermatologists. Advanced technology.
              Personalized care. Extraordinary results.
            </p>

            {/* Buttons */}
            <div ref={btnsRef} style={{
              display: 'flex', gap: 16, flexWrap: 'wrap',
            }}>
              <Link to="/appointment" style={{
                background: 'linear-gradient(135deg, #C9A96E, #E8C98A)',
                color: '#2C2C4A', border: 'none',
                padding: '17px 36px', borderRadius: 2,
                fontFamily: "'Jost', sans-serif",
                fontSize: 15, fontWeight: 600,
                letterSpacing: 1.5, textTransform: 'uppercase',
                textDecoration: 'none', transition: 'transform 0.3s, box-shadow 0.3s',
                display: 'inline-block',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(201,169,110,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Book Free Consultation
              </Link>
              <Link to="/services" style={{
                background: 'transparent', color: 'white',
                border: '1.5px solid rgba(255,255,255,0.4)',
                padding: '16px 36px', borderRadius: 2,
                fontFamily: "'Jost', sans-serif",
                fontSize: 15, fontWeight: 500,
                letterSpacing: 1.5, textTransform: 'uppercase',
                textDecoration: 'none', transition: 'all 0.3s',
                display: 'inline-block',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#E8C98A';
                  e.currentTarget.style.color = '#E8C98A';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Our Services
              </Link>
            </div>

            {/* Quick Stats */}
            <div ref={statsRef} style={{
              display: 'flex', gap: 48,
              marginTop: 56, flexWrap: 'wrap',
            }}>
              {[
                ['10,000+', 'Happy Patients'],
                ['50+', 'Treatments'],
                ['5★', 'Rated Clinic'],
              ].map(([num, label]) => (
                <div key={label}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 40, fontWeight: 700,
                    color: '#E8C98A', lineHeight: 1,
                  }}>{num}</div>
                  <div style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 14, color: 'rgba(255,255,255,0.65)',
                    letterSpacing: 1, marginTop: 6,
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div ref={rightRef} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div style={{ position: 'relative', width: 400, height: 480 }}>

              {/* Main circle visual */}
              <div style={{
                width: '100%', height: '100%',
                borderRadius: '60% 40% 60% 40% / 40% 60% 40% 60%',
                background: 'linear-gradient(135deg, rgba(201,169,110,0.15), rgba(255,255,255,0.06))',
                border: '1px solid rgba(201,169,110,0.25)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                animation: 'floatShape 6s ease-in-out infinite',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 90 }}>🌸</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 32, fontWeight: 600,
                    color: 'white', marginTop: 18, fontStyle: 'italic',
                  }}>Luminox Clinic</div>
                  <div style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 14, color: '#C9A96E',
                    letterSpacing: 3, marginTop: 8,
                  }}>SKIN · HAIR · LASER</div>
                </div>
              </div>

              {/* Floating badge 1 */}
              <div ref={badge1Ref} style={{
                position: 'absolute', top: '8%', left: '-12%',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(201,169,110,0.3)',
                borderRadius: 40, padding: '12px 20px',
                fontFamily: "'Jost', sans-serif",
                fontSize: 14, color: 'white', whiteSpace: 'nowrap',
                animation: 'floatBadge1 4s ease-in-out infinite',
              }}>
                ✦ Certified Experts
              </div>

              {/* Floating badge 2 */}
              <div ref={badge2Ref} style={{
                position: 'absolute', bottom: '18%', right: '-8%',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(201,169,110,0.3)',
                borderRadius: 40, padding: '12px 20px',
                fontFamily: "'Jost', sans-serif",
                fontSize: 14, color: 'white', whiteSpace: 'nowrap',
                animation: 'floatBadge2 5s ease-in-out infinite',
              }}>
                ⭐ 5-Star Rated
              </div>

              {/* Floating badge 3 */}
              <div ref={badge3Ref} style={{
                position: 'absolute', top: '48%', left: '-18%',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(201,169,110,0.3)',
                borderRadius: 40, padding: '12px 20px',
                fontFamily: "'Jost', sans-serif",
                fontSize: 14, color: 'white', whiteSpace: 'nowrap',
                animation: 'floatBadge3 4.5s ease-in-out infinite',
              }}>
                🔬 Advanced Tech
              </div>
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
        /* Entry animations */
        @keyframes floatShape {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes floatBadge1 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes floatBadge2 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes floatBadge3 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
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