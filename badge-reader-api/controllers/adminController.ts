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
   * Handles errors and sends an internal server error response.
   * @param {Response} res - Express response object.
   * @param {string} errorMessage - Custom error message.
   */
  private static handleServerError (res: Response, errorMessage: string = 'Internal Server Error'): void {
    console.error(`[X] Error during admin operation: ${errorMessage}`)
    res.status(500).json({ success: false, message: errorMessage })
  }

  /**
   * Admin login.
   * @method
   * @static
   * @async
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  public static async adminLogin (req: Request, res: Response): Promise<void> {
    try {
      const { badgeId, password } = req.body
      if (badgeId === adminCredentials.adminBadgeId && password === adminCredentials.password) {
        const token = jwt.sign({ isAdmin: true }, jwtConfig.secret, {
          expiresIn: '1h'
        })
        res.json({
          success: true,
          message: 'Admin logged in successfully',
          token
        })
      } else {
        res.status(401).json({ success: false, message: 'Authentication failed' })
      }
    } catch (error: any) {
      adminController.handleServerError(res, 'Error during admin login')
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
      adminController.handleServerError(res, 'Error checking admin authentication')
    }
  }
}
