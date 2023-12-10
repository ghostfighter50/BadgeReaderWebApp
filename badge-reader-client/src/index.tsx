import React from 'react'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { createRoot } from 'react-dom/client'

// Access the root DOM element with the id 'root'
const root = createRoot(document.getElementById('root')!)

// Render the app inside the AuthProvider to provide authentication context to the app
root.render(
  <React.StrictMode>
    {/* Wrap the entire application with AuthProvider for providing authentication context */}
    <AuthProvider>
      {/* Render the main App component */}
      <App />
    </AuthProvider>
  </React.StrictMode>
)
