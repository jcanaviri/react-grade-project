import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Auth Provider
import { AuthProvider } from './context/AuthContext'

// Projects Provider
import { ProjectProvider } from './context/ProjectContext'

// Protected Route
import { ProtectedRoute } from './utils/ProtectedRoute'

// Layouts
import { DashboardLayout } from './Layouts/DashboardLayout'

// Pages
import { Home } from './pages/Home'
import { Auth } from './pages/Auth'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'
import { ProjectList } from './pages/ProjectList'
import { Profile } from './pages/Profile'
import { Project } from './pages/Project'

export default () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            {/* prettier-ignore */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              {/* Main Dashboard  */}
              <Route path='' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>

              {/* Projects Routes */}
              <Route path="projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
              <Route path="projects/list" element={<ProtectedRoute><ProjectList /></ProtectedRoute>} />
              <Route path="projects/:id" element={<ProtectedRoute><Project /></ProtectedRoute>} />

              <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Route>
          </Routes>

        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
