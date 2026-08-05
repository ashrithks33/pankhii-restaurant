import { useState } from "react";
import logoImg from '@/imports/Screenshot_2026-08-05_092225.png'

const B = {
  cream: '#FDF6E3',
  creamWarm: '#F7E0A3',
  creamDeep: '#F0D080',
  yellow: '#F5C842',
  brown: '#5A3324',
  brownLight: '#7A4A34',
  brownMuted: 'rgba(90,51,36,0.5)',
  teal: '#28C7D8',
  tealPale: 'rgba(40,199,216,0.14)',
  green: '#8BC34A',
  greenDark: '#6A9E32',
  orange: '#E8834A',
  white: '#ffffff',
}

const display = "'Nunito', system-ui, sans-serif"

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reservation', href: '#reservations' },
  { label: 'Contact', href: '#contact' },
]
export default function Navbar({ scrolled }: { scrolled: boolean }) {
  const [active, setActive]   = useState('Home')
  const [btnHover, setBtnHover] = useState(false)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(253,246,227,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? `1px solid rgba(90,51,36,0.1)` : 'none',
      boxShadow: scrolled ? '0 4px 24px rgba(90,51,36,0.07)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="#home" style={{ display: 'block', flexShrink: 0 }}>
          <img
            src={logoImg}
            alt="Pankhii Veg Restaurant"
            style={{ height: '52px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </a>

        {/* Links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = active === label
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setActive(label)}
                  style={{
                    fontFamily: display, fontWeight: 700, fontSize: '14px',
                    textDecoration: 'none', letterSpacing: '0.02em',
                    color: isActive ? B.teal : B.brownLight,
                    borderBottom: isActive ? `2px solid ${B.teal}` : '2px solid transparent',
                    paddingBottom: '3px',
                    transition: 'color 0.25s, border-color 0.25s',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = B.teal } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = B.brownLight } }}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <a
          href="#reservations"
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            fontFamily: display, fontWeight: 800, fontSize: '13px', letterSpacing: '0.04em',
            textDecoration: 'none', padding: '11px 24px', borderRadius: '999px',
            background: btnHover ? B.teal : 'transparent',
            color: btnHover ? B.white : B.teal,
            border: `2px solid ${B.teal}`,
            transition: 'all 0.25s ease',
            whiteSpace: 'nowrap',
            display: 'inline-block',
          }}
        >
          Reserve Table
        </a>
      </div>
    </nav>
  )
}