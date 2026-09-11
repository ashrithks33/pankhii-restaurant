import { useContext } from 'react'

// ── Consume shared ThemeContext from App ─────────────────────────
import { ThemeContext } from '../App'

const B = {
  cream: '#FFF9F2',
  creamWarm: '#F8EEDB',
  brown: '#4E342E',
  brownLight: '#7A5C4F',
  brownMuted: 'rgba(78,52,46,0.6)',
  teal: '#28C7D8',
  tealPale: 'rgba(40,199,216,0.08)',
  white: '#FFFFFF',
  gold: '#D4AF37',
}

// Dark tokens
const D = {
  cream: '#1A1612',
  creamWarm: '#1F1C18',
  brown: '#F5EDD8',
  brownLight: '#C9B99A',
  brownMuted: 'rgba(245,237,216,0.5)',
  teal: '#2EC7D8',
  tealPale: 'rgba(46,199,216,0.12)',
  white: '#272018',
  gold: '#D4AF37',
}

const display = "'Nunito', system-ui, sans-serif"
const sans = "'Inter', system-ui, sans-serif"

const CONTACT_ITEMS = [
  { emoji: '📍', label: 'Address', value: '1st Floor 877/4a, Vani Villas Road Near RTO Circle, Lakshmipuram, Mysuru 570004' },
  { emoji: '📞', label: 'Telephone', value: '+91 80958 09571', href: 'tel:+918095809571' },
  { emoji: '✉️', label: 'Email', value: 'hello@pankhii.in', href: 'mailto:hello@pankhii.in' },
  { emoji: '🕐', label: 'Hours', value: 'Tue–Sun · 12–3 PM & 7–11 PM' },
]

export default function Contact() {
  const { isDark } = useContext(ThemeContext)
  const T = isDark ? D : B

  return (
    <section
      id="contact-us"
      style={{
        background: isDark
          ? `linear-gradient(180deg, #0E0C0A 0%, #1A1612 100%)`
          : `linear-gradient(180deg, ${B.green ?? '#0F3D2E'} 0%, #1C5C46 100%)`,
        padding: '100px 0',
      }}
    >
      <style>{`
        .contact-grid {
          max-width: 1440px; margin: 0 auto; padding: 0 64px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center;
        }
        .contact-card {
          padding: 28px 32px; border-radius: 20px;
          background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.09)'};
          border: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.13)'};
          display: flex; align-items: flex-start; gap: 18px;
          transition: background 0.25s ease;
        }
        .contact-card:hover { background: ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.14)'}; }
        @media (max-width: 960px) {
          .contact-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 760px) {
          .contact-grid { padding: 0 24px; }
        }
        @media (max-width: 520px) {
          .contact-grid { padding: 0 16px; }
          .contact-card { padding: 20px 22px; }
        }
      `}</style>

      <div className="contact-grid">
        {/* Left — heading */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: B.teal }} />
            <span style={{ fontFamily: display, fontWeight: 700, fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color: B.teal }}>
              Find Us
            </span>
          </div>
          <h2 style={{ fontFamily: display, fontWeight: 900, fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1.1, color: '#FFFFFF', marginBottom: '20px' }}>
            Come visit <span style={{ color: B.teal }}>Pankhii</span>.
          </h2>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '36px', maxWidth: '420px' }}>
            We'd love to have you at our table. Stop by for lunch or dinner and experience the warmth of Pankhii.
          </p>
          <a
            href="https://www.google.com/maps/place/Pankhii+Veg+Restaurant+%7C+Mysuru/@12.2988174,76.6438459,17z"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 28px', borderRadius: '999px',
              background: B.teal, color: '#FFFFFF', textDecoration: 'none',
              fontFamily: display, fontWeight: 800, fontSize: '14px',
              boxShadow: '0 8px 28px rgba(40,199,216,0.35)',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 14px 36px rgba(40,199,216,0.48)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'none'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(40,199,216,0.35)' }}
          >
            🗺️ Get Directions
          </a>
        </div>

        {/* Right — contact cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {CONTACT_ITEMS.map(item => (
            <div key={item.label} className="contact-card">
              <span style={{ fontSize: '22px', flexShrink: 0 }}>{item.emoji}</span>
              <div>
                <p style={{ fontFamily: display, fontWeight: 700, fontSize: '11px', color: B.teal, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', color: 'rgba(255,255,255,0.78)', margin: 0 }}>
                  {item.href
                    ? <a href={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>{item.value}</a>
                    : item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
