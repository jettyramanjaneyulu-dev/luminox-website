import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const HomeAbout = () => {
  const sectionRef = useRef(null);
  const leftBoxRef = useRef(null);
  const floatCard1Ref = useRef(null);
  const floatCard2Ref = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);
  const pointsRef = useRef(null);
  const btnsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const items = [
      { ref: leftBoxRef, from: 'translateX(-70px)', delay: '0s' },
      { ref: floatCard1Ref, from: 'translateY(40px) scale(0.9)', delay: '0.3s' },
      { ref: floatCard2Ref, from: 'translateX(40px) scale(0.9)', delay: '0.2s' },
      { ref: tagRef, from: 'translateX(70px)', delay: '0.1s' },
      { ref: headingRef, from: 'translateX(70px)', delay: '0.2s' },
      { ref: para1Ref, from: 'translateX(70px)', delay: '0.3s' },
      { ref: para2Ref, from: 'translateX(70px)', delay: '0.4s' },
      { ref: pointsRef, from: 'translateX(70px)', delay: '0.5s' },
      { ref: btnsRef, from: 'translateX(70px)', delay: '0.6s' },
    ];

    const setHidden = () => {
      items.forEach(({ ref, from, delay }) => {
        if (!ref.current) return;
        ref.current.style.opacity = '0';
        ref.current.style.transform = from;
        ref.current.style.transition = `opacity 0.75s ease ${delay}, transform 0.75s ease ${delay}`;
      });
    };

    const setVisible = () => {
      items.forEach(({ ref }) => {
        if (!ref.current) return;
        ref.current.style.opacity = '1';
        ref.current.style.transform = 'translateX(0) translateY(0) scale(1)';
      });
    };

    setHidden();

    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting ? setVisible() : setHidden();
      },
      { threshold: 0.15 }
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
        overflowX: 'hidden'
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
          className="about-grid"
        >

          {/* LEFT */}
          <div style={{ position: 'relative' }}>

            <div
              ref={leftBoxRef}
              style={{
                width: '85%',
                height: 480,
                background:
                  'linear-gradient(135deg, rgba(107,79,160,0.08), rgba(201,169,110,0.08))',
                borderRadius: 4,
                border: '1px solid rgba(201,169,110,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 100,
              }}
            >
              🏥
            </div>

            {/* Floating Card 1 */}
            <div
              ref={floatCard1Ref}
              style={{
                position: 'absolute',
                bottom: -24,
                right: 0,
                width: '52%',
                background: 'white',
                borderRadius: 4,
                padding: '26px 30px',
                boxShadow: '0 12px 40px rgba(107,79,160,0.12)',
                border: '1px solid #F0EBE3',
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 52,
                  fontWeight: 700,
                  color: '#6B4FA0',
                  lineHeight: 1,
                }}
              >
                5+
              </div>

              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 15,
                  color: '#8A8A9A',
                  letterSpacing: 1,
                  marginTop: 6,
                }}
              >
                Years of Excellence
              </div>

              <div
                style={{
                  marginTop: 14,
                  height: 2,
                  background: 'linear-gradient(90deg, #C9A96E, #6B4FA0)',
                  width: 44,
                }}
              />
            </div>

            {/* Floating Card 2 */}
            <div
              ref={floatCard2Ref}
              style={{
                position: 'absolute',
                top: 24,
                right: 0,
                background: 'white',
                borderRadius: 4,
                padding: '18px 22px',
                boxShadow: '0 8px 24px rgba(107,79,160,0.10)',
                border: '1px solid #F0EBE3',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 32 }}>🏆</div>

              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#6B4FA0',
                  letterSpacing: 1,
                  marginTop: 8,
                }}
              >
                AWARD WINNING
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>

            <div
              ref={tagRef}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#C9A96E',
              }}
            >
              About Luminox
            </div>

            <div
              style={{
                width: 60,
                height: 2,
                background: 'linear-gradient(90deg, #C9A96E, #6B4FA0)',
                margin: '16px 0',
              }}
            />

            <h2
              ref={headingRef}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(36px, 4vw, 52px)',
                fontWeight: 700,
                color: '#2C2C4A',
                lineHeight: 1.2,
                marginBottom: 22,
              }}
            >
              Where Beauty Meets
              <br />
              <span style={{ color: '#6B4FA0', fontStyle: 'italic' }}>
                Medical Excellence
              </span>
            </h2>

            <p
              ref={para1Ref}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 17,
                color: '#4A4A6A',
                lineHeight: 1.9,
                marginBottom: 20,
              }}
            >
              At Luminox, we believe every individual deserves to look
              and feel their absolute best. Our clinic combines
              cutting-edge technology with the expertise of
              board-certified dermatologists to deliver
              transformative results.
            </p>

            <p
              ref={para2Ref}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 17,
                color: '#4A4A6A',
                lineHeight: 1.9,
                marginBottom: 36,
              }}
            >
              From advanced laser treatments to comprehensive hair
              restoration, we offer personalized solutions tailored
              to your unique needs — all under one roof.
            </p>

            {/* Buttons */}
            <div
              ref={btnsRef}
              style={{
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <Link
                to="/appointment"
                style={{
                  background:
                    'linear-gradient(135deg, #6B4FA0, #8B6FBF)',
                  color: 'white',
                  padding: '16px 36px',
                  borderRadius: 2,
                  textDecoration: 'none',
                }}
              >
                Book Consultation
              </Link>

              <Link
                to="/about"
                style={{
                  background: 'transparent',
                  color: '#6B4FA0',
                  border: '1.5px solid #6B4FA0',
                  padding: '15px 36px',
                  borderRadius: 2,
                  textDecoration: 'none',
                }}
              >
                Learn More
              </Link>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width:768px){
          .about-grid{
            grid-template-columns:1fr !important;
            gap:60px !important;
          }
          .about-grid > div:first-child{
            display:none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HomeAbout;