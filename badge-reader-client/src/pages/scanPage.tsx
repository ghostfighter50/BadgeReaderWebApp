import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AccessGranted } from '../components/AccessGranted'
import { AccessDenied } from '../components/AccessDenied'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../config/api.json'

/**
 * ScanPage component for handling badge scanning and admin authentication.
 * @component
 * @returns {JSX.Element} JSX.Element
 */
const ScanPage: React.FC = () => {
  // State variables
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [scannedBadge, setScannedBadge] = useState<any | null>(null)
  const [accessStatus, setAccessStatus] = useState<boolean | null>(null)

  // Auth context and navigation hooks
  const { loginAdmin } = useAuth()
  const navigate = useNavigate()

  /**
   * Effect hook for setting up WebSocket connection.
   */
  useEffect(() => {
    const ws = new WebSocket(`ws://${api.host}:${api.port}`)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.type === 'adminBadgeScanned') {
        setScannedBadge(data.data)
        setModalIsOpen(true)
      } else if (data.type === 'badgeScanned') {
        setScannedBadge(data.data)
        setAccessStatus(data.success || false)
      }
    }

    return () => {
      ws.close()
    }
  }, [])

  /**
   * Handles admin password submission.
   * @async
   */
  const handleAdminPasswordSubmit = async () => {
    try {
      setModalIsOpen(false)

      const response = await axios.post(
        `http://${api.host}:${api.port}/api/admin`,
        {
          badgeId: scannedBadge.badgeId,
          password: adminPassword
        }
      )

      if (response.data.success) {
        console.log(response.data)
        loginAdmin(response.data.token)
        navigate('/admin')
      } else {
        setAccessStatus(false)
      }
    } catch (error: any) {
      console.error('Error in admin authentication:', error.message)
    }
  }

  return (
    <div className="container mt-5">
      {accessStatus === true && <AccessGranted />}
      {accessStatus === false && <AccessDenied />}

      {/* Modal for admin password input */}
      <div
        className={`modal fade ${modalIsOpen ? 'show' : ''}`}
        style={{ display: modalIsOpen ? 'block' : 'none' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Admin Password </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setModalIsOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              <label>
                Password:
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="form-control"
                />
              </label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAdminPasswordSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScanPage
