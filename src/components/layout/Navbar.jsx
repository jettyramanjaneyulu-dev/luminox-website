import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  {
    label: 'Laser Treatments',
    path: '/laser-treatments',
    children: [
      { label: 'Fraxel DUAL', path: '#' },
      { label: 'Fraxel CO2', path: '#' },
      { label: 'Clear + Brilliant', path: '#' },
      { label: 'Vbeam Perfecta', path: '#' },
      { label: 'Laser for Age Spots', path: '#' },
      { label: 'Laser for Redness', path: '#' },
      { label: 'Laser Hair Removal', path: '#' },
      { label: 'Laser Tattoo Removal', path: '#' },
    ],
  },
  {
    label: 'Injectables',
    path: '/injectables',
    children: [
      { label: 'BOTOX for Non-Surgical Jaw Reduction', path: '#' },
      { label: 'BOTOX Cosmetic', path: '#' },
      { label: 'Nefertiti Lift', path: '#' },
      { label: 'BOTOX for Hyperhidrosis', path: '#' },
      { label: 'BOTOX for Migraines', path: '#' },
      { label: 'BOTOX for TMD/TMJ', path: '#' },
      { label: 'Radiesse', path: '#' },
      { label: 'JUVÉDERM', path: '#' },
      { label: 'JUVÉDERM VOLUMA', path: '#' },
      { label: 'JUVÉDERM VOLLURE XC', path: '#' },
      { label: 'Belotero', path: '#' },
    ],
  },
  {
    label: 'Skin Care',
    path: '/skin-care',
  },
  {
    label: 'Aesthetics',
    path: '/aesthetics',
    children: [
      { label: 'Chemical Peels', path: '#' },
      { label: 'HydraFacial MD', path: '#' },
      { label: 'Sclerotherapy', path: '#' },
      { label: 'Micro-Needling', path: '#' },
      { label: 'PRP Therapy', path: '#' },
    ],
  },
  {
    label: 'Medical Dermatology',
    path: '/medical-dermatology',
    children: [
      { label: 'Mohs Surgery', path: '#' },
      { label: 'Skin Cancer', path: '#' },
      { label: 'Acne', path: '#' },
      { label: 'Acne Scars', path: '#' },
      { label: 'Rosacea', path: '#' },
      { label: 'Moles', path: '#' },
      { label: 'Warts', path: '#' },
      { label: 'Eczema', path: '#' },
      { label: 'Psoriasis', path: '#' },
    ],
  },
  { label: 'About Us', path: '/about' },
];

