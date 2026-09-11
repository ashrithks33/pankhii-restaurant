import { useState, type ReactNode } from 'react'
import logoImg from '@/imports/Screenshot_2026-08-05_092225.png'

const B = {
  cream: '#FFF9F2',
  creamWarm: '#F8EEDB',
  green: '#0F3D2E',
  greenLight: '#1C5C46',
  brown: '#4E342E',
  brownLight: '#7A5C4F',
  white: '#FFFFFF',
  teal: '#28C7D8',
}

const display = "'Nunito', system-ui, sans-serif"
const sans = "'Inter', system-ui, sans-serif"

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reservation', href: '#reservations' },
  { label: 'Contact', href: '#contact' },
]

// ── Props ──────────────────────────────────────────────────────
interface NavbarProps {
  scrolled: boolean
  isDark?: boolean
  onToggle?: () => void
}

// ── Theme Toggle Button ────────────────────────────────────────
function ThemeToggle({ isDark = false, onToggle }: { isDark?: boolean; onToggle?: () => void }) {
  return (
    <button
      className="dm-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}

// ── Navbar ─────────────────────────────────────────────────────
export default function Navbar({ scrolled, isDark = false, onToggle }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovLink, setHovLink] = useState<string | null>(null)

  const navBg = scrolled
    ? isDark
      ? 'rgba(20,17,14,0.97)'
      : `rgba(255,249,242,0.97)`
    : isDark
      ? 'rgba(26,22,18,0.80)'
      : `rgba(255,249,242,0.92)`

  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(78,52,46,0.08)'
  const logoFilter = isDark ? 'brightness(0.92) saturate(0.9)' : 'none'

  return (
    <nav
      className="navbar-outer"
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        background: navBg,
        borderBottom: `1px solid ${borderColor}`,
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}
    >
      <style>{`
        .navbar-inner {
          max-width: 1440px; margin: 0 auto; padding: 0 48px;
          height: 76px; display: flex; align-items: center; justify-content: space-between; gap: 32px;
        }
        .navbar-links {
          display: flex; align-items: center; gap: 0; list-style: none; margin: 0; padding: 0;
        }
        .navbar-link {
          font-family: ${display}; font-weight: 700; font-size: 14px;
          letter-spacing: 0.04em; text-decoration: none;
          padding: 8px 14px; border-radius: 10px;
          transition: color 0.2s, background 0.2s;
          color: ${isDark ? 'rgba(245,237,216,0.78)' : B.brownLight};
          position: relative;
        }
        .navbar-link:hover {
          color: ${isDark ? '#F5EDD8' : B.brown};
          background: ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(78,52,46,0.06)'};
        }
        .navbar-link.active {
          color: ${isDark ? B.teal : B.green};
        }
        .navbar-cta {
          font-family: ${display}; font-weight: 800; font-size: 14px;
          letter-spacing: 0.06em; padding: 10px 24px; border-radius: 999px;
          background: ${B.teal}; color: #FFFFFF; text-decoration: none;
          box-shadow: 0 6px 20px rgba(40,199,216,0.3);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          white-space: nowrap;
        }
        .navbar-cta:hover {
          transform: translateY(-1px); box-shadow: 0 10px 28px rgba(40,199,216,0.42);
        }
        .navbar-menu-button {
          display: none; width: 42px; height: 42px; border-radius: 12px;
          border: 1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(78,52,46,0.15)'};
          background: transparent; cursor: pointer;
          align-items: center; justify-content: center; flex-direction: column; gap: 5px;
          padding: 0;
        }
        .navbar-hamburger-bar {
          width: 20px; height: 2px; border-radius: 1px;
          background: ${isDark ? 'rgba(245,237,216,0.88)' : B.brown};
          transition: all 0.25s ease;
        }
        .navbar-menu-button.open .navbar-hamburger-bar:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .navbar-menu-button.open .navbar-hamburger-bar:nth-child(2) {
          opacity: 0;
        }
        .navbar-menu-button.open .navbar-hamburger-bar:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
        .navbar-mobile-menu {
          display: none; position: absolute; top: 76px; left: 0; right: 0;
          background: ${isDark ? 'rgba(20,17,14,0.98)' : 'rgba(255,249,242,0.98)'};
          backdropFilter: blur(16px);
          border-bottom: 1px solid ${borderColor};
          padding: 20px 24px 28px; flex-direction: column; gap: 6px;
        }
        .navbar-mobile-menu.open { display: flex; }
        .navbar-mobile-link {
          font-family: ${display}; font-weight: 700; font-size: 15px;
          text-decoration: none; padding: 10px 14px; border-radius: 10px;
          color: ${isDark ? 'rgba(245,237,216,0.88)' : B.brownLight};
          transition: color 0.2s, background 0.2s;
        }
        .navbar-mobile-link:hover {
          color: ${isDark ? '#F5EDD8' : B.brown};
          background: ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(78,52,46,0.06)'};
        }
        .navbar-mobile-cta {
          margin-top: 8px; display: inline-flex; align-items: center; justify-content: center;
          padding: 12px 24px; border-radius: 999px;
          background: ${B.teal}; color: #FFFFFF; text-decoration: none;
          font-family: ${display}; font-weight: 800; font-size: 14px;
          box-shadow: 0 6px 20px rgba(40,199,216,0.3);
        }
        @media (max-width: 960px) {
          .navbar-inner { padding: 0 24px; gap: 12px; }
        }
        @media (max-width: 760px) {
          .navbar-links, .navbar-cta { display: none !important; }
          .navbar-menu-button { display: inline-flex !important; }
        }
        @media (max-width: 520px) {
          .navbar-inner { padding: 0 16px; height: 66px; }
        }
      `}</style>

      <div className="navbar-inner">
        {/* Logo */}
        <a href="#home" aria-label="Pankhii home" style={{ height: '48px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img
            src={logoImg}
            alt="Pankhii restaurant logo"
            style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block', filter: logoFilter }}
          />
        </a>

        {/* Desktop nav links */}
        <ul className="navbar-links" role="list">
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`navbar-link${hovLink === link.label ? ' hover' : ''}`}
                onMouseEnter={() => setHovLink(link.label)}
                onMouseLeave={() => setHovLink(null)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {/* Dark mode toggle — desktop */}
          <ThemeToggle isDark={isDark} onToggle={onToggle} />

          {/* Reserve CTA */}
          <a href="tel:+918095809571" className="navbar-cta" aria-label="Call to reserve a table">
            📞 Reserve
          </a>

          {/* Hamburger — mobile */}
          <button
            className={`navbar-menu-button${menuOpen ? ' open' : ''}`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className="navbar-hamburger-bar" />
            <span className="navbar-hamburger-bar" />
            <span className="navbar-hamburger-bar" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar-mobile-menu${menuOpen ? ' open' : ''}`} role="menu">
        {NAV_LINKS.map(link => (
          <a
            key={link.label}
            href={link.href}
            className="navbar-mobile-link"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}

        {/* Dark mode toggle — mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 14px' }}>
          <ThemeToggle isDark={isDark} onToggle={onToggle} />
          <span style={{ fontFamily: sans, fontSize: '14px', color: isDark ? 'rgba(245,237,216,0.7)' : B.brownLight }}>
            {isDark ? 'Light mode' : 'Dark mode'}
          </span>
        </div>

        <a href="tel:+918095809571" className="navbar-mobile-cta" onClick={() => setMenuOpen(false)}>
          📞 Call to Reserve
        </a>
      </div>
    </nav>
  )
}