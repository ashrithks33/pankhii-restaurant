import Navbar from "./components/Navbar";
import { useState, useEffect, type ReactNode } from 'react'
import logoImg from '@/imports/Screenshot_2026-08-05_092225.png'

// ── Brand tokens ──────────────────────────────────────────────
const B = {
  cream:       '#FDF6E3',
  creamWarm:   '#F7E0A3',
  creamDeep:   '#F0D080',
  yellow:      '#F5C842',
  brown:       '#5A3324',
  brownLight:  '#7A4A34',
  brownMuted:  'rgba(90,51,36,0.5)',
  teal:        '#28C7D8',
  tealPale:    'rgba(40,199,216,0.14)',
  green:       '#8BC34A',
  greenDark:   '#6A9E32',
  orange:      '#E8834A',
  white:       '#ffffff',
}

const display = "'Nunito', system-ui, sans-serif"
const sans    = "'Inter', system-ui, sans-serif"

// ── Nav links ─────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home',        href: '#home'         },
  { label: 'About',       href: '#about'        },
  { label: 'Menu',        href: '#menu'         },
  { label: 'Gallery',     href: '#gallery'      },
  { label: 'Reservation', href: '#reservations' },
  { label: 'Contact',     href: '#contact'      },
]

// ── Menu data ─────────────────────────────────────────────────
const MENU_ITEMS = [
  {
    category: 'Starters',
    emoji: '🥗',
    items: [
      { name: 'Paneer Tikka Bites',    desc: 'Marinated cottage cheese, mint chutney, pomegranate', price: '₹380' },
      { name: 'Hara Bhara Kebab',      desc: 'Spinach, peas, potato, cashew cream dip',              price: '₹320' },
      { name: 'Masala Bruschetta',     desc: 'Sourdough, spiced tomato, fresh coriander, cheese',    price: '₹290' },
    ],
  },
  {
    category: 'Mains',
    emoji: '🍛',
    items: [
      { name: 'Dal Makhani Royal',     desc: 'Slow-cooked black lentils, butter, cream, tandoor naan', price: '₹520' },
      { name: 'Paneer Shahi Korma',    desc: 'Cottage cheese in rich almond gravy, saffron rice',      price: '₹580' },
      { name: 'Vegetable Biryani',     desc: 'Dum-cooked basmati, seasonal vegetables, raita',         price: '₹480' },
    ],
  },
  {
    category: 'Desserts',
    emoji: '🍮',
    items: [
      { name: 'Gulab Jamun Soufflé',  desc: 'Rose syrup, pistachio, saffron cream',                   price: '₹280' },
      { name: 'Mango Phirni',         desc: 'Alphonso mango, rice pudding, cardamom, silver leaf',     price: '₹260' },
      { name: 'Chocolate Barfi',      desc: 'Valrhona chocolate, khoya, almond crumble',               price: '₹300' },
    ],
  },
]

const STATS = [
  { icon: '🕐', value: '15+',    label: 'Years of Excellence',  sub: 'Serving joy since 2009'             },
  { icon: '🍽️', value: '100+',   label: 'Signature Dishes',      sub: 'Crafted with love & tradition'     },
  { icon: '😊', value: '10,000+',label: 'Happy Guests',          sub: 'Smiles served every day'           },
  { icon: '⭐', value: '★★★★★',  label: 'Customer Rating',       sub: 'Rated 5 stars across platforms'   },
]

const EXPERIENCES = [
  {
    title: "The Family Table",
    desc:  "Our warmest corner — a round table for six, designed for families who love to share. Every visit feels like a celebration.",
    seats: "Up to 8 guests", duration: "Open seating",
    img:   "https://images.unsplash.com/photo-1606788075819-9574a6edfab3?w=800&h=600&fit=crop&auto=format",
    color: B.tealPale, accent: B.teal,
  },
  {
    title: "Garden Terrace",
    desc:  "Dine under a canopy of fairy lights with potted herbs and birdsong. Our outdoor pavilion brings the outdoors to your plate.",
    seats: "Up to 24 guests", duration: "By arrangement",
    img:   "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?w=800&h=600&fit=crop&auto=format",
    color: 'rgba(139,195,74,0.12)', accent: B.green,
  },
  {
    title: "Chef's Celebration Table",
    desc:  "A special-occasion counter where Chef Meena curates a personalised six-course journey inspired by your favourite flavours.",
    seats: "4–6 guests", duration: "3 hours",
    img:   "https://images.unsplash.com/photo-1728910156510-77488f19b152?w=800&h=600&fit=crop&auto=format",
    color: 'rgba(232,131,74,0.12)', accent: B.orange,
  },
]

