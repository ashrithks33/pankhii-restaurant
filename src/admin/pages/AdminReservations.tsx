import { useState, useEffect, useCallback } from 'react'
import AdminLayout from '../components/AdminLayout'
import ReservationModal from '../components/ReservationModal'
import {
    getAllReservations,
    searchReservations,
    updateReservationStatus,
    type Reservation,
    type ReservationStatus,
} from '../data/mockReservations'

const A = {
    card: '#162a1e',
    cardBorder: 'rgba(255,255,255,0.06)',
    gold: '#D4AF37',
    goldSoft: 'rgba(212,175,55,0.15)',
    teal: '#28C7D8',
    tealSoft: 'rgba(40,199,216,0.12)',
    text: '#f0ede6',
    textMuted: 'rgba(240,237,230,0.55)',
    red: '#e05252',
    green: '#4caf82',
    orange: '#e8834a',
    surface: '#1a3326',
    inputBg: '#0f1f17',
    inputBorder: 'rgba(255,255,255,0.1)',
}
const display = "'Nunito', system-ui, sans-serif"
const sans = "'Inter', system-ui, sans-serif"

type FilterTab = 'All' | 'Today' | 'Upcoming' | 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
const TABS: FilterTab[] = ['All', 'Today', 'Upcoming', 'Pending', 'Confirmed', 'Completed', 'Cancelled']

function statusColor(status: ReservationStatus) {
    if (status === 'Confirmed') return A.teal
    if (status === 'Pending') return A.orange
    if (status === 'Completed') return A.green
    return A.red
}

function StatusBadge({ status }: { status: ReservationStatus }) {
    return (
        <span style={{
            padding: '3px 10px', borderRadius: '999px',
            background: `${statusColor(status)}22`,
            color: statusColor(status),
            fontFamily: display, fontWeight: 700, fontSize: '11px',
            whiteSpace: 'nowrap',
        }}>
            {status}
        </span>
    )
}

function applyFilter(list: Reservation[], tab: FilterTab): Reservation[] {
    const today = new Date().toISOString().slice(0, 10)
    switch (tab) {
        case 'Today': return list.filter(r => r.date === today)
        case 'Upcoming': return list.filter(r => r.date >= today && r.status !== 'Cancelled' && r.status !== 'Completed')
        case 'Pending': return list.filter(r => r.status === 'Pending')
        case 'Confirmed': return list.filter(r => r.status === 'Confirmed')
        case 'Completed': return list.filter(r => r.status === 'Completed')
        case 'Cancelled': return list.filter(r => r.status === 'Cancelled')
        default: return list
    }
}

