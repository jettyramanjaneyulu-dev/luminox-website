import { Link } from 'react-router-dom';

const CTABanner = () => {
  return (
    <section style={{
      padding: '80px 0',
      background: 'linear-gradient(135deg, #C9A96E, #E8C98A)',
      textAlign: 'center',
    }}>
      <div className="container">
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(36px, 4vw, 54px)',   // ⬆ was clamp(28px, 3.5vw, 44px)
          fontWeight: 700, color: '#2C2C4A',
          marginBottom: 16,
        }}>
          Ready for Your Transformation?
        </h2>
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 18,             // ⬆ was 15
          color: '#4A4A6A',
          marginBottom: 36, maxWidth: 520,
          margin: '0 auto 40px', lineHeight: 1.9,
        }}>
          Book a free consultation today and take the
          first step towards radiant skin and healthy hair.
        </p>
        <div style={{
          display: 'flex', gap: 16,
          justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <Link to="/appointment" style={{
            background: 'linear-gradient(135deg, #6B4FA0, #8B6FBF)',
            color: 'white', padding: '17px 44px',   // ⬆ padding
            borderRadius: 2, textDecoration: 'none',
            fontFamily: "'Jost', sans-serif",
            fontSize: 15,           // ⬆ was 13
            fontWeight: 500,
            letterSpacing: 1.5, textTransform: 'uppercase',
            display: 'inline-block', transition: 'all 0.3s',
          }}>
            Book Free Consultation ✦
          </Link>
          <Link to="/contact" style={{
            background: 'transparent',
            color: '#2C2C4A',
            border: '1.5px solid #2C2C4A',
            padding: '16px 44px', borderRadius: 2,  // ⬆ padding
            textDecoration: 'none',
            fontFamily: "'Jost', sans-serif",
            fontSize: 15,           // ⬆ was 13
            fontWeight: 500,
            letterSpacing: 1.5, textTransform: 'uppercase',
            display: 'inline-block', transition: 'all 0.3s',
          }}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
