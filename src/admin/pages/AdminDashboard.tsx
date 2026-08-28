import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import {
    getReservationStats,
    getUpcomingReservations,
    type Reservation,
} from '../data/mockReservations'

const A = {
    card: '#162a1e',
    cardBorder: 'rgba(255,255,255,0.06)',
    gold: '#D4AF37',
    goldSoft: 'rgba(212,175,55,0.15)',
    teal: '#28C7D8',
    tealSoft: 'rgba(40,199,216,0.14)',
    text: '#f0ede6',
    textMuted: 'rgba(240,237,230,0.55)',
    red: '#e05252',
    redSoft: 'rgba(224,82,82,0.14)',
    green: '#4caf82',
    greenSoft: 'rgba(76,175,130,0.14)',
    orange: '#e8834a',
    orangeSoft: 'rgba(232,131,74,0.14)',
    surface: '#1a3326',
}
const display = "'Nunito', system-ui, sans-serif"
const sans = "'Inter', system-ui, sans-serif"

function StatCard({ label, value, icon, color, soft }: { label: string; value: number; icon: string; color: string; soft: string }) {
    return (
        <div style={{
            background: A.card, border: `1px solid ${A.cardBorder}`,
            borderRadius: '16px', padding: '24px',
            borderTop: `3px solid ${color}`,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <p style={{ fontFamily: sans, fontWeight: 500, fontSize: '13px', color: A.textMuted, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {label}
                </p>
                <div style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: soft, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '18px',
                }}>
                    {icon}
                </div>
            </div>
            <p style={{ fontFamily: display, fontWeight: 900, fontSize: '38px', color: A.text, margin: 0, lineHeight: 1 }}>
                {value}
            </p>
        </div>
    )
}

function statusColor(status: string) {
    if (status === 'Confirmed') return A.teal
    if (status === 'Pending') return A.orange
    if (status === 'Completed') return A.green
    return A.red
}

const RECENT_ACTIVITY = [
    { msg: 'Reservation R003 received — Ananya Iyer, 6 guests', time: '2h ago', icon: '📬' },
    { msg: 'R001 confirmed — Priya Sharma, Anniversary dinner', time: '3h ago', icon: '✅' },
    { msg: 'R009 cancelled by guest — Meera Joshi', time: '1d ago', icon: '❌' },
    { msg: 'R008 marked completed — Arun Pillai, 4 guests', time: '1d ago', icon: '🏁' },
]

export default function AdminDashboard() {
    const navigate = useNavigate()
    const [stats, setStats] = useState(getReservationStats())
    const [upcoming, setUpcoming] = useState<Reservation[]>([])

    useEffect(() => {
        setStats(getReservationStats())
        setUpcoming(getUpcomingReservations().slice(0, 5))
    }, [])

    return (
        <AdminLayout pageTitle="Dashboard">
            <style>{`
        .dash-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        .dash-bottom { display: grid; grid-template-columns: 1.6fr 1fr; gap: 24px; }
        @media (max-width: 1024px) { .dash-stats { grid-template-columns: repeat(2, 1fr); } .dash-bottom { grid-template-columns: 1fr; } }
        @media (max-width: 480px) { .dash-stats { grid-template-columns: 1fr; } }
      `}</style>

            {/* Welcome */}
            <div style={{ marginBottom: '28px' }}>
                <h2 style={{ fontFamily: display, fontWeight: 900, fontSize: '22px', color: A.text, margin: '0 0 4px' }}>
                    Good evening 🌿
                </h2>
                <p style={{ fontFamily: sans, fontSize: '13px', color: A.textMuted, margin: 0 }}>
                    Here's an overview of Pankhii's reservations.
                </p>
            </div>

            {/* Stat cards */}
            <div className="dash-stats">
                <StatCard label="Today's Reservations" value={stats.todayCount} icon="📅" color={A.teal} soft={A.tealSoft} />
                <StatCard label="Pending" value={stats.pendingCount} icon="⏳" color={A.orange} soft={A.orangeSoft} />
                <StatCard label="Confirmed" value={stats.confirmedCount} icon="✅" color={A.green} soft={A.greenSoft} />
                <StatCard label="Cancelled" value={stats.cancelledCount} icon="❌" color={A.red} soft={A.redSoft} />
            </div>

            {/* Bottom panels */}
            <div className="dash-bottom">
                {/* Upcoming reservations */}
                <div style={{ background: A.card, border: `1px solid ${A.cardBorder}`, borderRadius: '16px', overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: `1px solid ${A.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontFamily: display, fontWeight: 800, fontSize: '15px', color: A.text, margin: 0 }}>
                            Upcoming Reservations
                        </p>
                        <button
                            onClick={() => navigate('/admin/reservations')}
                            style={{
                                padding: '6px 14px', borderRadius: '8px',
                                border: `1px solid ${A.goldSoft}`, background: A.goldSoft,
                                color: A.gold, fontFamily: display, fontWeight: 700, fontSize: '12px',
                                cursor: 'pointer',
                            }}
                        >
                            View All →
                        </button>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        {upcoming.length === 0 ? (
                            <p style={{ padding: '24px', color: A.textMuted, fontFamily: sans, fontSize: '14px', textAlign: 'center' }}>
                                No upcoming reservations.
                            </p>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                                <thead>
                                    <tr style={{ borderBottom: `1px solid ${A.cardBorder}` }}>
                                        {['Guest', 'Date', 'Time', 'Guests', 'Status'].map(h => (
                                            <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: display, fontWeight: 700, fontSize: '11px', color: A.textMuted, textTransform: 'uppercase', letterSpacing: '0.09em' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcoming.map(r => (
                                        <tr key={r.id} style={{ borderBottom: `1px solid ${A.cardBorder}` }}>
                                            <td style={{ padding: '14px 16px', fontFamily: display, fontWeight: 700, fontSize: '14px', color: A.text }}>{r.guestName}</td>
                                            <td style={{ padding: '14px 16px', fontFamily: sans, fontSize: '13px', color: A.textMuted }}>
                                                {new Date(r.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                            </td>
                                            <td style={{ padding: '14px 16px', fontFamily: sans, fontSize: '13px', color: A.textMuted }}>{r.time}</td>
                                            <td style={{ padding: '14px 16px', fontFamily: sans, fontSize: '13px', color: A.textMuted }}>{r.guests}</td>
                                            <td style={{ padding: '14px 16px' }}>
                                                <span style={{
                                                    padding: '3px 10px', borderRadius: '999px',
                                                    background: `${statusColor(r.status)}22`,
                                                    color: statusColor(r.status),
                                                    fontFamily: display, fontWeight: 700, fontSize: '11px',
                                                }}>
                                                    {r.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Recent activity */}
                <div style={{ background: A.card, border: `1px solid ${A.cardBorder}`, borderRadius: '16px', overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: `1px solid ${A.cardBorder}` }}>
                        <p style={{ fontFamily: display, fontWeight: 800, fontSize: '15px', color: A.text, margin: 0 }}>
                            Recent Activity
                        </p>
                    </div>
                    <div style={{ padding: '8px 0' }}>
                        {RECENT_ACTIVITY.map((item, i) => (
                            <div key={i} style={{ padding: '14px 24px', borderBottom: i < RECENT_ACTIVITY.length - 1 ? `1px solid ${A.cardBorder}` : 'none', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
                                <div>
                                    <p style={{ fontFamily: sans, fontSize: '13px', color: A.text, margin: '0 0 3px', lineHeight: 1.5 }}>{item.msg}</p>
                                    <p style={{ fontFamily: sans, fontSize: '11px', color: A.textMuted, margin: 0 }}>{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