const TESTIMONIALS = [
  { quote: "The Dal Makhani is the best I've had outside my grandmother's kitchen. Pankhii feels like home.", author: "Priya Sharma",    role: "Food Blogger, Mumbai"         },
  { quote: "Perfect spot for our anniversary. The family atmosphere, vibrant food, and warm service made it unforgettable.", author: "Rahul & Nisha Gupta", role: "Regular Guests since 2018" },
  { quote: "My kids devoured everything on the table. A rare restaurant that's premium AND child-friendly.", author: "Anita Verma",     role: "Parent & Food Enthusiast"     },
]

// ── Reusable tiny components ──────────────────────────────────
function SectionTag({ children, color = B.teal }: { children: ReactNode; color?: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
      <span style={{ fontFamily: display, fontWeight: 700, fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color }}>{children}</span>
    </div>
  )
}

function Pill({ children, bg = B.creamWarm, color = B.brown }: { children: ReactNode; bg?: string; color?: string }) {
  return (
    <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '999px', background: bg, color, fontFamily: display, fontWeight: 700, fontSize: '12px', letterSpacing: '0.05em' }}>
      {children}
    </span>
  )
}

// Subtle bird silhouette SVG for decorative use
function BirdDeco({ size = 40, opacity = 0.08, color = B.brown }: { size?: number; opacity?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true" style={{ opacity }}>
      <ellipse cx="40" cy="48" rx="22" ry="18" fill={color} />
      <circle cx="56" cy="34" r="10" fill={color} />
      <ellipse cx="26" cy="44" rx="14" ry="8" fill={color} transform="rotate(-20 26 44)" />
      <circle cx="60" cy="31" r="2.5" fill={B.white} />
      <circle cx="61" cy="30.5" r="1" fill={color} />
      <path d="M62 35 L67 33 L65 37 Z" fill={color} />
    </svg>
  )
}

// ── Nav ───────────────────────────────────────────────────────


// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  const [menuHov, setMenuHov]     = useState(false)
  const [reserveHov, setReserveHov] = useState(false)

  return (
    <section id="home" style={{
      minHeight: '100vh',
      background: `linear-gradient(145deg, ${B.creamWarm} 0%, ${B.cream} 55%, rgba(40,199,216,0.07) 100%)`,
      position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: `radial-gradient(circle, ${B.yellow}55 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '80px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: `radial-gradient(circle, ${B.tealPale} 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '55%', left: '42%', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, rgba(139,195,74,0.1) 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Bird decos */}
      <div style={{ position: 'absolute', top: '18%', left: '5%', transform: 'rotate(-15deg)', pointerEvents: 'none' }}><BirdDeco size={60} opacity={0.06} color={B.brown} /></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '4%', transform: 'rotate(10deg)', pointerEvents: 'none' }}><BirdDeco size={48} opacity={0.07} color={B.teal} /></div>

      <div style={{
        flex: 1, maxWidth: '1440px', margin: '0 auto', width: '100%', padding: '0 64px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center', minHeight: '100vh',
      }}>
        {/* Left */}
        <div style={{ paddingTop: '76px' }}>
          <div style={{ marginBottom: '20px' }}>
            <Pill bg={B.tealPale} color={B.teal}>🐦 Pure Vegetarian · Est. 2009</Pill>
          </div>

          <h1 style={{
            fontFamily: display, fontWeight: 900, fontSize: '68px', lineHeight: 1.08,
            color: B.brown, marginBottom: '24px', letterSpacing: '-0.01em',
          }}>
            Where<br />
            Flavours<br />
            <span style={{ color: B.teal }}>Take Flight.</span>
          </h1>

          {/* Wavy divider */}
          <svg width="120" height="12" viewBox="0 0 120 12" fill="none" style={{ marginBottom: '24px' }} aria-hidden="true">
            <path d="M0 6 Q15 0 30 6 Q45 12 60 6 Q75 0 90 6 Q105 12 120 6" stroke={B.teal} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>

          <p style={{
            fontFamily: sans, fontWeight: 400, fontSize: '18px', lineHeight: 1.75,
            color: B.brownLight, maxWidth: '420px', marginBottom: '44px',
          }}>
            Experience authentic vegetarian cuisine crafted with passion, elegance, and unforgettable flavours. Every dish tells a story of the seasons.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#menu"
              onMouseEnter={() => setMenuHov(true)}
              onMouseLeave={() => setMenuHov(false)}
              style={{
                fontFamily: display, fontWeight: 800, fontSize: '14px', letterSpacing: '0.04em',
                textDecoration: 'none', padding: '14px 32px', borderRadius: '999px',
                background: menuHov ? B.brown : B.white,
                color: menuHov ? B.white : B.brown,
                border: `2px solid ${B.brown}`,
                boxShadow: menuHov ? '0 8px 24px rgba(90,51,36,0.25)' : '0 4px 12px rgba(90,51,36,0.1)',
                transition: 'all 0.25s ease',
              }}
            >
              🍽️ Explore Menu
            </a>
            <a
              href="#reservations"
              onMouseEnter={() => setReserveHov(true)}
              onMouseLeave={() => setReserveHov(false)}
              style={{
                fontFamily: display, fontWeight: 800, fontSize: '14px', letterSpacing: '0.04em',
                textDecoration: 'none', padding: '14px 32px', borderRadius: '999px',
                background: reserveHov ? B.teal : B.teal,
                color: B.white,
                boxShadow: reserveHov ? '0 8px 24px rgba(40,199,216,0.45)' : '0 4px 16px rgba(40,199,216,0.3)',
                transform: reserveHov ? 'translateY(-2px)' : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              📅 Reserve Table
            </a>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: '28px', marginTop: '52px', paddingTop: '28px', borderTop: `1px solid rgba(90,51,36,0.1)` }}>
            {[
              { v: '15+', l: 'Years' }, { v: '100+', l: 'Dishes' }, { v: '10K+', l: 'Guests' },
            ].map(({ v, l }) => (
              <div key={l}>
                <p style={{ fontFamily: display, fontWeight: 900, fontSize: '28px', color: B.teal, lineHeight: 1, marginBottom: '4px' }}>{v}</p>
                <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '12px', color: B.brownMuted, textTransform: 'uppercase', letterSpacing: '0.15em' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — food image */}
        <div style={{ position: 'relative', paddingTop: '76px', paddingBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Decorative ring */}
          <div style={{
            position: 'absolute', inset: '20px',
            borderRadius: '32px',
            border: `2px dashed rgba(40,199,216,0.25)`,
            pointerEvents: 'none',
          }} />

          {/* Main image */}
          <div style={{
            width: '100%', aspectRatio: '4/5', borderRadius: '28px', overflow: 'hidden',
            background: B.creamWarm,
            boxShadow: '0 32px 80px rgba(90,51,36,0.18), 0 8px 24px rgba(90,51,36,0.1)',
            position: 'relative',
          }}>
            <img
              src="https://images.unsplash.com/photo-1728910156510-77488f19b152?w=900&h=1125&fit=crop&auto=format"
              alt="Colourful vegetarian spread at Pankhii"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Warm overlay at bottom */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
              background: `linear-gradient(to top, rgba(90,51,36,0.65) 0%, transparent 100%)`,
            }} />
            {/* Image caption */}
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
              <p style={{ fontFamily: display, fontWeight: 800, fontSize: '18px', color: B.white, marginBottom: '4px' }}>Today's Chef's Special</p>
              <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '12px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Seasonal · Plant-Forward · Joyful</p>
            </div>
          </div>

{/* Floating tag — bottom left */}
          <div style={{
            position: 'absolute', bottom: '60px', left: '-16px',
            background: B.yellow, borderRadius: '20px', padding: '12px 18px',
            boxShadow: '0 8px 28px rgba(245,200,66,0.4)',
            zIndex: 2,
          }}>
            <p style={{ fontFamily: display, fontWeight: 900, fontSize: '13px', color: B.brown }}>⭐ 5-Star Rated</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Stats ─────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section style={{
      background: B.brown,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle dot pattern */}
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.06 }} preserveAspectRatio="none">
        <defs>
          <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="2" fill={B.creamWarm} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '72px 64px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2px', position: 'relative' }}>
        {STATS.map(({ icon, value, label, sub }, i) => (
          <StatCard key={label} icon={icon} value={value} label={label} sub={sub} isLast={i === 3} />
        ))}
      </div>
    </section>
  )
}

