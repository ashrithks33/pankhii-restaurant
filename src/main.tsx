import React, { type ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import './index.css'

// ── Admin pages (lazy-imported to keep public bundle unchanged) ──
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminReservations from './admin/pages/AdminReservations'

// ── Auth guard ───────────────────────────────────────────────────
// Uses sessionStorage for demo. Replace with Firebase onAuthStateChanged
// for production — only this component needs to change.
function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuth = sessionStorage.getItem('admin_auth') === 'true'
  return isAuth ? <>{children}</> : <Navigate to="/admin/login" replace />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ── Public website — completely unchanged ── */}
        <Route path="/*" element={<App />} />

        {/* ── Admin portal — fully isolated ── */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/reservations" element={<ProtectedRoute><AdminReservations /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
