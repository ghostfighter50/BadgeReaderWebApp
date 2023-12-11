import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import adminCredentials from '../config/admin.json'
import jwtConfig from '../config/jwt.json'

/**
 * Controller for handling admin-related operations.
 * @class
 */
export class adminController {
  /**
   * Admin login.
   * @method
   * @static
   * @async
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  public static async adminLogin (req: Request, res: Response): Promise<void> {
    try {
      if (
        req.body.badgeId === adminCredentials.adminBadgeId &&
        req.body.password === adminCredentials.password
      ) {
        const token = jwt.sign({ isAdmin: true }, jwtConfig.secret, { expiresIn: '1h' })
        res.json({ success: true, message: 'Admin logged in successfully', token })
      } else {
        res.status(401).json({ success: false, message: 'Authentication failed' })
      }
    } catch (error: any) {
      console.error('[X] Error during admin login:', error.message)
      res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  }

  /**
   * Check admin authentication.
   * @method
   * @static
   * @async
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  public static async adminCheckAuth (req: Request, res: Response): Promise<void> {
    try {
      res.json({ success: true, message: 'Admin is authenticated' })
    } catch (error: any) {
      res.status(500).json({ success: false, message: 'Admin is not authenticated' })
    }
  }
}