export default function AdminReservations() {
    const [search, setSearch] = useState('')
    const [activeTab, setActiveTab] = useState<FilterTab>('All')
    const [allData, setAllData] = useState<Reservation[]>(getAllReservations())
    const [selected, setSelected] = useState<Reservation | null>(null)

    const refresh = useCallback(() => {
        setAllData(getAllReservations())
    }, [])

    useEffect(() => { refresh() }, [refresh])

    const filtered = applyFilter(
        search.trim() ? searchReservations(search) : allData,
        activeTab
    )

    function quickStatus(id: string, status: ReservationStatus) {
        updateReservationStatus(id, status)
        refresh()
        if (selected?.id === id) {
            setSelected(prev => prev ? { ...prev, status } : null)
        }
    }

    return (
        <AdminLayout pageTitle="Reservations">
            <style>{`
        .res-table-wrap { overflow-x: auto; }
        .res-table { width: 100%; border-collapse: collapse; min-width: 760px; }
        .res-table th { padding: 12px 14px; text-align: left; font-family: ${display}; font-weight: 700; font-size: 11px; color: ${A.textMuted}; text-transform: uppercase; letter-spacing: 0.09em; border-bottom: 1px solid ${A.cardBorder}; white-space: nowrap; }
        .res-table td { padding: 13px 14px; border-bottom: 1px solid ${A.cardBorder}; vertical-align: middle; }
        .res-row { cursor: pointer; transition: background 0.18s; }
        .res-row:hover { background: rgba(255,255,255,0.03); }
        .tabs-wrap { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .tab-btn { padding: 7px 16px; border-radius: 999px; border: 1px solid ${A.cardBorder}; background: transparent; color: ${A.textMuted}; font-family: ${display}; font-weight: 700; font-size: 12px; cursor: pointer; transition: all 0.18s; white-space: nowrap; }
        .tab-btn.active { background: ${A.goldSoft}; border-color: ${A.gold}; color: ${A.gold}; }
        .tab-btn:hover:not(.active) { border-color: ${A.textMuted}; color: ${A.text}; }
        .action-btn { padding: 5px 10px; border-radius: 8px; border: 1px solid; font-family: ${display}; font-weight: 700; font-size: 11px; cursor: pointer; white-space: nowrap; transition: opacity 0.18s; }
        .action-btn:hover { opacity: 0.8; }
      `}</style>

            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ fontFamily: display, fontWeight: 900, fontSize: '20px', color: A.text, margin: '0 0 4px' }}>
                        All Reservations
                    </h2>
                    <p style={{ fontFamily: sans, fontSize: '13px', color: A.textMuted, margin: 0 }}>
                        {filtered.length} reservation{filtered.length !== 1 ? 's' : ''} shown
                    </p>
                </div>

                {/* Search */}
                <input
                    type="search"
                    placeholder="Search by name or phone…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        padding: '10px 16px', borderRadius: '12px',
                        border: `1.5px solid ${A.inputBorder}`,
                        background: A.inputBg, color: A.text,
                        fontFamily: sans, fontSize: '14px', outline: 'none',
                        width: '260px', maxWidth: '100%',
                        transition: 'border-color 0.2s',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = A.gold }}
                    onBlur={e => { e.currentTarget.style.borderColor = A.inputBorder }}
                />
            </div>

            {/* Filter tabs */}
            <div className="tabs-wrap">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        className={`tab-btn${activeTab === tab ? ' active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div style={{ background: A.card, border: `1px solid ${A.cardBorder}`, borderRadius: '16px', overflow: 'hidden' }}>
                <div className="res-table-wrap">
                    {filtered.length === 0 ? (
                        <p style={{ padding: '40px', color: A.textMuted, fontFamily: sans, fontSize: '14px', textAlign: 'center' }}>
                            No reservations found.
                        </p>
                    ) : (
                        <table className="res-table">
                            <thead style={{ background: A.surface }}>
                                <tr>
                                    <th>Guest</th>
                                    <th>Phone</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Guests</th>
                                    <th>Occasion</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(r => (
                                    <tr key={r.id} className="res-row" onClick={() => setSelected(r)}>
                                        <td>
                                            <p style={{ fontFamily: display, fontWeight: 700, fontSize: '14px', color: A.text, margin: 0 }}>{r.guestName}</p>
                                            <p style={{ fontFamily: sans, fontSize: '11px', color: A.textMuted, margin: '2px 0 0' }}>{r.id}</p>
                                        </td>
                                        <td>
                                            <a
                                                href={`tel:${r.phone.replace(/\s/g, '')}`}
                                                onClick={e => e.stopPropagation()}
                                                style={{ fontFamily: sans, fontSize: '13px', color: A.teal, textDecoration: 'none', whiteSpace: 'nowrap' }}
                                            >
                                                {r.phone}
                                            </a>
                                        </td>
                                        <td style={{ fontFamily: sans, fontSize: '13px', color: A.text, whiteSpace: 'nowrap' }}>
                                            {new Date(r.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td style={{ fontFamily: sans, fontSize: '13px', color: A.textMuted, whiteSpace: 'nowrap' }}>{r.time}</td>
                                        <td style={{ fontFamily: sans, fontSize: '13px', color: A.textMuted, textAlign: 'center' }}>{r.guests}</td>
                                        <td style={{ fontFamily: sans, fontSize: '13px', color: A.textMuted }}>{r.occasion || '—'}</td>
                                        <td onClick={e => e.stopPropagation()}><StatusBadge status={r.status} /></td>
                                        <td onClick={e => e.stopPropagation()}>
                                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                {r.status === 'Pending' && (
                                                    <button
                                                        className="action-btn"
                                                        style={{ borderColor: A.teal, background: A.tealSoft, color: A.teal }}
                                                        onClick={() => quickStatus(r.id, 'Confirmed')}
                                                    >✓</button>
                                                )}
                                                {r.status !== 'Completed' && r.status !== 'Cancelled' && (
                                                    <button
                                                        className="action-btn"
                                                        style={{ borderColor: A.green, background: 'rgba(76,175,130,0.12)', color: A.green }}
                                                        onClick={() => quickStatus(r.id, 'Completed')}
                                                    >✔</button>
                                                )}
                                                {r.status !== 'Cancelled' && (
                                                    <button
                                                        className="action-btn"
                                                        style={{ borderColor: A.red, background: 'rgba(224,82,82,0.12)', color: A.red }}
                                                        onClick={() => quickStatus(r.id, 'Cancelled')}
                                                    >✕</button>
                                                )}
                                                <a
                                                    href={`tel:${r.phone.replace(/\s/g, '')}`}
                                                    className="action-btn"
                                                    style={{ borderColor: A.gold, background: A.goldSoft, color: A.gold, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                                                >📞</a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Modal */}
            {selected && (
                <ReservationModal
                    reservation={{ ...selected, status: allData.find(r => r.id === selected.id)?.status ?? selected.status }}
                    onClose={() => setSelected(null)}
                    onStatusChange={() => {
                        refresh()
                    }}
                />
            )}
        </AdminLayout>
    )
}
