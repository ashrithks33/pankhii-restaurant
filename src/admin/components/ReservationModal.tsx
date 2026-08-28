import type { Reservation, ReservationStatus } from '../data/mockReservations'
import { updateReservationStatus } from '../data/mockReservations'

const A = {
    bg: '#0f1f17',
    card: '#162a1e',
    cardBorder: 'rgba(255,255,255,0.06)',
    gold: '#D4AF37',
    goldSoft: 'rgba(212,175,55,0.15)',
    teal: '#28C7D8',
    text: '#f0ede6',
    textMuted: 'rgba(240,237,230,0.55)',
    red: '#e05252',
    green: '#4caf82',
    orange: '#e8834a',
    surface: '#1a3326',
    overlay: 'rgba(0,0,0,0.72)',
}
const display = "'Nunito', system-ui, sans-serif"
const sans = "'Inter', system-ui, sans-serif"

function StatusBadge({ status }: { status: ReservationStatus }) {
    const styles: Record<ReservationStatus, { bg: string; color: string }> = {
        Pending: { bg: 'rgba(232,131,74,0.18)', color: A.orange },
        Confirmed: { bg: 'rgba(40,199,216,0.18)', color: A.teal },
        Completed: { bg: 'rgba(76,175,130,0.18)', color: A.green },
        Cancelled: { bg: 'rgba(224,82,82,0.18)', color: A.red },
    }
    const s = styles[status]
    return (
        <span style={{
            padding: '4px 12px', borderRadius: '999px',
            background: s.bg, color: s.color,
            fontFamily: display, fontWeight: 700, fontSize: '12px',
            letterSpacing: '0.06em', whiteSpace: 'nowrap',
        }}>
            {status}
        </span>
    )
}

interface Props {
    reservation: Reservation
    onClose: () => void
    onStatusChange: () => void
}

export default function ReservationModal({ reservation: r, onClose, onStatusChange }: Props) {
    function changeStatus(status: ReservationStatus) {
        updateReservationStatus(r.id, status)
        onStatusChange()
    }

    const field = (label: string, value: string) => (
        <div style={{ marginBottom: '16px' }}>
            <p style={{ fontFamily: display, fontWeight: 700, fontSize: '11px', color: A.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 4px' }}>
                {label}
            </p>
            <p style={{ fontFamily: sans, fontWeight: 500, fontSize: '15px', color: A.text, margin: 0 }}>
                {value || '—'}
            </p>
        </div>
    )

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 500,
                background: A.overlay,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '16px',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: A.card, border: `1px solid ${A.cardBorder}`,
                    borderRadius: '20px', width: '100%', maxWidth: '520px',
                    maxHeight: '90vh', overflowY: 'auto',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '24px 28px', borderBottom: `1px solid ${A.cardBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div>
                        <p style={{ fontFamily: display, fontWeight: 900, fontSize: '18px', color: A.text, margin: 0 }}>
                            {r.guestName}
                        </p>
                        <p style={{ fontFamily: sans, fontWeight: 400, fontSize: '12px', color: A.textMuted, margin: '4px 0 0' }}>
                            Reservation {r.id}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <StatusBadge status={r.status} />
                        <button
                            onClick={onClose}
                            style={{
                                width: '32px', height: '32px', borderRadius: '8px',
                                border: `1px solid ${A.cardBorder}`, background: A.surface,
                                color: A.textMuted, cursor: 'pointer', fontSize: '16px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                        >✕</button>
                    </div>
                </div>

                {/* Details */}
                <div style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                    {field('Date', new Date(r.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))}
                    {field('Time', r.time)}
                    {field('Guests', `${r.guests} ${r.guests === 1 ? 'Guest' : 'Guests'}`)}
                    {field('Occasion', r.occasion || 'None')}
                    {field('Email', r.email)}
                    {field('Phone', r.phone)}
                    {field('Received', new Date(r.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }))}
                </div>

                {/* Actions */}
                <div style={{ padding: '0 28px 28px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {r.status !== 'Confirmed' && r.status !== 'Completed' && r.status !== 'Cancelled' && (
                        <button
                            onClick={() => changeStatus('Confirmed')}
                            style={btnSt(A.teal, 'rgba(40,199,216,0.14)')}
                        >✓ Confirm</button>
                    )}
                    {r.status !== 'Completed' && r.status !== 'Cancelled' && (
                        <button
                            onClick={() => changeStatus('Completed')}
                            style={btnSt(A.green, 'rgba(76,175,130,0.14)')}
                        >✔ Mark Completed</button>
                    )}
                    {r.status !== 'Cancelled' && (
                        <button
                            onClick={() => changeStatus('Cancelled')}
                            style={btnSt(A.red, 'rgba(224,82,82,0.14)')}
                        >✕ Cancel</button>
                    )}
                    <a
                        href={`tel:${r.phone.replace(/\s/g, '')}`}
                        style={{
                            ...btnSt(A.gold, A.goldSoft),
                            textDecoration: 'none', display: 'inline-flex',
                            alignItems: 'center', justifyContent: 'center',
                        }}
                    >📞 Call Guest</a>
                </div>
            </div>
        </div>
    )
}

function btnSt(color: string, bg: string): React.CSSProperties {
    return {
        padding: '10px 18px', borderRadius: '10px',
        border: `1px solid ${color}`,
        background: bg, color,
        fontFamily: display, fontWeight: 700, fontSize: '13px',
        cursor: 'pointer', transition: 'opacity 0.2s',
    }
}
