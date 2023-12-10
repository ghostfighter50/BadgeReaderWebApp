import express from 'express'
import { scanController } from '../controllers/scanController'

/**
 * Express router for scan-related routes.
 * @type {express.Router}
 */
const router = express.Router()

/**
 * Route for scanning a badge by ID.
 * @name GET /api/scan/:id
 * @function
 * @param {string} id - The ID of the badge to be scanned.
 */
router.get('/:id', scanController.scanBadge)

/**
 * Exporting the scan router.
 * @type {express.Router}
 */
export default router
