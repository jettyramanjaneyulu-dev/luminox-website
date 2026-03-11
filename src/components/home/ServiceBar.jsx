import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const services = [
  { icon: '✨', label: 'Skin Care' },
  { icon: '💆', label: 'Hair Care' },
  { icon: '⚡', label: 'Laser' },
  { icon: '🌿', label: 'Anti-Ageing' },
  { icon: '💎', label: 'Advanced' },
];

const ServiceBar = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemRefs.current;

    const setHidden = () => {
      items.forEach((item, i) => {
        if (!item) return;
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.95)';
        item.style.transition = `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`;
      });
    };

    const setVisible = () => {
      items.forEach((item) => {
        if (!item) return;
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
      });
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
      { threshold: 0.2 }
    );

    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      background: 'white',
      boxShadow: '0 4px 20px rgba(44,44,74,0.06)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {services.map((svc, i) => (
            <div
              key={i}
              ref={el => itemRefs.current[i] = el}
              onClick={() => navigate('/services')}
              style={{
                padding: '32px 44px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                borderRight: i < services.length - 1
                  ? '1px solid #F0EBE3' : 'none',
                transition: 'all 0.3s',
                flex: '1 1 120px',
                minWidth: 100,
                position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#FAF8F5';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.querySelector('.svc-label').style.color = '#6B4FA0';
                e.currentTarget.querySelector('.svc-icon').style.transform = 'scale(1.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.querySelector('.svc-label').style.color = '#2C2C4A';
                e.currentTarget.querySelector('.svc-icon').style.transform = 'scale(1)';
              }}
            >
              {/* Gold bottom border on hover */}
              <div style={{
                position: 'absolute', bottom: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: 0, height: 2,
                background: 'linear-gradient(90deg, #C9A96E, #6B4FA0)',
                transition: 'width 0.3s ease',
              }} className="svc-underline" />

              <div
                className="svc-icon"
                style={{
                  fontSize: 38,
                  transition: 'transform 0.3s ease',
                }}
              >
                {svc.icon}
              </div>

              <span
                className="svc-label"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 14, fontWeight: 600,
                  letterSpacing: 1.5, textTransform: 'uppercase',
                  color: '#2C2C4A', transition: 'color 0.3s',
                }}
              >
                {svc.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        div:hover .svc-underline {
          width: 60% !important;
        }
        @media (max-width: 600px) {
          .svc-underline { display: none; }
        }
      `}</style>
    </section>
  );
};

export default ServiceBar;