import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Our Doctors', path: '/doctors' },
  {
    label: 'Laser Treatments',
    path: '/laser-treatments',
    children: [
      { label: 'Laser Hair Removal', path: '#' },
      { label: 'CO2 Laser Resurfacing', path: '#' },
      { label: 'Laser Toning', path: '#' },
      { label: 'Laser Tattoo Removal', path: '#' },
      { label: 'Fractional Laser', path: '#' },
    ],
  },
  {
    label: 'Injectables',
    path: '/injectables',
    children: [
      { label: 'Botox', path: '#' },
      { label: 'Dermal Fillers', path: '#' },
      { label: 'PRP Therapy', path: '#' },
      { label: 'Mesotherapy', path: '#' },
      { label: 'Lip Augmentation', path: '#' },
    ],
  },
  {
    label: 'Skin Care',
    path: '/skin-care',
    children: [
      { label: 'HydraFacial', path: '#' },
      { label: 'Chemical Peels', path: '#' },
      { label: 'Microdermabrasion', path: '#' },
      { label: 'Skin Brightening', path: '#' },
      { label: 'Acne Treatment', path: '#' },
    ],
  },
  {
    label: 'Medical Derm',
    path: '/medical-dermatology',
    children: [
      { label: 'Psoriasis Treatment', path: '#' },
      { label: 'Eczema Care', path: '#' },
      { label: 'Vitiligo Treatment', path: '#' },
      { label: 'Skin Allergy', path: '#' },
      { label: 'Wart Removal', path: '#' },
    ],
  },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const dropdownTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [location]);

  const handleMouseEnter = (label) => {
    clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 2px 20px rgba(44,44,74,0.08)',
        transition: 'all 0.4s ease',
        padding: scrolled ? '10px 0' : '16px 0',
        borderBottom: '1px solid #F0EBE3',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 16,
        }}>

          {/* LOGO */}
          <Link to="/" style={{
            display: 'flex', alignItems: 'center',
            gap: 12, textDecoration: 'none', flexShrink: 0,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6B4FA0, #C9A96E)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 18, color: 'white',
            }}>✦</div>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 24,               // ⬆ was 20
                fontWeight: 700, letterSpacing: 3,
                color: '#2C2C4A', lineHeight: 1,
              }}>LUMINOX</div>
              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 10,               // ⬆ was 8
                letterSpacing: 3,
                color: '#C9A96E', textTransform: 'uppercase',
              }}>Skin · Hair · Laser</div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: 24, flex: 1, justifyContent: 'center',
          }} className="desktop-nav">

            {navLinks.map(link => (
              <div
                key={link.path}
                style={{ position: 'relative' }}
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link to={link.path} style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 15,             // ⬆ was 12 — matches Dermiq
                  fontWeight: 500,
                  letterSpacing: 0.3,       // less tight — more readable
                  textTransform: 'capitalize',
                  color: isActive(link.path) ? '#6B4FA0' : '#2C2C4A',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  display: 'flex', alignItems: 'center', gap: 4,
                  whiteSpace: 'nowrap',
                  paddingBottom: 3,
                  borderBottom: isActive(link.path)
                    ? '1.5px solid #C9A96E' : '1.5px solid transparent',
                }}
                  onMouseEnter={e => {
                    if (!isActive(link.path)) e.currentTarget.style.color = '#6B4FA0';
                  }}
                  onMouseLeave={e => {
                    if (!isActive(link.path)) e.currentTarget.style.color = '#2C2C4A';
                  }}
                >
                  {link.label}
                  {link.children && (
                    <span style={{
                      fontSize: 10,         // ⬆ was 8
                      transition: 'transform 0.3s',
                      transform: activeDropdown === link.label
                        ? 'rotate(180deg)' : 'rotate(0)',
                      display: 'inline-block',
                      opacity: 0.5,
                    }}>▼</span>
                  )}
                </Link>

                {/* DROPDOWN */}
                {link.children && activeDropdown === link.label && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 14px)',
                    left: '50%', transform: 'translateX(-50%)',
                    background: 'white', minWidth: 230,
                    boxShadow: '0 12px 40px rgba(44,44,74,0.12)',
                    border: '1px solid #F0EBE3',
                    borderTop: '2px solid #C9A96E',
                    borderRadius: '0 0 6px 6px',
                    padding: '8px 0',
                    zIndex: 2000,
                  }}>
                    {/* Arrow tip */}
                    <div style={{
                      position: 'absolute', top: -7, left: '50%',
                      transform: 'translateX(-50%) rotate(45deg)',
                      width: 12, height: 12,
                      background: 'white',
                      borderLeft: '1px solid #F0EBE3',
                      borderTop: '1px solid #F0EBE3',
                    }} />
                    {link.children.map((child, idx) => (
                      <Link key={idx} to={child.path}
                        style={{
                          display: 'flex', alignItems: 'center',
                          gap: 10, padding: '12px 20px',
                          fontFamily: "'Jost', sans-serif",
                          fontSize: 15,     // ⬆ was 13
                          color: '#4A4A6A',
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                          borderLeft: '2px solid transparent',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#FAF8F5';
                          e.currentTarget.style.color = '#6B4FA0';
                          e.currentTarget.style.borderLeftColor = '#C9A96E';
                          e.currentTarget.style.paddingLeft = '24px';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#4A4A6A';
                          e.currentTarget.style.borderLeftColor = 'transparent';
                          e.currentTarget.style.paddingLeft = '20px';
                        }}
                      >
                        <span style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: '#C9A96E', flexShrink: 0,
                        }} />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT — Phone + Book Now */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: 12, flexShrink: 0,
          }} className="desktop-nav">

            {/* Phone Button */}
            {/* <a href="tel:+919876543210" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#2C2C4A', color: 'white',
              padding: '10px 18px', borderRadius: 4,
              textDecoration: 'none',
              fontFamily: "'Jost', sans-serif",
              fontSize: 15,               // ⬆ was 13
              fontWeight: 600, letterSpacing: 0.3,
              transition: 'all 0.3s', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#6B4FA0'}
              onMouseLeave={e => e.currentTarget.style.background = '#2C2C4A'}
            >
              <span style={{ fontSize: 16 }}>📞</span>
              +91 98765 43210
            </a> */}

            {/* Book Now */}
            {/* <Link to="/appointment" style={{
              background: 'linear-gradient(135deg, #C9A96E, #E8C98A)',
              color: '#2C2C4A',
              padding: '10px 22px', borderRadius: 4,
              fontFamily: "'Jost', sans-serif",
              fontSize: 14,               // ⬆ was 12
              fontWeight: 700,
              letterSpacing: 0.5, textTransform: 'uppercase',
              textDecoration: 'none', transition: 'all 0.3s',
              display: 'inline-block', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Book Now
            </Link> */}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', fontSize: 28,   // ⬆ was 26
              color: '#2C2C4A',
            }}
            className="mobile-menu-btn"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div style={{
            background: 'white',
            padding: '8px 24px 28px',
            borderTop: '1px solid #F0EBE3',
            boxShadow: '0 8px 20px rgba(44,44,74,0.08)',
            maxHeight: '80vh', overflowY: 'auto',
          }}>
            {navLinks.map(link => (
              <div key={link.path}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #F0EBE3',
                }}>
                  <Link to={link.path} style={{
                    display: 'block', flex: 1,
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 15,           // ⬆ was 13
                    fontWeight: 500,
                    letterSpacing: 0.5,
                    textTransform: 'capitalize',
                    color: isActive(link.path) ? '#6B4FA0' : '#2C2C4A',
                    textDecoration: 'none', padding: '15px 0',
                  }}>
                    {link.label}
                  </Link>
                  {link.children && (
                    <button onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === link.label ? null : link.label
                      )}
                      style={{
                        background: 'none', border: 'none',
                        cursor: 'pointer', fontSize: 22,   // ⬆ was 20
                        color: '#6B4FA0', padding: '0 8px',
                        transition: 'transform 0.3s',
                        transform: mobileExpanded === link.label
                          ? 'rotate(45deg)' : 'rotate(0)',
                      }}
                    >+</button>
                  )}
                </div>
                {link.children && mobileExpanded === link.label && (
                  <div style={{
                    background: '#FAF8F5',
                    margin: '0 -24px',
                    padding: '4px 24px 8px 36px',
                  }}>
                    {link.children.map((child, idx) => (
                      <Link key={idx} to={child.path} style={{
                        display: 'flex', alignItems: 'center',
                        gap: 10, padding: '11px 0',
                        fontFamily: "'Jost', sans-serif",
                        fontSize: 15,       // ⬆ was 13
                        color: '#4A4A6A',
                        textDecoration: 'none',
                        borderBottom: '1px solid #F0EBE3',
                      }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: '#C9A96E', flexShrink: 0,
                        }} />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile buttons */}
            {/* <a href="tel:+919876543210" style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8,
              marginTop: 18,
              background: '#2C2C4A', color: 'white',
              padding: '14px', borderRadius: 4,
              fontFamily: "'Jost', sans-serif",
              fontSize: 16,               // ⬆ was 14
              fontWeight: 600,
              textDecoration: 'none',
            }}>
              📞 +91 98765 43210
            </a>
            <Link to="/appointment" style={{
              display: 'block', marginTop: 10, textAlign: 'center',
              background: 'linear-gradient(135deg, #C9A96E, #E8C98A)',
              color: '#2C2C4A', padding: '14px',
              borderRadius: 4, fontFamily: "'Jost', sans-serif",
              fontSize: 15,               // ⬆ was 13
              fontWeight: 700, letterSpacing: 0.5,
              textTransform: 'uppercase', textDecoration: 'none',
            }}>
              Book Appointment
            </Link> */}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 1280px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;