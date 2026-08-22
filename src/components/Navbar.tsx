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
  const [menuOpen, setMenuOpen] = useState(false)

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
      <style>{`
        .navbar-inner { display: flex; align-items: center; justify-content: flex-start; max-width: 1440px; margin: 0 auto; padding: 0 64px; height: 76px; }
        .navbar-menu-button { display: none; width: 44px; height: 44px; border: none; background: transparent; cursor: pointer; border-radius: 999px; align-items: center; justify-content: center; color: ${B.brown}; transition: background 0.2s ease; }
        .navbar-menu-button:hover { background: rgba(90,51,36,0.06); }
        .navbar-links { display: flex; align-items: center; gap: 30px; list-style: none; margin: 0; padding: 0; margin-left: 32px; }
        .navbar-cta { margin-left: auto; white-space: nowrap; display: inline-block; }
        .mobile-nav-panel { display: none; position: absolute; top: 100%; left: 0; right: 0; background: rgba(253,246,227,0.96); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border-bottom-left-radius: 18px; border-bottom-right-radius: 18px; padding: 18px 18px 22px; box-shadow: 0 24px 60px rgba(90,51,36,0.12); flex-direction: column; gap: 12px; }
        .mobile-nav-link { display: block; width: 100%; font-family: ${display}; font-weight: 700; font-size: 15px; letter-spacing: 0.02em; color: ${B.brown}; text-decoration: none; padding: 12px 14px; border-radius: 14px; transition: background 0.2s, color 0.2s; }
        .mobile-nav-link:hover { background: rgba(40,199,216,0.1); color: ${B.teal}; }
        .mobile-nav-cta { display: block; width: 100%; text-align: center; font-family: ${display}; font-weight: 800; font-size: 14px; letter-spacing: 0.04em; text-decoration: none; padding: 14px 0; border-radius: 999px; background: ${B.teal}; color: ${B.white}; border: 2px solid ${B.teal}; }
        @media (max-width: 760px) {
          .navbar-inner { padding: 0 20px !important; height: 66px !important; }
          .navbar-links, .navbar-cta { display: none !important; }
          .navbar-menu-button { display: inline-flex !important; }
          .mobile-nav-panel { display: ${menuOpen ? 'flex' : 'none'} !important; }
        }
        @media (max-width: 520px) {
          .navbar-inner { padding: 0 16px !important; }
          .navbar-menu-button { width: 40px; height: 40px; }
        }
      `}</style>
      <div className="navbar-inner">

        {/* Logo */}
        <a href="#home" style={{ display: 'block', flexShrink: 0, textDecoration: 'none' }}>
          <img
            src={logoImg}
            alt="Pankhii Veg Restaurant"
            style={{ width: '128px', height: '56px', objectFit: 'contain', display: 'block' }}
          />
        </a>

        {/* Links */}
        <ul className="navbar-links" style={{ display: 'flex', alignItems: 'center', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}>
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
          className="navbar-cta"
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

        <button
          type="button"
          className="navbar-menu-button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(open => !open)}
          style={{ display: 'none' }}
        >
          <span style={{ fontSize: '24px', lineHeight: 1 }}>{menuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      <div className="mobile-nav-panel" aria-hidden={!menuOpen}>
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={() => { setMenuOpen(false); setActive(label); }}
            className="mobile-nav-link"
          >
            {label}
          </a>
        ))}
        <a
          href="#reservations"
          onClick={() => setMenuOpen(false)}
          className="mobile-nav-cta"
        >
          Reserve Table
        </a>
      </div>
    </nav>
  )
}