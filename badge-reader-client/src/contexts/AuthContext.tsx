import React, { createContext, useContext, useState, ReactNode } from 'react'
import axios from 'axios'
import apiConfig from '../config/api.json'

/**
 * Defines the structure of the authentication context.
 * @interface AuthContextProps
 */
interface AuthContextProps {
  authToken: string | null
  loginAdmin: (token: string) => void
  logoutAdmin: () => void
  checkAuth: () => Promise<boolean | undefined>
}

// Create an authentication context
const AuthContext = createContext<AuthContextProps | undefined>(undefined)

/**
 * AuthProvider is a React component that provides authentication context to its children.
 * It manages the authentication token state and provides functions for login, logout, and checking authentication status.
 * @param {Object} props - The properties of the AuthProvider component.
 * @param {ReactNode} props.children - The children elements that will have access to the authentication context.
 * @returns {JSX.Element} - Rendered React element.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to manage the authentication token
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('token')
  })

  /**
   * Logs in the admin by setting the authentication token in local storage and state.
   * @param {string} token - The authentication token to set.
   */
  const loginAdmin = async (token: string) => {
    localStorage.setItem('token', token)
    setAuthToken(token)
  }

  /**
   * Logs out the admin by removing the authentication token from local storage and state.
   */
  const logoutAdmin = async () => {
    localStorage.removeItem('token')
    setAuthToken(null)
  }

  /**
   * Checks the authentication status by sending a request to the server with the current authentication token.
   */
  const checkAuth = async () => {
    try {
      const response = await axios.get(`http://${apiConfig.host}:${apiConfig.port}/api/admin/checkAuth`, {
        headers: {
          auth: authToken
        }
      })

      return response.data.success
    } catch (error: any) {
      // Return false if there's an error during the authentication check
      return false
    }
  }

  // Provide the authentication context to the children
  return <AuthContext.Provider value={{ authToken, loginAdmin, logoutAdmin, checkAuth }}>{children}</AuthContext.Provider>
}

/**
 * useAuth is a custom hook that retrieves the authentication context.
 * @returns {AuthContextProps} - The authentication context.
 * @throws {Error} - Throws an error if used outside of an AuthProvider.
 */
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
