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
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: display, fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.18em', color: B.teal, marginBottom: '18px' }}>
              Contact
            </p>
            <h2 style={{ fontFamily: display, fontWeight: 900, fontSize: '46px', lineHeight: 1.05, color: B.brown, marginBottom: '24px' }}>
              Reach out to the Pankhii family for reservations and enquiries.
            </h2>
            <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '18px', lineHeight: 1.8, color: B.brownMuted, maxWidth: '620px', marginBottom: '38px' }}>
              Whether you're planning a family celebration or a cozy weekday meal, we’re ready to help. Use the details below to book your table, ask about our vegetarian specialties, or find our Mysuru location.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
              {CONTACT_INFO.map(item => (
                <div key={item.title} style={{ background: B.creamWarm, borderRadius: '24px', padding: '24px', boxShadow: '0 18px 40px rgba(90,51,36,0.08)', border: '1px solid rgba(90,51,36,0.12)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                    <p style={{ fontFamily: display, fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.14em', color: B.brown, margin: 0 }}>
                      {item.title}
                    </p>
                  </div>
                  <p style={{ fontFamily: sans, fontWeight: 500, fontSize: '15px', color: B.brownMuted, margin: 0, lineHeight: 1.75 }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderRadius: '32px', overflow: 'hidden', minHeight: '340px', background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(253,246,227,0.95) 100%)', boxShadow: '0 32px 64px rgba(90,51,36,0.12)', border: '1px solid rgba(90,51,36,0.08)' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
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
          </div>
        </div>
      </div>
    </section>
  )
}
