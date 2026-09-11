import React from 'react'

const CONTACT_INFO = [
  {
    title: "ADDRESS",
    value: "1st Floor 877/4a, Vani Villas Road Near RTO Circle, Lakshmipuram, Mysuru 570004",
  },
  {
    title: "TELEPHONE",
    value: "+91 80958 09571",
  },
  {
    title: "EMAIL",
    value: "hello@pankhii.in",
  },
]

const B = {
  cream: '#FFF9F2',
  creamWarm: '#F8EEDB',
  brown: '#4E342E',
  brownLight: '#7A5C4F',
  brownMuted: 'rgba(78,52,46,0.6)',
  teal: '#28C7D8',
  white: '#FFFFFF',
}

const display = "'Nunito', system-ui, sans-serif"
const sans = "'Inter', system-ui, sans-serif"

function SectionTag({ children, color = B.teal }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
      <span style={{ fontFamily: display, fontWeight: 700, fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color }}>
        {children}
      </span>
    </div>
  )
}

export default function Reservation() {
  return (
    <section id="reservations" style={{ background: `linear-gradient(180deg, ${B.creamWarm} 0%, ${B.cream} 100%)`, padding: '120px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

        {/* Left — unchanged */}
        <div>
          <SectionTag color={B.teal}>Reservations</SectionTag>
          <h2 style={{ fontFamily: display, fontWeight: 900, fontSize: '52px', lineHeight: 1.1, color: B.brown, marginBottom: '20px' }}>
            Your table<br /><span style={{ color: B.teal }}>awaits</span>.
          </h2>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '16px', lineHeight: 1.8, color: B.brownLight, marginBottom: '40px' }}>
            We seat guests Tuesday through Sunday, from 12 PM to 3 PM and 7 PM to 11 PM. Walk-ins welcome at the bar.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {CONTACT_INFO.map(item => (
              <div key={item.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '18px 22px', background: B.white, borderRadius: '18px', boxShadow: '0 16px 36px rgba(78,52,46,0.08)' }}>
                <div style={{ minWidth: '4px', borderLeft: `4px solid ${B.teal}`, paddingLeft: '12px' }} />
                <div>
                  <p style={{ fontFamily: display, fontWeight: 700, fontSize: '11px', color: B.teal, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>{item.title}</p>
                  <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', color: B.brownLight, margin: 0 }}>
                    {item.title === 'TELEPHONE'
                      ? <a href="tel:+918095809571" style={{ color: 'inherit', textDecoration: 'none' }}>{item.value}</a>
                      : item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — phone CTA card */}
        <div style={{ background: B.white, borderRadius: '28px', padding: '44px', boxShadow: '0 24px 64px rgba(78,52,46,0.12)', border: `1px solid rgba(40,199,216,0.12)` }}>
          <h3 style={{ fontFamily: display, fontWeight: 900, fontSize: '28px', color: B.brown, marginBottom: '16px', lineHeight: 1.2 }}>
            Reserve by Phone
          </h3>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '15px', lineHeight: 1.8, color: B.brownLight, marginBottom: '36px' }}>
            Call us directly to check table availability and reserve your table. Our team will be happy to assist you.
          </p>

          <a
            href="tel:+918095809571"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', padding: '18px', borderRadius: '14px',
              background: B.teal, color: B.white, textDecoration: 'none',
              fontFamily: display, fontWeight: 800, fontSize: '17px', letterSpacing: '0.04em',
              boxShadow: '0 8px 24px rgba(40,199,216,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 32px rgba(40,199,216,0.45)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'none'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(40,199,216,0.35)' }}
          >
            📞 Call to Reserve
          </a>

          <p style={{ fontFamily: display, fontWeight: 800, fontSize: '18px', color: B.brown, textAlign: 'center', marginTop: '20px', marginBottom: '8px' }}>
            +91 80958 09571
          </p>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '13px', color: B.brownMuted, textAlign: 'center', marginBottom: '16px' }}>
            Tuesday–Sunday · 12 PM–3 PM &amp; 7 PM–11 PM
          </p>
          <p style={{ fontFamily: sans, fontStyle: 'italic', fontWeight: 400, fontSize: '13px', color: B.brownMuted, textAlign: 'center', margin: 0 }}>
            We'll help you find the perfect table.
          </p>
        </div>

      </div>
    </section>
  )
}
