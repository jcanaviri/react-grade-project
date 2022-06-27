import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Protected Route
import { ProtectedRoute } from './utils/ProtectedRoute'

// Layouts
import { DashboardLayout } from './Layouts/DashboardLayout'

// Context Providers
import { AppProviders } from './utils/AppProviders'

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
  EstimationList,
  EstimationTypes,
  Tags,
  MakeEstimation,
} from './pages'

export default () => {
  return (
    <BrowserRouter>
      <AppProviders>
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

            {/* Estimation Routes */}
            <Route path='estimations' element={<ProtectedRoute><Estimations /></ProtectedRoute>} />
            <Route path='estimations/list' element={<ProtectedRoute><EstimationList /></ProtectedRoute>} />
            <Route path='estimations/:id' element={<ProtectedRoute><MakeEstimation /></ProtectedRoute>} />

            {/* Tags */}
            <Route path='tags' element={<ProtectedRoute><Tags /></ProtectedRoute>} />

            {/* Estimation Types Routes */}
            <Route path='estimations-types' element={<ProtectedRoute><EstimationTypes /></ProtectedRoute>} />
          </Route>
        </Routes>
      </AppProviders>
    </BrowserRouter>
  )
}
