import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScanPage from './pages/scanPage'
import AdminPage from './pages/adminPage'
import PrivateRoutes from './components/PrivateRoutes'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import './App.css'

const rootStyle = {
  height: '100%'
}

/**
 * Main application component.
 */
const App: React.FC = () => {
  return (
    <div className='App' style={rootStyle}>
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
