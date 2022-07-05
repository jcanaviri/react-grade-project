import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layouts
import { DashboardLayout } from './Layouts/DashboardLayout'

// App Utilities
import { AppProviders, ProtectedRoute } from './utils'

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
  Results,
  Result,
  History,
  Metrics,
  Models,
  Docs,
} from './pages'

export const App = () => {
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

            {/* Results Routes */}
            <Route path='results/list' element={<ProtectedRoute><Results /></ProtectedRoute>} />
            <Route path='results/:id' element={<ProtectedRoute><Result /></ProtectedRoute>} />

            {/* Theory and Concepts */}
            <Route path='history' element={<ProtectedRoute><History /></ProtectedRoute>} />
            <Route path='metrics' element={<ProtectedRoute><Metrics /></ProtectedRoute>} />
            <Route path='models' element={<ProtectedRoute><Models /></ProtectedRoute>} />

            {/* Documentation */}
            <Route path='docs' element={<ProtectedRoute><Docs /></ProtectedRoute>} />

          </Route>
        </Routes>
      </AppProviders>
    </BrowserRouter>
  )
}