const Navbar = () => {
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [scrollY,        setScrollY]        = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [isMobile,       setIsMobile]       = useState(false);
  const location      = useLocation();
  const dropdownTimer = useRef(null);
  const lastScrollY   = useRef(0);
  const [navVisible,  setNavVisible]  = useState(true);

  // ── Detect mobile ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Scroll: shrink + hide-on-scroll-down / show-on-scroll-up ──
 useEffect(() => {
  const onScroll = () => {
    const current = window.scrollY;
    setScrolled(current > 60);
    setScrollY(current);

    // Mobile → always visible
    if (window.innerWidth < 1024) {
      setNavVisible(true);
    } 
    // Desktop → hide on scroll down
    else {
      if (current > 120) {
        setNavVisible(current < lastScrollY.current);
      } else {
        setNavVisible(true);
      }
    }

    lastScrollY.current = current;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);

  // ── Close everything on route change ──
  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [location]);

  // ── Lock body scroll when mobile menu open ──
  useEffect(() => {
    document.body.style.overflow = (menuOpen && isMobile) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, isMobile]);

  const handleMouseEnter = (label) => {
    if (isMobile) return;
    clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };
  const handleMouseLeave = () => {
    if (isMobile) return;
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (path) => location.pathname === path;

  const navHeight = scrolled ? 58 : 72;

  return (
    <>
      {/* ── Spacer so page content doesn't hide behind fixed nav ── */}
      <div style={{ height: navHeight }} />

      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: scrolled
          ? 'rgba(255,255,255,0.98)'
          : 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: scrolled
          ? '0 2px 24px rgba(44,44,74,0.10)'
          : '0 1px 12px rgba(44,44,74,0.06)',
        borderBottom: '1px solid rgba(240,235,227,0.8)',
        height: navHeight,
        // Hide/show on scroll
        transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s ease, height 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          height: '100%',
        }}>

          {/* ── LOGO ── */}
          <Link to="/" style={{
            display: 'flex', alignItems: 'center',
            gap: 10, textDecoration: 'none', flexShrink: 0,
          }}>
            <div style={{
              width: scrolled ? 36 : 42,
              height: scrolled ? 36 : 42,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6B4FA0, #C9A96E)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: scrolled ? 15 : 18, color: 'white',
              transition: 'all 0.3s',
              flexShrink: 0,
            }}>✦</div>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: scrolled ? 20 : 24,
                fontWeight: 700, letterSpacing: 3,
                color: '#2C2C4A', lineHeight: 1,
                transition: 'font-size 0.3s',
              }}>LUMINOX</div>
              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 9, letterSpacing: 3,
                color: '#C9A96E', textTransform: 'uppercase',
              }}>Skin · Hair · Laser</div>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          {!isMobile && (
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: 20, flex: 1, justifyContent: 'center',
            }}>
              {navLinks.map(link => (
                <div
                  key={link.path}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link to={link.path} style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 14, fontWeight: 500,
                    letterSpacing: 0.3, textTransform: 'capitalize',
                    color: isActive(link.path) ? '#6B4FA0' : '#2C2C4A',
                    textDecoration: 'none', transition: 'color 0.25s',
                    display: 'flex', alignItems: 'center', gap: 4,
                    whiteSpace: 'nowrap', paddingBottom: 3,
                    borderBottom: isActive(link.path)
                      ? '1.5px solid #C9A96E' : '1.5px solid transparent',
                  }}
                    onMouseEnter={e => { if (!isActive(link.path)) e.currentTarget.style.color = '#6B4FA0'; }}
                    onMouseLeave={e => { if (!isActive(link.path)) e.currentTarget.style.color = '#2C2C4A'; }}
                  >
                    {link.label}
                    {link.children && (
                      <span style={{
                        fontSize: 9, opacity: 0.5,
                        transition: 'transform 0.3s', display: 'inline-block',
                        transform: activeDropdown === link.label ? 'rotate(180deg)' : 'rotate(0)',
                      }}>▼</span>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.children && activeDropdown === link.label && (
                    <div
                      onMouseEnter={() => handleMouseEnter(link.label)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        position: 'absolute', top: 'calc(100% + 14px)',
                        left: '50%', transform: 'translateX(-50%)',
                        background: 'white', minWidth: 240,
                        boxShadow: '0 12px 40px rgba(44,44,74,0.14)',
                        border: '1px solid #F0EBE3',
                        borderTop: '2px solid #C9A96E',
                        borderRadius: '0 0 8px 8px',
                        padding: '8px 0', zIndex: 2000,
                        animation: 'dropIn 0.2s ease',
                      }}>
                      <div style={{
                        position: 'absolute', top: -7, left: '50%',
                        transform: 'translateX(-50%) rotate(45deg)',
                        width: 12, height: 12, background: 'white',
                        borderLeft: '1px solid #F0EBE3',
                        borderTop: '1px solid #F0EBE3',
                      }}/>
                      {link.children.map((child, idx) => (
                        <Link key={idx} to={child.path} style={{
                          display: 'flex', alignItems: 'center',
                          gap: 10, padding: '11px 20px',
                          fontFamily: "'Jost', sans-serif",
                          fontSize: 14, color: '#4A4A6A',
                          textDecoration: 'none', transition: 'all 0.2s',
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
                          <span style={{ width:6, height:6, borderRadius:'50%', background:'#C9A96E', flexShrink:0 }}/>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── DESKTOP CTA ── */}
          {!isMobile && (
            <Link to="/appointment" style={{
              background: 'linear-gradient(135deg, #C9A96E, #E8C98A)',
              color: '#2C2C4A', padding: '10px 22px', borderRadius: 4,
              fontFamily: "'Jost', sans-serif",
              fontSize: 13, fontWeight: 700,
              letterSpacing: 0.5, textTransform: 'uppercase',
              textDecoration: 'none', flexShrink: 0,
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Book Appointment
            </Link>
          )}

          {/* ── MOBILE: Book Now + Hamburger ── */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>

              {/* Book Now — always visible in mobile navbar */}
              {/* <Link to="/appointment" style={{
                background: 'linear-gradient(135deg, #C9A96E, #E8C98A)',
                color: '#2C2C4A', padding: '8px 14px', borderRadius: 6,
                fontFamily: "'Jost', sans-serif",
                fontSize: 11, fontWeight: 700,
                letterSpacing: 0.8, textTransform: 'uppercase',
                textDecoration: 'none', whiteSpace: 'nowrap',
                boxShadow: '0 2px 10px rgba(201,169,110,0.35)',
                transition: 'transform 0.2s',
              }}>
                Book Now
              </Link> */}

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                style={{
                  background: menuOpen ? '#F5F0FF' : 'none',
                  border: menuOpen ? '1px solid rgba(107,79,160,0.2)' : 'none',
                  borderRadius: 8, cursor: 'pointer',
                  width: 42, height: 42,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 5, padding: 0, flexShrink: 0,
                  transition: 'all 0.25s',
                }}
              >
                <span style={{ display:'block', width:22, height:2, background:'#2C2C4A', borderRadius:2, transition:'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}/>
                <span style={{ display:'block', width:22, height:2, background:'#2C2C4A', borderRadius:2, transition:'all 0.3s', opacity: menuOpen ? 0 : 1 }}/>
                <span style={{ display:'block', width:22, height:2, background:'#2C2C4A', borderRadius:2, transition:'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}/>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ══════════════════════════════
          MOBILE MENU OVERLAY
      ══════════════════════════════ */}
      {isMobile && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(10,5,25,0.45)',
              backdropFilter: 'blur(3px)',
              zIndex: 998,
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? 'all' : 'none',
              transition: 'opacity 0.3s ease',
            }}
          />

          {/* Slide-in drawer */}
          <div style={{
            position: 'fixed',
            top: 0, right: 0, bottom: 0,
            width: '82%', maxWidth: 340,
            background: 'white',
            zIndex: 999,
            transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
            display: 'flex', flexDirection: 'column',
            boxShadow: '-8px 0 40px rgba(44,44,74,0.18)',
            overflowY: 'hidden',
          }}>

            {/* Drawer header */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              borderBottom: '1px solid #F0EBE3',
              flexShrink: 0,
            }}>
              <Link to="/" onClick={() => setMenuOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6B4FA0, #C9A96E)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15, color: 'white',
                }}>✦</div>
                <div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:700, letterSpacing:3, color:'#2C2C4A', lineHeight:1 }}>LUMINOX</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:3, color:'#C9A96E', textTransform:'uppercase' }}>Skin · Hair · Laser</div>
                </div>
              </Link>
              <button onClick={() => setMenuOpen(false)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 22, color: '#2C2C4A', lineHeight: 1,
                width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%', transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#F5F0FF'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >✕</button>
            </div>

            {/* Nav items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
              {navLinks.map(link => (
                <div key={link.path}>
                  {/* Row */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    borderBottom: '1px solid #F7F5F2',
                  }}>
                    <Link
                      to={link.path}
                      onClick={() => { if (!link.children) setMenuOpen(false); }}
                      style={{
                        flex: 1, padding: '15px 24px',
                        fontFamily: "'Jost', sans-serif",
                        fontSize: 15, fontWeight: isActive(link.path) ? 600 : 500,
                        letterSpacing: 0.3, textTransform: 'capitalize',
                        color: isActive(link.path) ? '#6B4FA0' : '#2C2C4A',
                        textDecoration: 'none',
                        display: 'flex', alignItems: 'center', gap: 10,
                      }}
                    >
                      {isActive(link.path) && (
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#C9A96E' }}/>
                      )}
                      {link.label}
                    </Link>
                    {link.children && (
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          padding: '15px 20px', color: '#6B4FA0', fontSize: 18,
                          transition: 'transform 0.3s',
                          transform: mobileExpanded === link.label ? 'rotate(45deg)' : 'rotate(0)',
                        }}
                      >+</button>
                    )}
                  </div>

                  {/* Expandable children */}
                  {link.children && mobileExpanded === link.label && (
                    <div style={{
                      background: '#FAFAF8',
                      borderBottom: '1px solid #F0EBE3',
                    }}>
                      {link.children.map((child, idx) => (
                        <Link key={idx} to={child.path}
                          onClick={() => setMenuOpen(false)}
                          style={{
                            display: 'flex', alignItems: 'center',
                            gap: 12, padding: '13px 24px 13px 36px',
                            fontFamily: "'Jost', sans-serif",
                            fontSize: 14, color: '#4A4A6A',
                            textDecoration: 'none',
                            borderBottom: idx < link.children.length - 1 ? '1px solid #F0EBE3' : 'none',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = '#6B4FA0'}
                          onMouseLeave={e => e.currentTarget.style.color = '#4A4A6A'}
                        >
                          <span style={{ width:5, height:5, borderRadius:'50%', background:'#C9A96E', flexShrink:0 }}/>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Drawer footer — CTA */}
            <div style={{
              padding: '20px 24px',
              borderTop: '1px solid #F0EBE3',
              flexShrink: 0,
              background: '#FAFAF8',
            }}>
              <Link to="/appointment"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', textAlign: 'center',
                  background: 'linear-gradient(135deg, #C9A96E, #E8C98A)',
                  color: '#2C2C4A', padding: '14px 24px',
                  borderRadius: 6, fontFamily: "'Jost', sans-serif",
                  fontSize: 14, fontWeight: 700,
                  letterSpacing: 1, textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(201,169,110,0.3)',
                }}
              >
                Book Free Consultation
              </Link>
              <a href="tel:+919876543210" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, marginTop: 10,
                color: '#6B4FA0', textDecoration: 'none',
                fontFamily: "'Jost', sans-serif", fontSize: 14, fontWeight: 500,
              }}>
                <span>📞</span> +91 98765 43210
              </a>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
