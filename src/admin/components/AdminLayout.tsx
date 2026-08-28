import { useState, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// ── Admin palette — deliberately different from public site ───
const A = {
    bg: '#0f1f17',           // near-black forest green
    sidebar: '#0a1910',      // deeper sidebar
    sidebarBorder: 'rgba(212,175,55,0.14)',
    card: '#162a1e',         // card background
    cardBorder: 'rgba(255,255,255,0.06)',
    gold: '#D4AF37',
    goldSoft: 'rgba(212,175,55,0.15)',
    green: '#28C7D8',        // teal accent matches brand subtly
    text: '#f0ede6',
    textMuted: 'rgba(240,237,230,0.55)',
    red: '#e05252',
    surface: '#1a3326',
}
const display = "'Nunito', system-ui, sans-serif"
const sans = "'Inter', system-ui, sans-serif"

interface NavItem { label: string; icon: string; path: string }
const NAV: NavItem[] = [
    { label: 'Dashboard', icon: '▦', path: '/admin/dashboard' },
    { label: 'Reservations', icon: '📋', path: '/admin/reservations' },
]

export default function AdminLayout({ children, pageTitle }: { children: ReactNode; pageTitle: string }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileNavOpen, setMobileNavOpen] = useState(false)

    function logout() {
        sessionStorage.removeItem('admin_auth')
        navigate('/admin/login')
    }

    const sidebarContent = (
        <>
            {/* Logo */}
            <div style={{ padding: '28px 24px 20px', borderBottom: `1px solid ${A.sidebarBorder}` }}>
                <p style={{ fontFamily: display, fontWeight: 900, fontSize: '20px', color: A.gold, margin: 0, letterSpacing: '0.04em' }}>
                    🐦 Pankhii
                </p>
                <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '11px', color: A.textMuted, margin: '4px 0 0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Admin Portal
                </p>
            </div>

            {/* Nav */}
            <nav style={{ padding: '20px 12px', flex: 1 }}>
                {NAV.map(item => {
                    const active = location.pathname === item.path
                    return (
                        <button
                            key={item.path}
                            onClick={() => { navigate(item.path); setMobileNavOpen(false) }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                width: '100%', padding: '12px 16px', borderRadius: '12px',
                                border: 'none', cursor: 'pointer', marginBottom: '4px',
                                background: active ? A.goldSoft : 'transparent',
                                color: active ? A.gold : A.textMuted,
                                fontFamily: display, fontWeight: active ? 700 : 500,
                                fontSize: '14px', textAlign: 'left',
                                borderLeft: active ? `3px solid ${A.gold}` : '3px solid transparent',
                                transition: 'all 0.2s',
                            }}
                        >
                            <span style={{ fontSize: '16px' }}>{item.icon}</span>
                            {item.label}
                        </button>
                    )
                })}
            </nav>

            {/* Logout */}
            <div style={{ padding: '16px 12px', borderTop: `1px solid ${A.sidebarBorder}` }}>
                <button
                    onClick={logout}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        width: '100%', padding: '10px 16px', borderRadius: '10px',
                        border: 'none', cursor: 'pointer',
                        background: 'transparent', color: A.textMuted,
                        fontFamily: sans, fontWeight: 500, fontSize: '13px',
                        transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = A.red }}
                    onMouseLeave={e => { e.currentTarget.style.color = A.textMuted }}
                >
                    ⎋ Logout
                </button>
            </div>
        </>
    )

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: A.bg, fontFamily: sans }}>
            <style>{`
        .admin-sidebar { width: 220px; background: ${A.sidebar}; border-right: 1px solid ${A.sidebarBorder}; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; }
        .admin-main { margin-left: 220px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }
        .admin-topbar { padding: 18px 32px; background: ${A.sidebar}; border-bottom: 1px solid ${A.sidebarBorder}; display: flex; align-items: center; justify-content: space-between; }
        .admin-content { padding: 32px; flex: 1; }
        .mobile-nav-toggle { display: none; }
        .admin-mobile-nav { display: none; }
        @media (max-width: 768px) {
          .admin-sidebar { display: none; }
          .admin-main { margin-left: 0; }
          .admin-topbar { padding: 14px 16px; }
          .admin-content { padding: 16px; }
          .mobile-nav-toggle { display: flex; align-items:center; justify-content:center; width: 40px; height: 40px; border-radius: 10px; border: 1px solid ${A.sidebarBorder}; background: ${A.surface}; color: ${A.text}; cursor: pointer; font-size: 18px; }
          .admin-mobile-nav { display: block; position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.6); }
          .admin-mobile-nav-panel { position: absolute; top: 0; left: 0; width: 260px; height: 100vh; background: ${A.sidebar}; border-right: 1px solid ${A.sidebarBorder}; display: flex; flex-direction: column; }
        }
      `}</style>

            {/* Desktop sidebar */}
            <aside className="admin-sidebar">
                {sidebarContent}
            </aside>

            {/* Mobile overlay nav */}
            {mobileNavOpen && (
                <div className="admin-mobile-nav" onClick={() => setMobileNavOpen(false)}>
                    <div className="admin-mobile-nav-panel" onClick={e => e.stopPropagation()}>
                        {sidebarContent}
                    </div>
                </div>
            )}

            {/* Main area */}
            <div className="admin-main">
                {/* Topbar */}
                <div className="admin-topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <button className="mobile-nav-toggle" onClick={() => setMobileNavOpen(true)}>☰</button>
                        <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: '18px', color: A.text, margin: 0 }}>
                            {pageTitle}
                        </h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '12px', color: A.textMuted, fontFamily: sans }}>Admin</span>
                        <div style={{
                            width: '34px', height: '34px', borderRadius: '50%',
                            background: A.goldSoft, border: `1px solid ${A.gold}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: display, fontWeight: 700, fontSize: '14px', color: A.gold,
                        }}>A</div>
                    </div>
                </div>

                {/* Page content */}
                <div className="admin-content">
                    {children}
                </div>
            </div>
        </div>
    )
}
