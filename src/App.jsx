import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Auth Provider
import { AuthProvider } from './context/AuthContext'

// Projects Provider
import { ProjectProvider } from './context/ProjectContext'

// Tags Provider
import { TagProvider } from './context/TagContext'

// Protected Route
import { ProtectedRoute } from './utils/ProtectedRoute'

// Layouts
import { DashboardLayout } from './Layouts/DashboardLayout'

// Pages
import {
  Home,
  Auth,
  Profile,
  Dashboard,
  Project,
  Projects,
  ProjectList,
  Estimations,
  Tags,
} from './pages'

export default () => {
  return (
    <BrowserRouter>
    
      <AuthProvider>
        <ProjectProvider>
          <TagProvider>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth />} />
              {/* prettier-ignore */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              {/* Main Dashboard  */}
              <Route path='' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>

              <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

              {/* Projects Routes */}
              <Route path="projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
              <Route path="projects/list" element={<ProtectedRoute><ProjectList /></ProtectedRoute>} />
              <Route path="projects/:id" element={<ProtectedRoute><Project /></ProtectedRoute>} />

              <Route path='estimations' element={<ProtectedRoute><Estimations /></ProtectedRoute>} />

              {/* Tags */}
              <Route path='tags' element={<ProtectedRoute><Tags /></ProtectedRoute>} />

            </Route>
            </Routes>

          </TagProvider>
        </ProjectProvider>
      </AuthProvider>

    </BrowserRouter>
  )
}