function StatCard({ icon, value, label, sub, isLast }: { icon: string; value: string; label: string; sub: string; isLast: boolean }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '48px 36px',
        background: hov ? 'rgba(255,255,255,0.06)' : 'transparent',
        borderRight: isLast ? 'none' : '1px solid rgba(253,246,227,0.12)',
        transition: 'background 0.3s',
        cursor: 'default',
        position: 'relative',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: '36px',
        height: '3px', borderRadius: '2px',
        width: hov ? 'calc(100% - 72px)' : '28px',
        background: B.teal,
        transition: 'width 0.4s ease',
      }} />

      {/* Icon bubble */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '16px',
        background: hov ? 'rgba(40,199,216,0.18)' : 'rgba(253,246,227,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '24px', marginBottom: '20px',
        transition: 'background 0.3s',
        border: `1px solid rgba(253,246,227,0.15)`,
      }}>
        {icon}
      </div>

      <p style={{
        fontFamily: display, fontWeight: 900,
        fontSize: value.startsWith('★') ? '20px' : '44px',
        lineHeight: 1, color: B.creamWarm,
        marginBottom: '8px',
        letterSpacing: value.startsWith('★') ? '0.1em' : '-0.01em',
      }}>{value}</p>

      <p style={{ fontFamily: display, fontWeight: 700, fontSize: '14px', color: B.white, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
      <p style={{ fontFamily: sans, fontWeight: 300, fontSize: '13px', color: 'rgba(253,246,227,0.6)', lineHeight: 1.5 }}>{sub}</p>
    </div>
  )
}

