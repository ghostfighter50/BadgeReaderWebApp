import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScanPage from './pages/scanPage'
import AdminPage from './pages/adminPage'
import PrivateRoutes from './components/PrivateRoutes'

/**
 * Main application component.
 */
const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* PrivateRoutes component contains routes that require authentication. */}
          <Route element={<PrivateRoutes />}>
            {/* AdminPage is accessible under the "/admin" path. */}
            <Route element={<AdminPage />} path="/admin" />
          </Route>
          {/* ScanPage is the default page accessible under the root path "/" */}
          <Route element={<ScanPage />} path="/" />
        </Routes>
      </Router>
    </div>
  )
}

export default App
