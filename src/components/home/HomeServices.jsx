import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const services = [
  {
    icon: '✨',
    title: 'Skin Treatments',
    desc: 'Advanced skincare solutions for radiant, healthy skin',
    slug: 'skin-care',
    items: ['Hydra Facial', 'Chemical Peel', 'Laser Skin Toning', 'Skin Lightening'],
  },
  {
    icon: '💆',
    title: 'Hair Treatments',
    desc: 'Comprehensive hair restoration and care solutions',
    slug: 'hair-treatment',
    items: ['Hair Transplantation', 'PRP Therapy', 'Hair Loss Treatment', 'Scalp Treatment'],
  },
  {
    icon: '⚡',
    title: 'Laser Treatments',
    desc: 'Cutting-edge laser technology for lasting results',
    slug: 'laser-treatment',
    items: ['Laser Hair Removal', 'CO2 Laser', 'Laser Toning', 'Tattoo Removal'],
  },
  {
    icon: '🌿',
    title: 'Anti-Ageing',
    desc: 'Turn back the clock with premium anti-ageing treatments',
    slug: 'anti-ageing',
    items: ['Botox & Fillers', 'HIFU Treatment', 'Thread Lift', 'Dermal Fillers'],
  },
  {
    icon: '💎',
    title: 'Advanced Procedures',
    desc: 'State-of-the-art aesthetic procedures by experts',
    slug: 'advanced-procedures',
    items: ['Body Contouring', 'Skin Booster', 'Exosome Therapy', 'Dermapen'],
  },
  {
    icon: '🌸',
    title: 'Skin Rejuvenation',
    desc: "Revitalize and restore your skin's natural glow",
    slug: 'skin-rejuvenation',
    items: ['Skin Tightening', 'Microdermabrasion', 'Dark Circle Treatment', 'Acne Treatment'],
  },
];

const HomeServices = () => {
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
      header.style.opacity = '0';
      header.style.transform = 'translateY(40px)';
      header.style.transition = 'opacity 0.7s ease 0s, transform 0.7s ease 0s';

      cards.forEach((card, i) => {
        if (!card) return;
        // Alternate: odd cards from left, even from right
        const dir = i % 2 === 0 ? 'translateY(60px) scale(0.95)' : 'translateY(60px) scale(0.95)';
        card.style.opacity = '0';
        card.style.transform = dir;
        card.style.transition = `opacity 0.65s ease ${0.1 + i * 0.08}s, transform 0.65s ease ${0.1 + i * 0.08}s`;
      });

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
      { threshold: 0.08 }
    );

    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: '100px 0',
      background: 'white',
    }}>
      <div className="container">

        {/* Section Header */}
        <div ref={headerRef} style={{
          textAlign: 'center', marginBottom: 60,
        }}>
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 14, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase',
            color: '#C9A96E',
          }}>What We Offer</div>
          <div style={{
            width: 60, height: 2,
            background: 'linear-gradient(90deg, #C9A96E, #6B4FA0)',
            margin: '16px auto',
          }} />
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: 700, color: '#2C2C4A',
          }}>
            Our{' '}
            <span style={{ color: '#6B4FA0', fontStyle: 'italic' }}>
              Premium
            </span>{' '}
            Services
          </h2>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 17, color: '#8A8A9A',
            maxWidth: 520, margin: '16px auto 0',
            lineHeight: 1.8,
          }}>
            Comprehensive skin, hair & laser treatments
            designed for lasting results
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }} className="services-grid">
          {services.map((svc, i) => (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              style={{
                background: 'white', borderRadius: 4,
                padding: '38px 30px',
                border: '1px solid rgba(201,169,110,0.15)',
                transition: 'all 0.4s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(107,79,160,0.12)';
                e.currentTarget.style.borderColor = '#C9A96E';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.15)';
              }}
            >
              {/* Icon */}
              <div style={{ fontSize: 44, marginBottom: 18 }}>
                {svc.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28, fontWeight: 600,
                color: '#2C2C4A', marginBottom: 12,
              }}>
                {svc.title}
              </h3>

              {/* Desc */}
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 16, color: '#8A8A9A',
                lineHeight: 1.8, marginBottom: 22,
              }}>
                {svc.desc}
              </p>

              {/* Treatment list */}
              <ul style={{ listStyle: 'none', marginBottom: 26, padding: 0 }}>
                {svc.items.map((item, j) => (
                  <li key={j} style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 15, color: '#4A4A6A',
                    padding: '9px 0',
                    borderBottom: '1px solid #F0EBE3',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{ color: '#C9A96E', fontSize: 12 }}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Link
                to={`/services/${svc.slug}`}
                style={{
                  display: 'block', textAlign: 'center',
                  background: 'transparent', color: '#6B4FA0',
                  border: '1.5px solid #6B4FA0',
                  padding: '13px 20px', borderRadius: 2,
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 14, fontWeight: 500,
                  letterSpacing: 1.5, textTransform: 'uppercase',
                  textDecoration: 'none', transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#6B4FA0';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#6B4FA0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>

        {/* View All */}
        <div ref={viewAllRef} style={{
          textAlign: 'center', marginTop: 52,
        }}>
          <Link to="/services" style={{
            background: 'linear-gradient(135deg, #6B4FA0, #8B6FBF)',
            color: 'white', padding: '17px 44px',
            borderRadius: 2, textDecoration: 'none',
            fontFamily: "'Jost', sans-serif",
            fontSize: 15, fontWeight: 500,
            letterSpacing: 1.5, textTransform: 'uppercase',
            display: 'inline-block', transition: 'all 0.3s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(107,79,160,0.35)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            View All Services ✦
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HomeServices;