// ── About ─────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" style={{ background: B.cream, padding: '120px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

        {/* Left image mosaic */}
        <div style={{ position: 'relative' }}>
          <div style={{ borderRadius: '28px', overflow: 'hidden', aspectRatio: '3/4', background: B.creamWarm, boxShadow: '0 24px 64px rgba(90,51,36,0.14)' }}>
            <img
              src="https://images.unsplash.com/photo-1682862279256-b2a9e4f3d22c?w=700&h=933&fit=crop&auto=format"
              alt="Pankhii kitchen preparation"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', display: 'block' }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
            />
          </div>

          {/* Floating card */}
          <div style={{
            position: 'absolute', bottom: '32px', right: '-28px',
            background: B.white, borderRadius: '20px', padding: '20px 24px',
            boxShadow: '0 16px 48px rgba(90,51,36,0.14)',
            border: `1px solid rgba(40,199,216,0.15)`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '24px' }}>👩‍🍳</span>
              <p style={{ fontFamily: display, fontWeight: 800, fontSize: '16px', color: B.brown }}>Chef Meena Iyer</p>
            </div>
            <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '12px', color: B.brownMuted }}>Executive Chef · 18 yrs experience</p>
          </div>

          {/* Deco bird */}
          <div style={{ position: 'absolute', top: '20px', left: '-20px', pointerEvents: 'none' }}>
            <BirdDeco size={72} opacity={0.09} color={B.teal} />
          </div>
        </div>

        {/* Right copy */}
        <div>
          <SectionTag color={B.teal}>Our Story</SectionTag>
          <h2 style={{ fontFamily: display, fontWeight: 900, fontSize: '52px', lineHeight: 1.1, color: B.brown, marginBottom: '20px' }}>
            Born from a<br />love of <span style={{ color: B.teal }}>good food</span><br />& family.
          </h2>

          <svg width="100" height="10" viewBox="0 0 100 10" fill="none" style={{ marginBottom: '24px' }} aria-hidden="true">
            <path d="M0 5 Q12.5 0 25 5 Q37.5 10 50 5 Q62.5 0 75 5 Q87.5 10 100 5" stroke={B.green} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>

          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '16px', lineHeight: 1.85, color: B.brownLight, marginBottom: '20px' }}>
            Pankhii — named after the Sanskrit word for "bird" — was founded by the Iyer family in 2009 with a simple belief: vegetarian food can be as joyful, colourful, and soulful as any meal on earth.
          </p>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '16px', lineHeight: 1.85, color: B.brownLight, marginBottom: '40px' }}>
            We source from 28 family farms across Maharashtra, cook with time-honoured spice traditions, and plate with the care of a gift. Every table is treated like family.
          </p>

          <div style={{ display: 'flex', gap: '32px' }}>
            {[{ v: '28', l: 'Farm Partners' }, { v: '120+', l: 'Seasonal Ingredients' }].map(({ v, l }) => (
              <div key={l} style={{ padding: '20px 24px', background: B.tealPale, borderRadius: '16px', border: `1px solid rgba(40,199,216,0.2)` }}>
                <p style={{ fontFamily: display, fontWeight: 900, fontSize: '32px', color: B.teal, lineHeight: 1 }}>{v}</p>
                <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '12px', color: B.brownMuted, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Menu ──────────────────────────────────────────────────────
function MenuSection() {
  const [active, setActive] = useState('Starters')
  const current = MENU_ITEMS.find(m => m.category === active)!

  return (
    <section id="menu" style={{ background: `linear-gradient(180deg, ${B.creamWarm} 0%, ${B.cream} 100%)`, padding: '120px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionTag color={B.green}>Seasonal Menu</SectionTag>
          <h2 style={{ fontFamily: display, fontWeight: 900, fontSize: '52px', color: B.brown, marginBottom: '12px' }}>
            Curated with the <span style={{ color: B.green }}>season</span>.
          </h2>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '16px', color: B.brownLight, maxWidth: '480px', margin: '0 auto' }}>
            Our menu honours what the earth offers each week. Fresh, vibrant, and full of flavour.
          </p>
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '48px' }}>
          {MENU_ITEMS.map(m => (
            <button
              key={m.category}
              onClick={() => setActive(m.category)}
              style={{
                fontFamily: display, fontWeight: 800, fontSize: '14px',
                padding: '10px 28px', borderRadius: '999px', border: 'none', cursor: 'pointer',
                background: active === m.category ? B.teal : B.white,
                color: active === m.category ? B.white : B.brownLight,
                boxShadow: active === m.category ? '0 6px 20px rgba(40,199,216,0.35)' : '0 2px 8px rgba(90,51,36,0.08)',
                transition: 'all 0.25s ease',
              }}
            >
              {m.emoji} {m.category}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
          {current.items.map(item => (
            <MenuCard key={item.name} {...item} />
          ))}
        </div>

        {/* Tasting note */}
        <div style={{
          marginTop: '40px', padding: '20px 32px', borderRadius: '16px',
          background: 'rgba(139,195,74,0.1)', border: `1px solid rgba(139,195,74,0.25)`,
          display: 'flex', alignItems: 'center', gap: '16px',
        }}>
          <span style={{ fontSize: '24px' }}>🌿</span>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', color: B.brownLight }}>
            <strong style={{ fontFamily: display, fontWeight: 800, color: B.green }}>Chef's Tasting Menu</strong> — a curated 6-course journey through the season, available for the whole table · <strong>₹1,200 per person</strong>
          </p>
        </div>
      </div>
    </section>
  )
}

function MenuCard({ name, desc, price }: { name: string; desc: string; price: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: B.white, borderRadius: '20px', padding: '28px',
        boxShadow: hov ? '0 16px 48px rgba(90,51,36,0.14)' : '0 4px 16px rgba(90,51,36,0.07)',
        border: hov ? `1px solid rgba(40,199,216,0.3)` : '1px solid rgba(90,51,36,0.06)',
        transform: hov ? 'translateY(-4px)' : 'none',
        transition: 'all 0.3s ease', cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
        <h3 style={{ fontFamily: display, fontWeight: 800, fontSize: '18px', color: B.brown, lineHeight: 1.25 }}>{name}</h3>
        <span style={{ fontFamily: display, fontWeight: 900, fontSize: '18px', color: B.teal, whiteSpace: 'nowrap' }}>{price}</span>
      </div>
      <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', color: B.brownMuted, lineHeight: 1.65 }}>{desc}</p>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <Pill bg={`rgba(139,195,74,0.15)`} color={B.greenDark}>🌿 Pure Veg</Pill>
      </div>
    </div>
  )
}

// ── Gallery strip ─────────────────────────────────────────────
function GallerySection() {
  const images = [
    { src: 'https://images.unsplash.com/photo-1616671285410-2a676a9a433d?w=500&h=650&fit=crop&auto=format', alt: 'Plated starter' },
    { src: 'https://images.unsplash.com/photo-1539735776517-befcae86494d?w=500&h=500&fit=crop&auto=format', alt: 'Colourful dish' },
    { src: 'https://images.unsplash.com/photo-1613274554329-70f997f5789f?w=500&h=650&fit=crop&auto=format', alt: 'Dining room' },
    { src: 'https://images.unsplash.com/photo-1548940740-204726a19be3?w=500&h=500&fit=crop&auto=format', alt: 'Dessert spread' },
    { src: 'https://images.unsplash.com/photo-1682862279256-b2a9e4f3d22c?w=500&h=650&fit=crop&auto=format', alt: 'Chef preparation' },
  ]

  return (
    <section id="gallery" style={{ background: B.cream, padding: '120px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <SectionTag color={B.orange}>From the Kitchen</SectionTag>
            <h2 style={{ fontFamily: display, fontWeight: 900, fontSize: '48px', color: B.brown }}>Art on the <span style={{ color: B.orange }}>plate</span>.</h2>
          </div>
          <BirdDeco size={64} opacity={0.1} color={B.orange} />
        </div>

        {/* Mosaic */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.4fr 2fr', gridTemplateRows: 'auto auto', gap: '16px' }}>
          <div style={{ gridRow: 'span 2', borderRadius: '24px', overflow: 'hidden', background: B.creamWarm }}>
            <img src={images[0].src} alt={images[0].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }} onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }} onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }} />
          </div>
          <div style={{ borderRadius: '24px', overflow: 'hidden', background: B.creamWarm, aspectRatio: '1' }}>
            <img src={images[1].src} alt={images[1].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }} onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }} onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }} />
          </div>
          <div style={{ gridRow: 'span 2', borderRadius: '24px', overflow: 'hidden', background: B.creamWarm }}>
            <img src={images[2].src} alt={images[2].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }} onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }} onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }} />
          </div>
          <div style={{ borderRadius: '24px', overflow: 'hidden', background: B.creamWarm, aspectRatio: '1' }}>
            <img src={images[3].src} alt={images[3].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }} onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }} onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Experience ────────────────────────────────────────────────
