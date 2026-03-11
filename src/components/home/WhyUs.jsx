import { useEffect, useRef } from 'react';

const reasons = [
  {
    icon: '🏆',
    title: 'Expert Dermatologists',
    desc: 'Board-certified specialists with years of experience in skin, hair & laser treatments',
  },
  {
    icon: '🔬',
    title: 'Advanced Technology',
    desc: 'USFDA approved cutting-edge equipment for precise and safe treatments',
  },
  {
    icon: '💝',
    title: 'Personalized Care',
    desc: 'Customized treatment plans designed specifically for your unique needs',
  },
  {
    icon: '🛡️',
    title: 'Safe & Certified',
    desc: 'Stringent safety protocols and hygiene standards at every step',
  },
  {
    icon: '⭐',
    title: 'Proven Results',
    desc: 'Thousands of satisfied patients trust us for their skin & hair goals',
  },
  {
    icon: '🌟',
    title: 'Multi-Specialty',
    desc: 'Complete skin, hair & laser solutions all available under one roof',
  },
];

const WhyUs = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardRefs.current;

    const setHidden = () => {
      header.style.opacity = '0';
      header.style.transform = 'translateY(40px)';
      header.style.transition =
        'opacity 0.7s ease 0s, transform 0.7s ease 0s';

      cards.forEach((card, i) => {
        if (!card) return;
        const col = i % 3;
        const fromX = col === 0 ? '-50px' : col === 2 ? '50px' : '0px';
        const fromY = col === 1 ? '60px' : '40px';
        card.style.opacity = '0';
        card.style.transform = `translateX(${fromX}) translateY(${fromY}) scale(0.95)`;
        card.style.transition = `opacity 0.65s ease ${
          0.1 + i * 0.1
        }s, transform 0.65s ease ${0.1 + i * 0.1}s`;
      });
    };

    const setVisible = () => {
      header.style.opacity = '1';
      header.style.transform = 'translateY(0)';
      cards.forEach((card) => {
        if (!card) return;
        card.style.opacity = '1';
        card.style.transform = 'translateX(0) translateY(0) scale(1)';
      });
    };

    setHidden();

    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting ? setVisible() : setHidden();
      },
      { threshold: 0.08 }
    );

    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '100px 0',
        background: '#FAF8F5',
        overflowX: 'hidden',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 20px',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 60 }}>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: 16,
            }}
          >
            Why Luminox
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 4vw, 52px)',
              fontWeight: 700,
              color: '#2C2C4A',
              margin: 0,
            }}
          >
            The Luminox{' '}
            <span style={{ color: '#6B4FA0', fontStyle: 'italic' }}>
              Difference
            </span>
          </h2>

          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 17,
              color: '#8A8A9A',
              maxWidth: 500,
              margin: '16px auto 0',
              lineHeight: 1.8,
            }}
          >
            We combine expertise, technology and genuine care to deliver
            exceptional results every time
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className="why-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {reasons.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              style={{
                background: 'white',
                borderRadius: 4,
                padding: '40px 32px',
                textAlign: 'center',
                border: '1px solid #F0EBE3',
                transition: 'all 0.3s',
                cursor: 'default',
                boxSizing: 'border-box',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C9A96E';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow =
                  '0 16px 40px rgba(107,79,160,0.10)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#F0EBE3';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, rgba(107,79,160,0.08), rgba(201,169,110,0.08))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 36,
                  margin: '0 auto 22px',
                  border: '1px solid rgba(201,169,110,0.2)',
                  transition: 'transform 0.3s, background 0.3s',
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 26,
                  fontWeight: 600,
                  color: '#2C2C4A',
                  marginBottom: 14,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 16,
                  color: '#8A8A9A',
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 600px) {
          .why-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyUs;