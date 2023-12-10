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
        res.status(400).json({ success: false, message: 'Badge ID is required.' })
        return
      }

      const scannedBadge = await BadgeModel.findOneAndUpdate(
        { badgeId: id },
        { lastScanned: new Date(), isScanned: true },
        { new: true }
      )

      // Check if the badge ID matches the admin badge ID
      if (id === adminCredentials.adminBadgeId) {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'adminBadgeScanned', data: scannedBadge, success: true }))
          }
        })
        res.json({ success: true, message: 'Badge scanned successfully' })
        return
      }

      if (scannedBadge) {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'badgeScanned', data: scannedBadge, success: true }))
          }
        })
        res.json({ success: true, message: 'Badge scanned successfully' })
      } else {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'badgeScanned', data: {}, success: false }))
          }
        })
        res.status(404).json({ success: false, message: 'Badge not found' })
      }
    } catch (error: any) {
      console.error(error)
      res.status(error.statusCode || 500).json({ success: false, message: error.message })
    }
  }
}
