import React, { useState, useEffect, useRef } from 'react'
import { BadgeService } from '../services/badgeService'
import { ScanService } from '../services/scanService'
import { useAuth } from '../contexts/AuthContext'
import { Loading } from '../components/Loading'

/**
 * Interface for representing a Badge.
 */
interface Badge {
  badgeId: string
  name: string
  lastScanned: Date | null
  isScanned: boolean
  isAdmin: boolean
}

/**
 * AdminPanel component for managing badges.
 */
const AdminPanel: React.FC = () => {
  const [badges, setBadges] = useState<Badge[] | null>(null)
  const [newBadgeId, setNewBadgeId] = useState('')
  const [newBadgeName, setNewBadgeName] = useState('')
  const [deleteBadgeId, setDeleteBadgeId] = useState('')
  const [renameBadgeId, setRenameBadgeId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const badgeService = new BadgeService()
  const scanService = new ScanService()
  const { logoutAdmin } = useAuth()

  const createModalRef = useRef<HTMLDivElement>(null)
  const deleteAllModalRef = useRef<HTMLDivElement>(null)
  const deleteModalRef = useRef<HTMLDivElement>(null)
  const renameModalRef = useRef<HTMLDivElement>(null)

  /**
   * Closes a modal.
   * @param {React.RefObject<HTMLDivElement>} modalRef - Reference to the modal.
   */
  const closeModal = (modalRef: React.RefObject<HTMLDivElement>) => {
    modalRef.current && (modalRef.current.style.display = 'none')
  }

  /**
   * Fetches all badges from the server.
   */
  const fetchBadges = async () => {
    try {
      const allBadges = await badgeService.getAllBadges()
      setBadges(allBadges)
    } catch (error) {
      setError('Error fetching badges. Please try again.')
    }
  }

  useEffect(() => {
    fetchBadges()
  }, [])

  /**
   * Handles asynchronous operations with loading, error, and success handling.
   * @param {() => Promise<void>} operation - Asynchronous operation function.
   * @param {string} successMessage - Message to display on successful operation.
   */
  const handleAsyncOperation = async (operation: () => Promise<void>, successMessage: string) => {
    try {
      setLoading(true)
      await operation()
      setSuccess(successMessage)
      fetchBadges()
    } catch (error: any) {
      setError(`Error: ${error.message}`)
    } finally {
      setTimeout(() => {
        setLoading(false)
        closeModal(createModalRef)
        closeModal(deleteAllModalRef)
        closeModal(deleteModalRef)
        closeModal(renameModalRef)
      }, 300)
    }
  }

  /**
   * Handles creating a new badge.
   */
  const handleCreateBadge = () => {
    handleAsyncOperation(async () => {
      const createdBadge = await badgeService.createBadge({
        badgeId: newBadgeId,
        name: newBadgeName,
        lastScanned: null,
        isScanned: false,
        isAdmin: false
      })

      setBadges((prevBadges) => (prevBadges ? [...prevBadges, createdBadge] : [createdBadge]))
    }, 'Badge created successfully!')
  }

  /**
   * Handles deleting all badges.
   */
  const handleDeleteAllBadges = () => {
    handleAsyncOperation(async () => {
      await badgeService.deleteAllBadges()
      setBadges([])
    }, 'All badges deleted successfully!')
  }

  /**
   * Handles deleting a specific badge.
   */
  const handleDeleteBadge = () => {
    handleAsyncOperation(async () => {
      if (deleteBadgeId) {
        await badgeService.deleteBadge(deleteBadgeId)
        setBadges((prevBadges) => (prevBadges ? prevBadges.filter((badge) => badge.badgeId !== deleteBadgeId) : []))
      }
    }, 'Badge deleted successfully!')
  }

  /**
   * Handles scanning a badge.
   * @param {string} scanBadgeId - ID of the badge to scan.
   */
  const handleScanBadge = (scanBadgeId: string) => {
    handleAsyncOperation(async () => {
      if (scanBadgeId) {
        await scanService.scanBadge(scanBadgeId)
        setBadges((prevBadges) => (prevBadges ? prevBadges.filter((badge) => badge.badgeId !== scanBadgeId) : []))
      }
    }, 'Badge scanned successfully!')
  }

  /**
   * Handles renaming a badge.
   */
  const handleRenameBadge = () => {
    handleAsyncOperation(async () => {
      const renameBadgeData = {
        id: renameBadgeId,
        name: newBadgeName,
        lastScanned: null,
        isScanned: false,
        isAdmin: false
      }
      await badgeService.modifyBadge(renameBadgeId, renameBadgeData)
      setBadges((prevBadges: any) => prevBadges.map((badge: any) => (badge.badgeId === renameBadgeId ? { ...badge, name: newBadgeName } : badge)))
    }, 'Badge renamed successfully!')
  }

  /**
   * Opens the rename modal for a specific badge.
   * @param {string} badgeId - ID of the badge to rename.
   */
  const handleOpenRenameModal = (badgeId: string) => {
    setRenameBadgeId(badgeId)
    setNewBadgeName('')
    renameModalRef.current!.style.display = 'block'
  }

  /**
   * Handles admin logout.
   */
  const handleLogout = () => {
    logoutAdmin()
  }
  return (
    <div className='container mt-5'>
      {/* Title */}
      <h2>Badge List</h2>

      {/* Display error message if there is an error */}
      {error && (
        <div className='alert alert-danger alert-dismissible fade show' role='alert'>
          {error}
          <button type='button' className='btn-close' data-bs-dismiss='alert' aria-label='Close' onClick={() => setError(null)}></button>
        </div>
      )}

      {/* Display success message if there is a success message */}
      {success && (
        <div className='alert alert-success alert-dismissible fade show' role='alert'>
          {success}
          <button type='button' className='btn-close' data-bs-dismiss='alert' aria-label='Close' onClick={() => setSuccess(null)}></button>
        </div>
      )}

      {/* Display loading indicator if loading */}
      {loading && (
        <div className='alert alert-info' role='alert'>
          <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> <span>Loading</span>
        </div>
      )}

      {/* Button to create a new badge */}
      <button className='btn btn-primary' onClick={() => (createModalRef.current!.style.display = 'block')} disabled={loading}>
        Create Badge
      </button>

      {/* Button to delete all badges */}
      <button className='btn btn-danger ms-2' onClick={() => (deleteAllModalRef.current!.style.display = 'block')} disabled={loading}>
        Delete All
      </button>

      {/* Button to logout */}
      <button className='btn btn-secondary ms-2' onClick={handleLogout}>
        Logout
      </button>

      {/* Badge list table */}
      {badges === null
        ? (
        <Loading />
          )
        : badges.length === 1
          ? (
        <p>No badges available.</p>
            )
          : (
        <table className='table mt-3'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Last Scanned</th>
              <th>Scanned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {badges.map(
              (badge) =>
                !badge.isAdmin && (
                  <tr key={badge.badgeId}>
                    <td>{badge.badgeId}</td>
                    <td>{badge.name}</td>
                    <td>
                      {/* Display 'N/A' if lastScanned is null or undefined, otherwise show the timestamp */}
                      {badge.lastScanned !== null && badge.lastScanned !== undefined ? badge.lastScanned.toString() : 'N/A'}
                    </td>
                    {/* Display 'Yes' or 'No' based on the value of isScanned */}
                    <td>{badge.isScanned ? 'Yes' : 'No'}</td>
                    <td>
                      {/* Action buttons for each badge */}
                      <button className='btn btn-warning btn-sm me-2' onClick={() => { handleScanBadge(badge.badgeId) }} disabled={loading}>
                        Scan
                      </button>
                      <button className='btn btn-info btn-sm me-2' onClick={() => handleOpenRenameModal(badge.badgeId)} disabled={loading}>
                        Rename
                      </button>
                      <button className='btn btn-danger btn-sm' onClick={() => { setDeleteBadgeId(badge.badgeId); deleteModalRef.current!.style.display = 'block' }} disabled={loading}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
            )}
      {/* Create Badge Modal */}
      <div className='modal' tabIndex={-1} role='dialog' ref={createModalRef} style={{ display: 'none' }}>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='createModalLabel'>
                Create Badge
              </h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => closeModal(createModalRef)}></button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='mb-3'>
                  <label htmlFor='newBadgeId' className='form-label'>
                    Badge ID
                  </label>
                  <input type='text' className='form-control' id='newBadgeId' value={newBadgeId} onChange={(e) => setNewBadgeId(e.target.value)} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='newBadgeName' className='form-label'>
                    Badge Name
                  </label>
                  <input type='text' className='form-control' id='newBadgeName' value={newBadgeName} onChange={(e) => setNewBadgeName(e.target.value)} />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' onClick={() => closeModal(createModalRef)}>
                Close
              </button>
              <button type='button' className='btn btn-primary' onClick={handleCreateBadge} disabled={loading}>
                {loading && <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>}
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete All Badges Modal */}
      <div className='modal' tabIndex={-1} role='dialog' ref={deleteAllModalRef} style={{ display: 'none' }}>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='deleteAllModalLabel'>
                Delete All Badges
              </h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => closeModal(deleteAllModalRef)}></button>
            </div>
            <div className='modal-body'>
              <p>Are you sure you want to delete all badges?</p>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' onClick={() => closeModal(deleteAllModalRef)}>
                Cancel
              </button>
              <button type='button' className='btn btn-danger' onClick={handleDeleteAllBadges} disabled={loading}>
                {loading && <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>}
                Delete All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Badge Modal */}
      <div className='modal' tabIndex={-1} role='dialog' ref={deleteModalRef} style={{ display: 'none' }}>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='deleteModalLabel'>
                Delete Badge
              </h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => closeModal(deleteModalRef)}></button>
            </div>
            <div className='modal-body'>
              <p>Are you sure you want to delete the selected badge?</p>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' onClick={() => closeModal(deleteModalRef)}>
                Cancel
              </button>
              <button type='button' className='btn btn-danger' onClick={handleDeleteBadge} disabled={loading}>
                {loading && <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>}
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rename Badge Modal */}
      <div className='modal' tabIndex={-1} role='dialog' ref={renameModalRef} style={{ display: 'none' }}>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='renameModalLabel'>
                Rename Badge
              </h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => closeModal(renameModalRef)}></button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='mb-3'>
                  <label htmlFor='renameBadgeName' className='form-label'>
                    New Badge Name
                  </label>
                  <input type='text' className='form-control' id='renameBadgeName' value={newBadgeName} onChange={(e) => setNewBadgeName(e.target.value)} />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' onClick={() => closeModal(renameModalRef)}>
                Close
              </button>
              <button type='button' className='btn btn-primary' onClick={handleRenameBadge} disabled={loading}>
                {loading && <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>}
                Rename
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
