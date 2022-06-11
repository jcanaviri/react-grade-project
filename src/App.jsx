import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Auth Provider
import { AuthProvider } from './context/AuthContext'

// Protected Route
import { ProtectedRoute } from './utils/ProtectedRoute'

// Layouts
import { DashboardLayout } from './Layouts/DashboardLayout'

// Pages
import { Home } from './pages/Home'
import { Auth } from './pages/Auth'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'
import { Profile } from './pages/Profile'

export default () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path='' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
            <Route path="projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
