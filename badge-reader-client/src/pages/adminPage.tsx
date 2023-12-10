import React from 'react'
import { useAuth } from '../contexts/AuthContext'

/**
 * Functional component representing the Admin Panel.
 * @component
 * @returns {JSX.Element} - Rendered component.
 */
const AdminPage: React.FC = () => {
  const { logoutAdmin } = useAuth()

  const handleLogout = () => {
    logoutAdmin()
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AdminPage
