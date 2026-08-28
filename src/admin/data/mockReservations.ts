// ─────────────────────────────────────────────────────────────
// src/admin/data/mockReservations.ts
//
// ⚠️  DEMO DATA ONLY — not connected to any backend.
// To connect Firebase Firestore, replace the functions at the
// bottom of this file while keeping the same function signatures.
// ─────────────────────────────────────────────────────────────

export type ReservationStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'

export interface Reservation {
    id: string
    guestName: string
    phone: string
    email: string
    date: string        // ISO date string  e.g. "2026-08-30"
    time: string        // e.g. "7:30 PM"
    guests: number
    occasion: string    // e.g. "Birthday", "" if none
    status: ReservationStatus
    createdAt: string   // ISO datetime string
}

// ── Demo data ─────────────────────────────────────────────────
const INITIAL_DATA: Reservation[] = [
    {
        id: 'R001',
        guestName: 'Priya Sharma',
        phone: '+91 98765 43210',
        email: 'priya.sharma@email.com',
        date: '2026-08-29',
        time: '7:00 PM',
        guests: 4,
        occasion: 'Anniversary',
        status: 'Confirmed',
        createdAt: '2026-08-26T10:30:00',
    },
    {
        id: 'R002',
        guestName: 'Rahul Menon',
        phone: '+91 91234 56789',
        email: 'rahul.menon@email.com',
        date: '2026-08-29',
        time: '8:00 PM',
        guests: 2,
        occasion: '',
        status: 'Pending',
        createdAt: '2026-08-27T14:15:00',
    },
    {
        id: 'R003',
        guestName: 'Ananya Iyer',
        phone: '+91 99887 65432',
        email: 'ananya.iyer@email.com',
        date: '2026-08-29',
        time: '12:30 PM',
        guests: 6,
        occasion: 'Birthday',
        status: 'Pending',
        createdAt: '2026-08-27T09:00:00',
    },
    {
        id: 'R004',
        guestName: 'Vikram Nair',
        phone: '+91 80123 45678',
        email: 'vikram.nair@email.com',
        date: '2026-08-30',
        time: '7:30 PM',
        guests: 3,
        occasion: '',
        status: 'Confirmed',
        createdAt: '2026-08-27T11:45:00',
    },
    {
        id: 'R005',
        guestName: 'Kavya Reddy',
        phone: '+91 77654 32109',
        email: 'kavya.reddy@email.com',
        date: '2026-08-30',
        time: '1:00 PM',
        guests: 5,
        occasion: 'Family Gathering',
        status: 'Pending',
        createdAt: '2026-08-28T08:20:00',
    },
    {
        id: 'R006',
        guestName: 'Suresh Bhat',
        phone: '+91 88765 43210',
        email: 'suresh.bhat@email.com',
        date: '2026-08-31',
        time: '8:30 PM',
        guests: 2,
        occasion: 'Anniversary',
        status: 'Confirmed',
        createdAt: '2026-08-28T16:00:00',
    },
    {
        id: 'R007',
        guestName: 'Deepa Krishnan',
        phone: '+91 93456 78901',
        email: 'deepa.k@email.com',
        date: '2026-09-01',
        time: '7:00 PM',
        guests: 8,
        occasion: 'Corporate Dinner',
        status: 'Pending',
        createdAt: '2026-08-29T07:30:00',
    },
    {
        id: 'R008',
        guestName: 'Arun Pillai',
        phone: '+91 96789 01234',
        email: 'arun.pillai@email.com',
        date: '2026-08-28',
        time: '12:00 PM',
        guests: 4,
        occasion: '',
        status: 'Completed',
        createdAt: '2026-08-25T13:00:00',
    },
    {
        id: 'R009',
        guestName: 'Meera Joshi',
        phone: '+91 84321 09876',
        email: 'meera.joshi@email.com',
        date: '2026-08-27',
        time: '7:30 PM',
        guests: 2,
        occasion: 'Birthday',
        status: 'Cancelled',
        createdAt: '2026-08-24T10:00:00',
    },
    {
        id: 'R010',
        guestName: 'Kiran Rao',
        phone: '+91 70987 65432',
        email: 'kiran.rao@email.com',
        date: '2026-09-02',
        time: '8:00 PM',
        guests: 3,
        occasion: '',
        status: 'Pending',
        createdAt: '2026-08-29T06:00:00',
    },
]

// ── In-memory state (session-scoped) ─────────────────────────
// Future: replace with Firestore listeners / snapshot queries.
let _reservations: Reservation[] = [...INITIAL_DATA]

// ── Data-access functions ─────────────────────────────────────
// These mirror the interface that Firebase Firestore helpers would expose.

/** Return a copy of all reservations, newest first. */
export function getAllReservations(): Reservation[] {
    return [..._reservations].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
}

/** Update the status of a single reservation in place. */
export function updateReservationStatus(id: string, status: ReservationStatus): void {
    _reservations = _reservations.map(r => (r.id === id ? { ...r, status } : r))
}

/** Return today's reservations. */
export function getTodayReservations(): Reservation[] {
    const today = new Date().toISOString().slice(0, 10)
    return _reservations.filter(r => r.date === today)
}

/** Return upcoming reservations (today onwards), sorted by date/time. */
export function getUpcomingReservations(): Reservation[] {
    const today = new Date().toISOString().slice(0, 10)
    return [..._reservations]
        .filter(r => r.date >= today && r.status !== 'Cancelled' && r.status !== 'Completed')
        .sort((a, b) => a.date.localeCompare(b.date))
}

/** Simple search across guestName and phone. */
export function searchReservations(query: string): Reservation[] {
    const q = query.toLowerCase().trim()
    if (!q) return getAllReservations()
    return _reservations.filter(
        r =>
            r.guestName.toLowerCase().includes(q) ||
            r.phone.replace(/\s/g, '').includes(q.replace(/\s/g, ''))
    )
}

/** Summary counts used by the dashboard. */
export function getReservationStats() {
    const today = new Date().toISOString().slice(0, 10)
    return {
        todayCount: _reservations.filter(r => r.date === today).length,
        pendingCount: _reservations.filter(r => r.status === 'Pending').length,
        confirmedCount: _reservations.filter(r => r.status === 'Confirmed').length,
        cancelledCount: _reservations.filter(r => r.status === 'Cancelled').length,
    }
}
