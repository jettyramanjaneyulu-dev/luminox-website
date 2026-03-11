import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const doctors = [
  {
    name: 'Dr. Meera Krishnan',
    title: 'MD Dermatology',
    exp: '12+ Years',
    spec: 'Skin & Laser Specialist',
    emoji: '👩‍⚕️',
    treatments: ['Laser Resurfacing', 'Skin Toning', 'Anti-Ageing'],
  },
  {
    name: 'Dr. Arjun Nair',
    title: 'MD Dermatology',
    exp: '9+ Years',
    spec: 'Hair Restoration Expert',
    emoji: '👨‍⚕️',
    treatments: ['Hair Transplant', 'PRP Therapy', 'Scalp Treatment'],
  },
  {
    name: 'Dr. Kavitha Rao',
    title: 'MD Cosmetology',
    exp: '8+ Years',
    spec: 'Aesthetic & Laser Physician',
    emoji: '👩‍⚕️',
    treatments: ['Botox & Fillers', 'Thread Lift', 'Body Contouring'],
  },
];

const HomeDoctors = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);
  const viewAllRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardRefs.current;
    const viewAll = viewAllRef.current;

    const setHidden = () => {
      // Header
      header.style.opacity = '0';
      header.style.transform = 'translateY(40px)';
      header.style.transition = 'opacity 0.7s ease 0s, transform 0.7s ease 0s';

      // Cards — each from bottom with stagger
      cards.forEach((card, i) => {
        if (!card) return;
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px) scale(0.96)';
        card.style.transition = `opacity 0.7s ease ${0.2 + i * 0.15}s, transform 0.7s ease ${0.2 + i * 0.15}s`;
      });

      // View all button
      viewAll.style.opacity = '0';
      viewAll.style.transform = 'translateY(30px)';
      viewAll.style.transition = 'opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s';
    };

    const setVisible = () => {
      header.style.opacity = '1';
      header.style.transform = 'translateY(0)';

      cards.forEach((card) => {
        if (!card) return;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      });

      viewAll.style.opacity = '1';
      viewAll.style.transform = 'translateY(0)';
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

    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: '110px 0',
      background: 'linear-gradient(180deg, #ffffff 0%, #FAF8F5 100%)',
    }}>
      <div className="container">

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 70 }}>
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 14, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase',
            color: '#C9A96E',
          }}>Our Team</div>
          <div style={{
            width: 60, height: 2,
            background: 'linear-gradient(90deg, #C9A96E, #6B4FA0)',
            margin: '16px auto',
          }} />
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 4vw, 56px)',
            fontWeight: 700, color: '#2C2C4A',
            marginBottom: 16,
          }}>
            Meet Our{' '}
            <span style={{ color: '#6B4FA0', fontStyle: 'italic' }}>
              Expert Doctors
            </span>
          </h2>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 17, color: '#8A8A9A',
            maxWidth: 500, margin: '0 auto',
            lineHeight: 1.8,
          }}>
            Board-certified dermatologists dedicated to your skin,
            hair & aesthetic goals
          </p>
        </div>

        {/* Doctors Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 32,
        }} className="doctors-grid">
          {doctors.map((doc, i) => (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              style={{
                background: '#2C2C4A',
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid rgba(201,169,110,0.15)',
                transition: 'all 0.4s ease',
                cursor: 'default',
                position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 24px 60px rgba(44,44,74,0.30)';
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.15)';
              }}
            >
              {/* Top corner decoration */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 80, height: 80,
                background: 'linear-gradient(225deg, rgba(201,169,110,0.15), transparent)',
                pointerEvents: 'none',
              }} />

              {/* Photo Area */}
              <div style={{
                height: 260,
                background: 'linear-gradient(135deg, rgba(107,79,160,0.25) 0%, rgba(201,169,110,0.12) 100%)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', width: 160, height: 160,
                  borderRadius: '50%',
                  background: 'rgba(201,169,110,0.08)',
                  border: '1px solid rgba(201,169,110,0.15)',
                }} />
                <div style={{
                  position: 'absolute', width: 200, height: 200,
                  borderRadius: '50%', background: 'transparent',
                  border: '1px solid rgba(201,169,110,0.07)',
                }} />
                <div style={{
                  fontSize: 90, position: 'relative', zIndex: 1,
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                }}>
                  {doc.emoji}
                </div>
                <div style={{
                  position: 'absolute', top: 18, left: 18,
                  background: 'linear-gradient(135deg, #C9A96E, #E8C98A)',
                  color: '#2C2C4A', padding: '5px 14px', borderRadius: 40,
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 13, fontWeight: 700, letterSpacing: 0.5,
                }}>
                  ✦ {doc.exp}
                </div>
              </div>

              {/* Gold divider */}
              <div style={{
                height: 2,
                background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
              }} />

              {/* Info */}
              <div style={{ padding: '28px 28px 32px' }}>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 26, fontWeight: 700,
                  color: 'white', marginBottom: 6, lineHeight: 1.2,
                }}>
                  {doc.name}
                </h3>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 14, color: '#C9A96E',
                  letterSpacing: 1, marginBottom: 4, fontWeight: 500,
                }}>
                  {doc.title}
                </div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 14, color: 'rgba(255,255,255,0.5)',
                  marginBottom: 22,
                }}>
                  {doc.spec}
                </div>

                {/* Treatment tags */}
                <div style={{
                  display: 'flex', flexWrap: 'wrap',
                  gap: 8, marginBottom: 28,
                }}>
                  {doc.treatments.map((t, j) => (
                    <span key={j} style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.6)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      padding: '4px 12px', borderRadius: 40,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{
                  height: 1, marginBottom: 24,
                  background: 'rgba(201,169,110,0.2)',
                }} />

                <Link to="/doctors" style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8,
                  background: 'transparent', color: '#C9A96E',
                  border: '1.5px solid rgba(201,169,110,0.4)',
                  padding: '13px 20px', borderRadius: 4,
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 14, fontWeight: 500,
                  letterSpacing: 1.5, textTransform: 'uppercase',
                  textDecoration: 'none', transition: 'all 0.3s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #C9A96E, #E8C98A)';
                    e.currentTarget.style.color = '#2C2C4A';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#C9A96E';
                    e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)';
                  }}
                >
                  View Profile <span style={{ fontSize: 16 }}>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div ref={viewAllRef} style={{ textAlign: 'center', marginTop: 60 }}>
          <Link to="/doctors" style={{
            background: 'linear-gradient(135deg, #2C2C4A, #4A3570)',
            color: 'white', padding: '17px 48px', borderRadius: 4,
            textDecoration: 'none',
            fontFamily: "'Jost', sans-serif",
            fontSize: 15, fontWeight: 500,
            letterSpacing: 1.5, textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center',
            gap: 10, transition: 'all 0.3s',
            border: '1px solid rgba(201,169,110,0.3)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #C9A96E, #E8C98A)';
              e.currentTarget.style.color = '#2C2C4A';
              e.currentTarget.style.borderColor = 'transparent';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #2C2C4A, #4A3570)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)';
            }}
          >
            ✦ Meet Our Full Team
          </Link>
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .doctors-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .doctors-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HomeDoctors;