import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const A = {
    bg: '#0f1f17',
    card: '#162a1e',
    cardBorder: 'rgba(255,255,255,0.07)',
    gold: '#D4AF37',
    goldSoft: 'rgba(212,175,55,0.12)',
    teal: '#28C7D8',
    text: '#f0ede6',
    textMuted: 'rgba(240,237,230,0.55)',
    inputBg: '#0f1f17',
    inputBorder: 'rgba(255,255,255,0.12)',
}
const display = "'Nunito', system-ui, sans-serif"
const sans = "'Inter', system-ui, sans-serif"

export default function AdminLogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError('')
        if (!email.includes('@') || password.length < 1) {
            setError('Please enter a valid email and password.')
            return
        }
        setLoading(true)
        // ── TODO: Replace with Firebase Auth ──────────────────────
        // import { signInWithEmailAndPassword } from 'firebase/auth'
        // signInWithEmailAndPassword(auth, email, password)
        //   .then(() => { sessionStorage.setItem('admin_auth','true'); navigate('/admin/dashboard') })
        //   .catch(err => setError(err.message))
        setTimeout(() => {
            sessionStorage.setItem('admin_auth', 'true')
            navigate('/admin/dashboard')
            setLoading(false)
        }, 600)
    }

    const inputSt: React.CSSProperties = {
        width: '100%', padding: '13px 16px', borderRadius: '12px',
        border: `1.5px solid ${A.inputBorder}`,
        background: A.inputBg, color: A.text,
        fontFamily: sans, fontSize: '15px',
        outline: 'none', boxSizing: 'border-box',
        transition: 'border-color 0.2s',
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: A.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
            fontFamily: sans,
        }}>
            <div style={{ width: '100%', maxWidth: '420px' }}>
                {/* Brand */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <p style={{ fontFamily: display, fontWeight: 900, fontSize: '32px', color: A.gold, margin: '0 0 4px' }}>
                        🐦 Pankhii
                    </p>
                    <p style={{ fontSize: '13px', color: A.textMuted, margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Admin Portal
                    </p>
                </div>

                {/* Card */}
                <div style={{
                    background: A.card, border: `1px solid ${A.cardBorder}`,
                    borderRadius: '20px', padding: '36px 32px',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
                }}>
                    <h1 style={{ fontFamily: display, fontWeight: 900, fontSize: '22px', color: A.text, margin: '0 0 6px' }}>
                        Sign In
                    </h1>
                    <p style={{ fontSize: '13px', color: A.textMuted, margin: '0 0 28px' }}>
                        Manage reservations and restaurant operations.
                    </p>

                    <form onSubmit={handleSubmit} noValidate>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '11px', color: A.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                                Email
                            </label>
                            <input
                                type="email" required placeholder="admin@pankhii.in"
                                value={email} onChange={e => setEmail(e.target.value)}
                                style={inputSt}
                                onFocus={e => { e.currentTarget.style.borderColor = A.gold }}
                                onBlur={e => { e.currentTarget.style.borderColor = A.inputBorder }}
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontFamily: display, fontWeight: 700, fontSize: '11px', color: A.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                                Password
                            </label>
                            <input
                                type="password" required placeholder="••••••••"
                                value={password} onChange={e => setPassword(e.target.value)}
                                style={inputSt}
                                onFocus={e => { e.currentTarget.style.borderColor = A.gold }}
                                onBlur={e => { e.currentTarget.style.borderColor = A.inputBorder }}
                            />
                        </div>

                        {error && (
                            <p style={{ fontSize: '13px', color: '#e05252', margin: '-12px 0 16px', fontFamily: sans }}>
                                {error}
                            </p>
                        )}

                        <button
                            type="submit" disabled={loading}
                            style={{
                                width: '100%', padding: '14px',
                                borderRadius: '12px', border: 'none', cursor: loading ? 'wait' : 'pointer',
                                background: A.gold, color: '#0f1f17',
                                fontFamily: display, fontWeight: 800, fontSize: '15px',
                                letterSpacing: '0.04em',
                                opacity: loading ? 0.8 : 1,
                                transition: 'opacity 0.2s',
                            }}
                        >
                            {loading ? 'Signing in…' : 'Sign In →'}
                        </button>
                    </form>
                </div>

                {/* Demo notice */}
                <div style={{
                    marginTop: '20px', padding: '14px 18px',
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '12px',
                }}>
                    <p style={{ fontFamily: sans, fontSize: '12px', color: A.textMuted, margin: 0, lineHeight: 1.6 }}>
                        🔒 <strong style={{ color: A.gold }}>Demo mode</strong> — any valid email and non-empty password will work.
                        Real authentication can be connected via Firebase Auth without changing the portal structure.
                    </p>
                </div>
            </div>
        </div>
    )
}
