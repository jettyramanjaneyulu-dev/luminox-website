import { useState, useEffect, useRef } from 'react';

const faqs = [
  {
    q: 'What treatments does Luminox offer?',
    a: 'Luminox offers a comprehensive range of skin, hair, and laser treatments including HydraFacial, laser hair removal, hair transplantation, anti-ageing treatments, Botox & fillers, and advanced aesthetic procedures tailored to your needs.',
  },
  {
    q: 'How do I book a consultation?',
    a: 'You can book a consultation by filling out our appointment form on this page, calling us directly at +91 98765 43210, or visiting our clinic. We offer flexible timing to suit your schedule.',
  },
  {
    q: 'Are the treatments safe?',
    a: 'All our treatments are performed by certified dermatologists using USFDA-approved technology. We follow stringent safety protocols and hygiene standards to ensure the best and safest outcomes for every patient.',
  },
  {
    q: 'How many sessions will I need?',
    a: 'The number of sessions varies depending on the treatment and your individual skin or hair condition. Our doctors will provide a personalized treatment plan with a clear timeline during your initial consultation.',
  },
  {
    q: 'What is the cost of treatments?',
    a: 'Treatment costs vary based on the procedure, number of sessions required, and complexity of the condition. Our team provides a detailed cost breakdown during your consultation, ensuring complete transparency.',
  },
];

const HomeFAQ = () => {
  const [open, setOpen] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const items = itemRefs.current;

    const setHidden = () => {
      // Header fades down
      header.style.opacity = '0';
      header.style.transform = 'translateY(40px)';
      header.style.transition = 'opacity 0.7s ease 0s, transform 0.7s ease 0s';

      // Each FAQ item slides from left with stagger
      items.forEach((item, i) => {
        if (!item) return;
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `opacity 0.65s ease ${0.15 + i * 0.1}s, transform 0.65s ease ${0.15 + i * 0.1}s`;
      });
    };

    const setVisible = () => {
      header.style.opacity = '1';
      header.style.transform = 'translateY(0)';

      items.forEach((item) => {
        if (!item) return;
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
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
      { threshold: 0.1 }
    );

    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: '100px 0', background: '#FAF8F5',
    }}>
      <div className="container">
        <div style={{ maxWidth: 820, margin: '0 auto' }}>

          {/* Header */}
          <div ref={headerRef} style={{
            textAlign: 'center', marginBottom: 56,
          }}>
            <div style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 14, fontWeight: 600,
              letterSpacing: 3, textTransform: 'uppercase',
              color: '#C9A96E',
            }}>FAQ</div>
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
              Frequently Asked{' '}
              <span style={{ color: '#6B4FA0', fontStyle: 'italic' }}>
                Questions
              </span>
            </h2>
          </div>

          {/* FAQ Items */}
          <div>
            {faqs.map((faq, i) => (
              <div
                key={i}
                ref={el => itemRefs.current[i] = el}
                style={{ borderBottom: '1px solid #F0EBE3' }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%', padding: '26px 0',
                    background: 'none', border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 18, fontWeight: 500,
                    color: open === i ? '#6B4FA0' : '#2C2C4A',
                    paddingRight: 20, lineHeight: 1.5,
                    transition: 'color 0.3s',
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    color: '#6B4FA0', fontSize: 28, flexShrink: 0,
                    transition: 'transform 0.3s',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                    display: 'inline-block',
                  }}>+</span>
                </button>

                {/* Answer with smooth slide down */}
                <div style={{
                  maxHeight: open === i ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                }}>
                  <div style={{
                    padding: '0 40px 28px 0',
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 17, color: '#8A8A9A',
                    lineHeight: 1.9,
                  }}>
                    {/* Gold left accent bar */}
                    <div style={{
                      display: 'flex', gap: 16, alignItems: 'flex-start',
                    }}>
                      <div style={{
                        width: 3, borderRadius: 2, flexShrink: 0,
                        background: 'linear-gradient(180deg, #C9A96E, #6B4FA0)',
                        alignSelf: 'stretch', minHeight: 20,
                        marginTop: 4,
                      }} />
                      <p style={{ margin: 0 }}>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;