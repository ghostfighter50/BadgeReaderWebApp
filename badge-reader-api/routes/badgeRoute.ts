import express from 'express'
import { badgeController } from '../controllers/badgeController'
import { isAuthenticated } from '../middlewares/authMiddleware'

/**
 * Express router for badge-related routes.
 * @type {express.Router}
 */
const router = express.Router()

/**
 * Route for getting all badges.
 * @name GET /api/badges
 * @function
 * @middleware {Function} isAuthenticated - Middleware for checking admin authentication.
 * @controller {Function} getAllBadges - Controller for getting all badges.
 */
router.get('/', isAuthenticated, badgeController.getAllBadges)

/**
 * Route for getting a badge by ID.
 * @name GET /api/badges/:id
 * @function
 * @middleware {Function} isAuthenticated - Middleware for checking admin authentication.
 * @controller {Function} getBadgeById - Controller for getting a badge by ID.
 */
router.get('/:id', isAuthenticated, badgeController.getBadgeById)

/**
 * Route for creating a new badge.
 * @name POST /api/badges
 * @function
 * @middleware {Function} isAuthenticated - Middleware for checking admin authentication.
 * @controller {Function} createBadge - Controller for creating a new badge.
 */
router.post('/', isAuthenticated, badgeController.createBadge)

/**
 * Route for deleting all badges.
 * @name DELETE /api/badges
 * @function
 * @middleware {Function} isAuthenticated - Middleware for checking admin authentication.
 * @controller {Function} deleteAllBadges - Controller for deleting all badges.
 */
router.delete('/', isAuthenticated, badgeController.deleteAllBadges)

/**
 * Route for deleting a badge by ID.
 * @name DELETE /api/badges/:id
 * @function
 * @middleware {Function} isAuthenticated - Middleware for checking admin authentication.
 * @controller {Function} deleteBadgeById - Controller for deleting a badge by ID.
 */
router.delete('/:id', isAuthenticated, badgeController.deleteBadgeById)

/**
 * Route for modifying a badge by ID.
 * @name PUT /badges/:id
 * @function
 * @middleware {Function} isAuthenticated - Middleware for checking admin authentication.
 * @controller {Function} modifyBadge - Controller for modifying a badge by ID.
 */
router.put('/:id', isAuthenticated, badgeController.modifyBadge)

export default router
