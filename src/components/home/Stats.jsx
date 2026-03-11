const stats = [
  { number: '10,000+', label: 'Happy Patients', icon: '😊' },
  { number: '50+', label: 'Procedures', icon: '💉' },
  { number: '8+', label: 'Expert Doctors', icon: '👨‍⚕️' },
  { number: '5+', label: 'Years Experience', icon: '🏆' },
];

const Stats = () => {
  return (
    <section style={{
      padding: '90px 0',             // ⬆ was 80px
      background: 'linear-gradient(135deg, #4A3570, #6B4FA0)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(201,169,110,0.10) 0%, transparent 60%),
          radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)
        `,
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>  {/* ⬆ was 52 */}
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 14,             // ⬆ was 11
            fontWeight: 600,
            letterSpacing: 3,         // ⬆ was 4
            textTransform: 'uppercase',
            color: '#E8C98A',
          }}>
            Our Achievements
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 3.5vw, 52px)',   // ⬆ was clamp(28px, 3vw, 42px)
            fontWeight: 700, color: 'white', marginTop: 14,
          }}>
            Trusted by Thousands
          </h2>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
        }} className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} style={{
              textAlign: 'center',
              padding: '36px 20px',   // ⬆ was 32px 16px
              borderRight: i < stats.length - 1
                ? '1px solid rgba(255,255,255,0.10)' : 'none',
            }}>
              <div style={{
                fontSize: 44,         // ⬆ was 36
                marginBottom: 14,
              }}>
                {stat.icon}
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(44px, 5vw, 68px)',  // ⬆ was clamp(36px, 4vw, 56px)
                fontWeight: 700, color: '#C9A96E',
                lineHeight: 1,
              }}>
                {stat.number}
              </div>
              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 15,         // ⬆ was 13
                color: 'rgba(255,255,255,0.70)',
                letterSpacing: 1.5,   // ⬆ was 2
                textTransform: 'uppercase',
                marginTop: 12,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.10);
          }
        }
        @media (max-width: 400px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;