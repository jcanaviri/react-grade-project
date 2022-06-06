import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Auth Provider
import { AuthProvider } from './context/AuthContext'

// Protected Route
import { ProtectedRoute } from './utils/ProtectedRoute'

// Pages
import { Home } from './pages/Home'
import { Auth } from './pages/Auth'
import { Dashboard } from './pages/Dashboard'

export default () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
