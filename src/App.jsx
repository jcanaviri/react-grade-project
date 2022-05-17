import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// Auth Provider
import { AuthProvider } from './context/AuthContext'

// Protected Route
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Auth from './pages/Auth'
import Account from './pages/Account'

export default () => {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
      </ul>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
