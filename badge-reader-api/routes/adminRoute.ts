import express from 'express'
import { isAuthenticated } from '../middlewares/authMiddleware'
import { adminController } from '../controllers/adminController'

/**
 * Express router for admin-related routes.
 * @type {express.Router}
 */
const router = express.Router()

/**
 * Route for handling admin login.
 * @name POST /api/admin/
 * @function
 * @controller {Function} adminLogin - Controller handling admin login.
 */
router.post('/', adminController.adminLogin)

/**
 * Route for checking authentication.
 * @name GET /admin/checkAuth
 * @function
 * @middleware {Function} isAuthenticated - Middleware for checking admin authentication.
 * @controller {Function} adminCheckAuth - Controller handling the auth verification.
 */
router.get('/checkAuth', isAuthenticated, adminController.adminCheckAuth)

export default router
