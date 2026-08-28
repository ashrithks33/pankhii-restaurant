const CONTACT_INFO = [
  {
    icon: "📞",
    title: "Phone",
    value: "+91 80958 09571",
  },
  {
    icon: "📍",
    title: "Address",
    value: "1st Floor 877/4a, Vani Villas Road Near RTO Circle, Lakshmipuram, Mysuru 570004",
  },
]

const B = {
  brown: '#46342f',
  brownMuted: '#7a6b61',
  teal: '#28c7d8',
  cream: '#fdf6e3',
  creamWarm: '#fcf0d9',
  yellow: '#f5c842',
}

const display = "'Nunito', system-ui, sans-serif"
const sans = "'Inter', system-ui, sans-serif"

export default function Contact() {
  return (
    <section id="contact" style={{ background: B.cream, padding: '100px 0' }}>
      {/* ── ctc-* classes are fully isolated to this section ── */}
      <style>{`
        .ctc-outer {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .ctc-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
        }
        .ctc-cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .ctc-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        /* ── Mobile-only overrides ── */
        @media (max-width: 640px) {
          .ctc-outer { padding: 0 16px; }
          .ctc-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .ctc-cards {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .ctc-stats {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
        }
        @media (max-width: 375px) {
          .ctc-outer { padding: 0 14px; }
        }
      `}</style>

      <div className="ctc-outer">
        <div className="ctc-grid">
          <div>
            <p style={{ fontFamily: display, fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.18em', color: B.teal, marginBottom: '18px' }}>
              Contact
            </p>
            <h2 style={{ fontFamily: display, fontWeight: 900, fontSize: '46px', lineHeight: 1.05, color: B.brown, marginBottom: '24px' }}>
              Reach out to the Pankhii family for reservations and enquiries.
            </h2>
            <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '18px', lineHeight: 1.8, color: B.brownMuted, maxWidth: '620px', marginBottom: '38px' }}>
              Whether you're planning a family celebration or a cozy weekday meal, we're ready to help. Use the details below to book your table, ask about our vegetarian specialties, or find our Mysuru location.
            </p>

            <div className="ctc-cards">
              {CONTACT_INFO.map(item => (
                <div key={item.title} style={{ background: B.creamWarm, borderRadius: '24px', padding: '24px', boxShadow: '0 18px 40px rgba(90,51,36,0.08)', border: '1px solid rgba(90,51,36,0.12)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                    <p style={{ fontFamily: display, fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.14em', color: B.brown, margin: 0 }}>
                      {item.title}
                    </p>
                  </div>
                  <p style={{ fontFamily: sans, fontWeight: 500, fontSize: '15px', color: B.brownMuted, margin: 0, lineHeight: 1.75, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    {item.title === 'Phone' ? <a href="tel:+918095809571" style={{ color: 'inherit', textDecoration: 'none' }}>{item.value}</a> : item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <a
            href="https://www.google.com/maps/place/Pankhii+Veg+Restaurant+%7C+Mysuru/@12.2988174,76.6438459,17z/data=!3m1!4b1!4m6!3m5!1s0x3baf71007755180d:0x5b532179538bb265!8m2!3d12.2988174!4d76.6438459!16s%2Fg%2F11x8p7mp8j?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer', borderRadius: '32px', overflow: 'hidden', minHeight: '340px', background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(253,246,227,0.95) 100%)', boxShadow: '0 32px 64px rgba(90,51,36,0.12)', border: '1px solid rgba(90,51,36,0.08)' }}
          >
            <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <p style={{ fontFamily: display, fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.16em', color: B.teal, marginBottom: '16px' }}>
                  Visit Us
                </p>
                <h3 style={{ fontFamily: display, fontWeight: 900, fontSize: '28px', lineHeight: 1.2, color: B.brown, marginBottom: '18px' }}>
                  A warm, welcoming table for every family.
                </h3>
                <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '15px', lineHeight: 1.75, color: B.brownMuted, marginBottom: '24px' }}>
                  Pankhii Veg Restaurant blends cozy interiors, elegant vegetarian bowls, and joyful hospitality to make each meal feel like home.
                </p>
              </div>

              <div className="ctc-stats">
                <div style={{ background: B.cream, borderRadius: '22px', padding: '18px', border: '1px solid rgba(90,51,36,0.08)' }}>
                  <p style={{ fontFamily: display, fontWeight: 900, fontSize: '22px', color: B.brown, margin: 0 }}>15+</p>
                  <p style={{ fontFamily: sans, fontWeight: 500, fontSize: '12px', color: B.brownMuted, margin: '8px 0 0' }}>Years serving families</p>
                </div>
                <div style={{ background: B.cream, borderRadius: '22px', padding: '18px', border: '1px solid rgba(90,51,36,0.08)' }}>
                  <p style={{ fontFamily: display, fontWeight: 900, fontSize: '22px', color: B.brown, margin: 0 }}>100+</p>
                  <p style={{ fontFamily: sans, fontWeight: 500, fontSize: '12px', color: B.brownMuted, margin: '8px 0 0' }}>Happy vegetarian guests</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
