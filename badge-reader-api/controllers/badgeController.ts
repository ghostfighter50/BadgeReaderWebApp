import { Request, Response } from 'express'
import BadgeModel, { IBadge } from '../models/badgeModel'
import adminCredentials from '../config/admin.json'

/**
 * Controller for handling badge-related operations.
 * @class
 */
export class badgeController {
  /**
   * Handles errors and sends an internal server error response.B
   * @param {Response} res - Express response object.
   * @param {string} errorMessage - Custom error message.
   */
  private static handleServerError (res: Response, errorMessage: string = 'Internal Server Error'): void {
    res.status(500).json({ success: false, message: errorMessage })
  }

  /**
   * Get all badges.
   * @method
   * @static
   * @async
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  public static async getAllBadges (req: Request, res: Response): Promise<void> {
    try {
      const badges = await BadgeModel.find()
      res.json({
        success: true,
        message: 'Badges retrieved successfully',
        data: badges
      })
    } catch (error: any) {
      badgeController.handleServerError(res, 'Error retrieving badges')
    }
  }

  /**
   * Get badge by ID.
   * @method
   * @static
   * @async
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  public static async getBadgeById (req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const badge = await BadgeModel.findOne({ badgeId: id })
      if (badge) {
        res.json({
          success: true,
          message: 'Badge retrieved successfully',
          data: badge
        })
      } else {
        res.status(404).json({ success: false, message: 'Badge not found' })
      }
    } catch (error: any) {
      badgeController.handleServerError(res, `Error retrieving badge with ID: ${id}`)
    }
  }

  /**
   * Create a new badge.
   * @method
   * @static
   * @async
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  public static async createBadge (req: Request, res: Response): Promise<void> {
    const { badgeId, name } = req.body

    try {
      const existingBadge = await BadgeModel.findOne({ badgeId })

      if (existingBadge) {
        res.status(400).json({
          success: false,
          message: 'Badge with the given ID already exists'
        })
        return
      }

      const newBadge = new BadgeModel({
        badgeId,
        name,
        lastScanned: null,
        isScanned: false
      } as IBadge)

      const createdBadge = await newBadge.save()
      res.status(201).json({
        success: true,
        message: 'Badge created successfully',
        data: createdBadge
      })
    } catch (error: any) {
      badgeController.handleServerError(res, 'Error creating badge')
    }
  }

  /**
   * Delete all badges.
   * @method
   * @static
   * @async
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  public static async deleteAllBadges (req: Request, res: Response): Promise<void> {
    try {
      await BadgeModel.deleteMany({ isAdmin: false })
      res.json({ success: true, message: 'All badges deleted successfully' })
    } catch (error: any) {
      badgeController.handleServerError(res, 'Error deleting all badges')
    }
  }

  /**
   * Delete badge by ID.
   * @method
   * @static
   * @async
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  public static async deleteBadgeById (req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const deletedBadge = await BadgeModel.findOneAndDelete({ badgeId: id })
      if (deletedBadge?.badgeId === adminCredentials.adminBadgeId) {
        res.json({
          success: false,
          message: 'Cannot delete the administrator account'
        })
      } else if (deletedBadge) {
        res.json({ success: true, message: 'Badge deleted successfully' })
      } else {
        res.status(404).json({ success: false, message: 'Badge not found' })
      }
    } catch (error: any) {
      badgeController.handleServerError(res, `Error deleting badge with ID: ${id}`)
    }
  }

  /**
   * Modify badge by ID.
   * @method
   * @static
   * @async
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  public static async modifyBadge (req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const { name } = req.body
    try {
      const badge: any = await BadgeModel.findOne({ badgeId: id })
      if (!badge) {
        res.status(404).json({ success: false, message: 'Badge not found' })
      }
      badge.name = name
      const updatedBadge = await badge.save()
      res.json({
        success: true,
        message: 'Badge modified successfully',
        data: updatedBadge
      })
    } catch (error: any) {
      badgeController.handleServerError(res, `Error modifying badge with ID: ${id}`)
    }
  }
}
