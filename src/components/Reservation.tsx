import { useState } from 'react'

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
  const [form, setForm] = useState({ name: '', email: '', date: '', guests: '2', occasion: '' })
  const [submitted, setSubmitted] = useState(false)

  const inputSt: React.CSSProperties = {
    fontFamily: sans, fontWeight: 400, fontSize: '15px',
    width: '100%', padding: '14px 18px', borderRadius: '14px',
    border: `1.5px solid rgba(78,52,46,0.18)`, background: B.white,
    color: B.brown, outline: 'none', transition: 'border-color 0.25s',
  }

  return (
    <section id="reservations" style={{ background: `linear-gradient(180deg, ${B.creamWarm} 0%, ${B.cream} 100%)`, padding: '120px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

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
                    {item.title === 'TELEPHONE' ? <a href="tel:+918095809571" style={{ color: 'inherit', textDecoration: 'none' }}>{item.value}</a> : item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: B.white, borderRadius: '28px', padding: '44px', boxShadow: '0 24px 64px rgba(78,52,46,0.12)', border: `1px solid rgba(40,199,216,0.12)` }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🐦</div>
              <h3 style={{ fontFamily: display, fontWeight: 900, fontSize: '28px', color: B.teal, marginBottom: '12px' }}>We'll be in touch!</h3>
              <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '15px', color: B.brownLight }}>Your reservation request has been received. Our team will confirm within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
              <h3 style={{ fontFamily: display, fontWeight: 900, fontSize: '22px', color: B.brown, marginBottom: '28px' }}>Book a Table</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: B.brownLight, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Full Name</label>
                  <input required type="text" placeholder="Your name" style={inputSt} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={e => { e.currentTarget.style.borderColor = B.teal }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(78,52,46,0.18)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: B.brownLight, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Email</label>
                  <input required type="email" placeholder="your@email.com" style={inputSt} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={e => { e.currentTarget.style.borderColor = B.teal }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(78,52,46,0.18)' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: B.brownLight, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Date</label>
                  <input required type="date" style={{ ...inputSt, colorScheme: 'light' }} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} onFocus={e => { e.currentTarget.style.borderColor = B.teal }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(78,52,46,0.18)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: B.brownLight, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Guests</label>
                  <select style={{ ...inputSt, cursor: 'pointer' }} value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} onFocus={e => { e.currentTarget.style.borderColor = B.teal }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(78,52,46,0.18)' }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: B.brownLight, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Special Occasion (optional)</label>
                <input type="text" placeholder="Birthday, anniversary…" style={inputSt} value={form.occasion} onChange={e => setForm({ ...form, occasion: e.target.value })} onFocus={e => { e.currentTarget.style.borderColor = B.teal }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(78,52,46,0.18)' }} />
              </div>
              <button
                type="submit"
                style={{
                  width: '100%', padding: '16px', borderRadius: '14px', border: 'none', cursor: 'pointer',
                  fontFamily: display, fontWeight: 800, fontSize: '15px', letterSpacing: '0.04em',
                  background: B.teal, color: B.white,
                  boxShadow: '0 8px 24px rgba(40,199,216,0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(40,199,216,0.45)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(40,199,216,0.35)' }}
              >
                🐦 Request Reservation
              </button>
              <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '12px', color: B.brownLight, textAlign: 'center', marginTop: '12px' }}>No payment required · Confirmed within 2 hours</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
