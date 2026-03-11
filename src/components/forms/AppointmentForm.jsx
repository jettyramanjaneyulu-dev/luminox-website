import { useState } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    service: '', date: '', message: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/appointment`,
        formData
      );
      setStatus('success');
      setFormData({
        name: '', phone: '', email: '',
        service: '', date: '', message: '',
      });
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 4,
    fontFamily: "'Jost', sans-serif", fontSize: 15,
    background: 'rgba(255,255,255,0.07)',
    color: 'white', outline: 'none',
    transition: 'all 0.3s',
    boxSizing: 'border-box',
  };

  return (
    <section id="appointment" style={{
      padding: '110px 0',
      position: 'relative',
      overflow: 'hidden',

      /* 🖼️ Background image — luxury clinic interior */
      backgroundImage: `url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1800&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',  /* Parallax scroll effect */
    }}>

      {/* Dark overlay — makes text readable */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(44,44,74,0.92) 0%, rgba(74,53,112,0.88) 50%, rgba(44,44,74,0.95) 100%)',
        zIndex: 0,
      }} />

      {/* Gold shimmer top border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3,
        background: 'linear-gradient(90deg, transparent, #C9A96E, #E8C98A, #C9A96E, transparent)',
        zIndex: 1,
      }} />

      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: '10%', left: '-5%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'rgba(201,169,110,0.06)',
        filter: 'blur(60px)', zIndex: 0,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-5%',
        width: 350, height: 350, borderRadius: '50%',
        background: 'rgba(107,79,160,0.10)',
        filter: 'blur(70px)', zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'start',
        }} className="appt-grid">

          {/* LEFT — Info */}
          <div>
            {/* Tag */}
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 14, fontWeight: 600,
              letterSpacing: 3, textTransform: 'uppercase',
              color: '#C9A96E',
            }}>Get Started</div>
            <div style={{
              width: 60, height: 2,
              background: 'linear-gradient(90deg, #C9A96E, #E8C98A)',
              margin: '16px 0',
            }} />
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 700, color: 'white',
              marginBottom: 20, lineHeight: 1.15,
            }}>
              Book Your<br />
              <span style={{
                color: '#C9A96E', fontStyle: 'italic',
              }}>Free Consultation</span>
            </h2>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 17, color: 'rgba(255,255,255,0.70)',
              lineHeight: 1.9, marginBottom: 44,
              maxWidth: 420,
            }}>
              Take the first step towards your transformation.
              Our experts will assess your needs and create
              a personalized treatment plan just for you.
            </p>

            {/* Contact Info */}
            {[
              { icon: '📍', label: 'Location', val: 'Clinic Address, Your City' },
              { icon: '📞', label: 'Call Us', val: '+91 98765 43210' },
              { icon: '✉️', label: 'Email', val: 'hello@luminox.com' },
              { icon: '⏰', label: 'Timings', val: 'Mon–Sat: 10AM–8PM' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', gap: 18,
                alignItems: 'center', marginBottom: 24,
              }}>
                {/* Icon circle */}
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'rgba(201,169,110,0.12)',
                  border: '1px solid rgba(201,169,110,0.25)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 12, fontWeight: 600,
                    letterSpacing: 2, textTransform: 'uppercase',
                    color: '#C9A96E', marginBottom: 3,
                  }}>{item.label}</div>
                  <div style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 16, color: 'rgba(255,255,255,0.85)',
                  }}>{item.val}</div>
                </div>
              </div>
            ))}

            {/* Trust badges */}
            <div style={{
              display: 'flex', gap: 20,
              marginTop: 40, flexWrap: 'wrap',
            }}>
              {[
                { num: '10,000+', txt: 'Patients' },
                { num: '5★', txt: 'Rated' },
                { num: '8+', txt: 'Doctors' },
              ].map((b, i) => (
                <div key={i} style={{
                  textAlign: 'center',
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(201,169,110,0.2)',
                  borderRadius: 4,
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 28, fontWeight: 700,
                    color: '#C9A96E', lineHeight: 1,
                  }}>{b.num}</div>
                  <div style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 12, color: 'rgba(255,255,255,0.5)',
                    letterSpacing: 1, marginTop: 4,
                  }}>{b.txt}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            padding: '44px 40px',
            borderRadius: 8,
            border: '1px solid rgba(201,169,110,0.2)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
          }}>
            {/* Form header */}
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: 12, marginBottom: 32,
            }}>
              <div style={{
                width: 4, height: 40,
                background: 'linear-gradient(180deg, #C9A96E, #E8C98A)',
                borderRadius: 2,
              }} />
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 30, fontWeight: 600,
                color: 'white', margin: 0,
              }}>
                Schedule Appointment
              </h3>
            </div>

            {status === 'success' && (
              <div style={{
                background: 'rgba(16,185,129,0.15)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: 4, padding: '14px 16px',
                fontFamily: "'Jost', sans-serif", fontSize: 15,
                color: '#6ee7b7', marginBottom: 20,
              }}>
                ✅ Appointment booked! We'll contact you shortly.
              </div>
            )}
            {status === 'error' && (
              <div style={{
                background: 'rgba(239,68,68,0.15)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 4, padding: '14px 16px',
                fontFamily: "'Jost', sans-serif", fontSize: 15,
                color: '#fca5a5', marginBottom: 20,
              }}>
                ❌ Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <input
                style={inputStyle} name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange} required
                onFocus={e => {
                  e.target.style.borderColor = '#C9A96E';
                  e.target.style.background = 'rgba(255,255,255,0.10)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.target.style.background = 'rgba(255,255,255,0.07)';
                }}
              />
              <input
                style={inputStyle} name="phone" type="tel"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange} required
                onFocus={e => {
                  e.target.style.borderColor = '#C9A96E';
                  e.target.style.background = 'rgba(255,255,255,0.10)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.target.style.background = 'rgba(255,255,255,0.07)';
                }}
              />
              <input
                style={inputStyle} name="email" type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                onFocus={e => {
                  e.target.style.borderColor = '#C9A96E';
                  e.target.style.background = 'rgba(255,255,255,0.10)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.target.style.background = 'rgba(255,255,255,0.07)';
                }}
              />
              <select
                style={{ ...inputStyle, color: formData.service ? 'white' : 'rgba(255,255,255,0.5)' }}
                name="service"
                value={formData.service}
                onChange={handleChange} required
                onFocus={e => {
                  e.target.style.borderColor = '#C9A96E';
                  e.target.style.background = 'rgba(255,255,255,0.10)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.target.style.background = 'rgba(255,255,255,0.07)';
                }}
              >
                <option value="" style={{ background: '#2C2C4A' }}>Select Service *</option>
                <option style={{ background: '#2C2C4A' }}>Skin Care</option>
                <option style={{ background: '#2C2C4A' }}>Hair Treatment</option>
                <option style={{ background: '#2C2C4A' }}>Laser Treatment</option>
                <option style={{ background: '#2C2C4A' }}>Anti-Ageing</option>
                <option style={{ background: '#2C2C4A' }}>Advanced Procedures</option>
                <option style={{ background: '#2C2C4A' }}>General Consultation</option>
              </select>
              <input
                style={{ ...inputStyle, colorScheme: 'dark' }}
                name="date" type="date"
                value={formData.date}
                onChange={handleChange}
                onFocus={e => {
                  e.target.style.borderColor = '#C9A96E';
                  e.target.style.background = 'rgba(255,255,255,0.10)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.target.style.background = 'rgba(255,255,255,0.07)';
                }}
              />
              <textarea
                style={{ ...inputStyle, resize: 'vertical' }}
                name="message" rows={3}
                placeholder="Any specific concerns..."
                value={formData.message}
                onChange={handleChange}
                onFocus={e => {
                  e.target.style.borderColor = '#C9A96E';
                  e.target.style.background = 'rgba(255,255,255,0.10)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.target.style.background = 'rgba(255,255,255,0.07)';
                }}
              />
              <button type="submit"
                disabled={loading}
                style={{
                  background: loading
                    ? 'rgba(138,138,154,0.5)'
                    : 'linear-gradient(135deg, #C9A96E, #E8C98A)',
                  color: loading ? 'white' : '#2C2C4A',
                  border: 'none',
                  padding: '17px', borderRadius: 4,
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 15, fontWeight: 700,
                  letterSpacing: 2, textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  marginTop: 4,
                }}>
                {loading ? '⏳ Booking...' : '✦ Book Free Consultation'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .appt-grid {
            grid-template-columns: 1fr !important;
          }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.4) !important;
        }
      `}</style>
    </section>
  );
};

export default AppointmentForm;