import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Loading } from './Loading'
const PrivateRoutes = () => {
  const { checkAuth } = useAuth()
  const [authStatus, setAuthStatus] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const status = await checkAuth()
        setAuthStatus(status)
      } catch (error) {
        console.error('Error fetching auth status:', error)
        setAuthStatus(false)
      }
    }

    fetchAuthStatus()
  }, [checkAuth])

  if (authStatus === undefined) {
    return <Loading />
  }

  return authStatus ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoutes
