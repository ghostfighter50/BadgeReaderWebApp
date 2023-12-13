import { wss } from '../server'
import { WebSocket } from 'ws'
import { Request, Response } from 'express'
import BadgeModel from '../models/badgeModel'
import adminCredentials from '../config/admin.json'

/**
 * Controller for handling badge scanning.
 * @class
 */
export class scanController {
  /**
   * Handles errors and sends an appropriate response.
   * @param {Response} res - Express response object.
   * @param {number} statusCode - HTTP status code.
   * @param {string} errorMessage - Custom error message.
   */
  private static handleServerError (res: Response, statusCode: number, errorMessage: string): void {
    console.error(`[X] Error during badge scanning: ${errorMessage}`)
    res.status(statusCode).json({ success: false, message: errorMessage })
  }

  /**
   * Scan a badge by ID.
   * @method
   * @static
   * @async
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  static async scanBadge (req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      // Check if the badge ID is empty
      if (!id) {
        scanController.handleServerError(res, 400, 'Badge ID is required.')
        return
      }

      const scannedBadge = await BadgeModel.findOne({ badgeId: id })

      // Check if the badge ID matches the admin badge ID
      if (id === adminCredentials.adminBadgeId) {
        const messageType = scannedBadge ? 'adminBadgeScanned' : 'badgeScanned'
        const responseData = {
          type: messageType,
          data: scannedBadge,
          success: !!scannedBadge
        }

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(responseData))
          }
        })

        // Toggle the isScanned property
        if (scannedBadge) {
          scannedBadge.isScanned = !scannedBadge.isScanned
          scannedBadge.lastScanned = new Date()
          await scannedBadge.save()
        }

        res.json({
          success: true,
          message: 'Badge scanned successfully',
          data: scannedBadge
        })
      } else {
        if (scannedBadge) {
          scannedBadge.isScanned = !scannedBadge.isScanned
          scannedBadge.lastScanned = new Date()
          await scannedBadge.save()

          const responseData = {
            type: 'badgeScanned',
            data: scannedBadge,
            success: true
          }

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(responseData))
            }
          })

          res.json({
            success: true,
            message: 'Badge scanned successfully',
            data: scannedBadge
          })
        } else {
          const responseData = {
            type: 'badgeScanned',
            data: {},
            success: false
          }

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(responseData))
            }
          })

          scanController.handleServerError(res, 404, 'Badge not found')
        }
      }
    } catch (error: any) {
      scanController.handleServerError(res, error.statusCode || 500, error.message)
    }
  }
}
