import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Injectables = () => {
  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#FAF8F5', paddingTop: 100,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 14, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase',
            color: '#C9A96E', marginBottom: 16,
          }}>Our Services</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 4vw, 56px)',
            fontWeight: 700, color: '#2C2C4A',
          }}>
            <span style={{ color: '#6B4FA0', fontStyle: 'italic' }}>Injectables</span>
          </h1>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 17, color: '#8A8A9A',
            marginTop: 16,
          }}>Page coming soon...</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Injectables;