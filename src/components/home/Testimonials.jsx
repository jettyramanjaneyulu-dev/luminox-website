import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Priya Sharma',
    treatment: 'Laser Skin Toning',
    text: 'Luminox transformed my skin completely! The laser treatment was painless and results are beyond my expectations. The doctors are so professional and caring.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    treatment: 'Hair Loss Treatment',
    text: 'Best hair treatment experience ever. The doctors are highly professional and the staff is very welcoming. My hair loss has reduced significantly after just 3 sessions.',
    rating: 5,
  },
  {
    name: 'Sneha Reddy',
    treatment: 'Hydra Facial',
    text: 'I had the HydraFacial done here and my skin has never looked better. The clinic is spotlessly hygienic and the team is incredibly knowledgeable.',
    rating: 5,
  },
  {
    name: 'Ananya Patel',
    treatment: 'Anti-Ageing Treatment',
    text: 'Outstanding results from the anti-ageing treatment. I look 10 years younger! The personalized approach and attention to detail makes all the difference.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const dotsRef = useRef(null);

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 3500);
  };

  const stopAutoScroll = () => clearInterval(intervalRef.current);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  // Scroll animation
  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const card = cardRef.current;
    const dots = dotsRef.current;

    const setHidden = () => {
      header.style.opacity = '0';
      header.style.transform = 'translateY(40px)';
      header.style.transition = 'opacity 0.7s ease 0s, transform 0.7s ease 0s';

      card.style.opacity = '0';
      card.style.transform = 'translateY(50px) scale(0.96)';
      card.style.transition = 'opacity 0.75s ease 0.2s, transform 0.75s ease 0.2s';

      dots.style.opacity = '0';
      dots.style.transform = 'translateY(20px)';
      dots.style.transition = 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s';
    };

    const setVisible = () => {
      header.style.opacity = '1';
      header.style.transform = 'translateY(0)';

      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';

      dots.style.opacity = '1';
      dots.style.transform = 'translateY(0)';
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
      { threshold: 0.15 }
    );

    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: '100px 0',
      background: 'linear-gradient(135deg, #FAF8F5, #F0EBE3)',
    }}>
      <div className="container">

        {/* Header */}
        <div ref={headerRef} style={{
          textAlign: 'center', marginBottom: 56,
        }}>
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 14, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase',
            color: '#C9A96E',
          }}>Client Stories</div>
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
            What Our Clients{' '}
            <span style={{ color: '#6B4FA0', fontStyle: 'italic' }}>Say</span>
          </h2>
        </div>

        {/* Card */}
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div
            ref={cardRef}
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
            style={{
              background: 'white', borderRadius: 4,
              padding: '56px 52px',
              boxShadow: '0 8px 40px rgba(107,79,160,0.08)',
              border: '1px solid #F0EBE3',
              textAlign: 'center',
              minHeight: 280,
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle corner decoration */}
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: 100, height: 100,
              background: 'linear-gradient(225deg, rgba(201,169,110,0.08), transparent)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0,
              width: 100, height: 100,
              background: 'linear-gradient(45deg, rgba(107,79,160,0.05), transparent)',
              pointerEvents: 'none',
            }} />

            {/* Quote mark */}
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 86, color: '#C9A96E',
              lineHeight: 0.8, marginBottom: 28,
            }}>"</div>

            {/* Text — fade transition on slide */}
            <p
              key={current}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 18, color: '#4A4A6A',
                lineHeight: 1.9, marginBottom: 36,
                fontStyle: 'italic',
                animation: 'fadeSlideIn 0.5s ease forwards',
              }}
            >
              {testimonials[current].text}
            </p>

            {/* Stars */}
            <div style={{
              display: 'flex', justifyContent: 'center',
              gap: 6, marginBottom: 18,
            }}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    color: '#C9A96E', fontSize: 24,
                    animation: `starPop 0.4s ease ${i * 0.07}s both`,
                  }}
                >★</span>
              ))}
            </div>

            {/* Name — fade on slide */}
            <div
              key={`name-${current}`}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 26, fontWeight: 600, color: '#2C2C4A',
                animation: 'fadeSlideIn 0.5s ease 0.1s forwards',
                opacity: 0,
              }}
            >
              {testimonials[current].name}
            </div>

            {/* Treatment */}
            <div
              key={`treat-${current}`}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14, color: '#C9A96E',
                letterSpacing: 1.5, marginTop: 6,
                animation: 'fadeSlideIn 0.5s ease 0.18s forwards',
                opacity: 0,
              }}
            >
              {testimonials[current].treatment}
            </div>
          </div>

          {/* Dots */}
          <div ref={dotsRef} style={{
            display: 'flex', justifyContent: 'center',
            gap: 8, marginTop: 32,
          }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? 32 : 10,
                  height: 10, borderRadius: 5,
                  border: 'none', cursor: 'pointer',
                  background: i === current ? '#6B4FA0' : '#F0EBE3',
                  transition: 'all 0.3s', padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes starPop {
          0%   { transform: scale(0); opacity: 0; }
          70%  { transform: scale(1.3); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;