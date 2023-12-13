import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScanPage from './pages/scanPage'
import AdminPage from './pages/adminPage'
import PrivateRoutes from './components/PrivateRoutes'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

/**
 * Main application component.
 */
const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          {/* PrivateRoutes component contains routes that require authentication. */}
          <Route element={<PrivateRoutes />}>
            <Route
              element={
                <>
                  <Navbar />
                  <AdminPage />
                  <Footer />
                </>
              }
              path='/admin'
            />
          </Route>
          <Route
            element={
              <>
                <Navbar />
                <ScanPage />
                <Footer />
              </>
            }
            path='/'
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