function ExperienceSection() {
  const [active, setActive] = useState(0)

  return (
    <section style={{ background: B.creamWarm, padding: '120px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionTag color={B.teal}>Private Dining</SectionTag>
          <h2 style={{ fontFamily: display, fontWeight: 900, fontSize: '48px', color: B.brown }}>
            Extraordinary <span style={{ color: B.teal }}>spaces</span>.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {EXPERIENCES.map((exp, i) => (
              <button
                key={exp.title}
                onClick={() => setActive(i)}
                style={{
                  textAlign: 'left', padding: '24px 28px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                  background: active === i ? B.white : 'rgba(255,255,255,0.5)',
                  boxShadow: active === i ? '0 12px 36px rgba(90,51,36,0.12)' : 'none',
                  borderLeft: active === i ? `4px solid ${exp.accent}` : '4px solid transparent',
                  transition: 'all 0.3s ease',
                }}
              >
                <h3 style={{ fontFamily: display, fontWeight: 800, fontSize: '20px', color: active === i ? exp.accent : B.brown, marginBottom: active === i ? '10px' : 0, transition: 'color 0.3s' }}>{exp.title}</h3>
                {active === i && <p style={{ fontFamily: sans, fontSize: '14px', color: B.brownLight, lineHeight: 1.65, marginBottom: '12px' }}>{exp.desc}</p>}
                <div style={{ display: 'flex', gap: '16px' }}>
                  <Pill bg={`${exp.color}`} color={exp.accent}>{exp.seats}</Pill>
                  <Pill bg={`${exp.color}`} color={exp.accent}>{exp.duration}</Pill>
                </div>
              </button>
            ))}
          </div>

          <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3', background: B.creamDeep, boxShadow: '0 24px 64px rgba(90,51,36,0.15)' }}>
            <img src={EXPERIENCES[active].img} alt={EXPERIENCES[active].title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.4s' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────
function TestimonialsSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section style={{ background: B.cream, padding: '120px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionTag color={B.orange}>Guest Stories</SectionTag>
          <h2 style={{ fontFamily: display, fontWeight: 900, fontSize: '48px', color: B.brown }}>
            What our <span style={{ color: B.orange }}>guests</span> say.
          </h2>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: display, fontStyle: 'italic', fontWeight: 700, fontSize: '26px', lineHeight: 1.55, color: B.brown, marginBottom: '32px' }}>
            "{TESTIMONIALS[active].quote}"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '36px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: B.creamWarm, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>😊</div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontFamily: display, fontWeight: 800, fontSize: '15px', color: B.brown }}>{TESTIMONIALS[active].author}</p>
              <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '12px', color: B.brownMuted }}>{TESTIMONIALS[active].role}</p>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: active === i ? '28px' : '10px', height: '10px', borderRadius: '999px',
                  border: 'none', cursor: 'pointer',
                  background: active === i ? B.teal : B.creamWarm,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Reservation ───────────────────────────────────────────────
function ReservationSection() {
  const [form, setForm]       = useState({ name: '', email: '', date: '', guests: '2', occasion: '' })
  const [submitted, setSubmitted] = useState(false)

  const inputSt: React.CSSProperties = {
    fontFamily: sans, fontWeight: 400, fontSize: '15px',
    width: '100%', padding: '14px 18px', borderRadius: '14px',
    border: `1.5px solid rgba(90,51,36,0.18)`, background: B.white,
    color: B.brown, outline: 'none', transition: 'border-color 0.25s',
  }

  return (
    <section id="reservations" style={{ background: `linear-gradient(180deg, ${B.creamWarm} 0%, ${B.cream} 100%)`, padding: '120px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

        {/* Left */}
        <div>
          <SectionTag color={B.teal}>Reservations</SectionTag>
          <h2 style={{ fontFamily: display, fontWeight: 900, fontSize: '52px', lineHeight: 1.1, color: B.brown, marginBottom: '20px' }}>
            Your table<br /><span style={{ color: B.teal }}>awaits</span>.
          </h2>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '16px', lineHeight: 1.8, color: B.brownLight, marginBottom: '40px' }}>
            We seat guests Tuesday through Sunday, from 12 PM to 3 PM and 7 PM to 11 PM. Walk-ins welcome at the bar.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { emoji: '📍', label: 'Address', value: '14 Juhu Beach Road, Juhu, Mumbai 400 049' },
              { emoji: '📞', label: 'Telephone', value: '+91 22 2660 4800' },
              { emoji: '✉️', label: 'Email', value: 'hello@pankhii.in' },
            ].map(({ emoji, label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '16px 20px', background: B.white, borderRadius: '16px', boxShadow: '0 2px 12px rgba(90,51,36,0.07)' }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>{emoji}</span>
                <div>
                  <p style={{ fontFamily: display, fontWeight: 700, fontSize: '11px', color: B.teal, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '3px' }}>{label}</p>
                  <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', color: B.brownLight }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div style={{ background: B.white, borderRadius: '28px', padding: '44px', boxShadow: '0 24px 64px rgba(90,51,36,0.12)', border: `1px solid rgba(40,199,216,0.12)` }}>
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
                  <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: B.brownMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Full Name</label>
                  <input required type="text" placeholder="Your name" style={inputSt} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={e => { e.target.style.borderColor = B.teal }} onBlur={e => { e.target.style.borderColor = 'rgba(90,51,36,0.18)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: B.brownMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Email</label>
                  <input required type="email" placeholder="your@email.com" style={inputSt} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={e => { e.target.style.borderColor = B.teal }} onBlur={e => { e.target.style.borderColor = 'rgba(90,51,36,0.18)' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: B.brownMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Date</label>
                  <input required type="date" style={{ ...inputSt, colorScheme: 'light' }} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} onFocus={e => { e.target.style.borderColor = B.teal }} onBlur={e => { e.target.style.borderColor = 'rgba(90,51,36,0.18)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: B.brownMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Guests</label>
                  <select style={{ ...inputSt, cursor: 'pointer' }} value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} onFocus={e => { e.target.style.borderColor = B.teal }} onBlur={e => { e.target.style.borderColor = 'rgba(90,51,36,0.18)' }}>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '12px', color: B.brownMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Special Occasion (optional)</label>
                <input type="text" placeholder="Birthday, anniversary…" style={inputSt} value={form.occasion} onChange={e => setForm({ ...form, occasion: e.target.value })} onFocus={e => { e.target.style.borderColor = B.teal }} onBlur={e => { e.target.style.borderColor = 'rgba(90,51,36,0.18)' }} />
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
              <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '12px', color: B.brownMuted, textAlign: 'center', marginTop: '12px' }}>No payment required · Confirmed within 2 hours</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact" style={{ background: B.brown, position: 'relative', overflow: 'hidden' }}>
      {/* Deco bird top right */}
      <div style={{ position: 'absolute', top: '32px', right: '48px', pointerEvents: 'none' }}><BirdDeco size={80} opacity={0.08} color={B.creamWarm} /></div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '80px 64px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '60px' }}>

          {/* Brand */}
          <div>
            <img src={logoImg} alt="Pankhii Veg Restaurant" style={{ height: '56px', width: 'auto', objectFit: 'contain', display: 'block', marginBottom: '16px', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
            <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', lineHeight: 1.75, color: 'rgba(253,246,227,0.6)', maxWidth: '260px' }}>
              Pure vegetarian. Pure joy. Serving families across Mumbai since 2009 with love, tradition, and unforgettable flavours.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {['🌿 Pure Veg', '⭐ 5-Star'].map(t => (
                <span key={t} style={{ fontFamily: display, fontWeight: 700, fontSize: '11px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(253,246,227,0.1)', color: B.creamWarm, border: '1px solid rgba(253,246,227,0.15)' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <p style={{ fontFamily: display, fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: B.teal, marginBottom: '20px' }}>Experience</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {["Family Table", "Garden Terrace", "Chef's Table", "Bar & Lounge"].map(i => (
                <li key={i}><a href="#" style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', color: 'rgba(253,246,227,0.6)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = B.creamWarm }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(253,246,227,0.6)' }}>{i}</a></li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <p style={{ fontFamily: display, fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: B.teal, marginBottom: '20px' }}>Visit</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Tue – Sun', 'Lunch: 12–3 PM', 'Dinner: 7–11 PM', 'Closed Mondays'].map(i => (
                <li key={i} style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', color: 'rgba(253,246,227,0.6)' }}>{i}</li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontFamily: display, fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: B.teal, marginBottom: '20px' }}>Connect</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Instagram', 'Facebook', 'Zomato', 'Press & Media'].map(i => (
                <li key={i}><a href="#" style={{ fontFamily: sans, fontWeight: 400, fontSize: '14px', color: 'rgba(253,246,227,0.6)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = B.creamWarm }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(253,246,227,0.6)' }}>{i}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(253,246,227,0.1)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '13px', color: 'rgba(253,246,227,0.4)' }}>© 2026 Pankhii Veg Restaurant Pvt. Ltd. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms', 'Accessibility'].map(i => (
              <a key={i} href="#" style={{ fontFamily: sans, fontWeight: 400, fontSize: '13px', color: 'rgba(253,246,227,0.4)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = B.creamWarm }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(253,246,227,0.4)' }}>{i}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div style={{ fontFamily: sans }}>
      <Navbar scrolled={scrolled} />
      <Hero />
      <StatsSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <ExperienceSection />
      <TestimonialsSection />
      <ReservationSection />
      <Footer />
    </div>
  )
}
