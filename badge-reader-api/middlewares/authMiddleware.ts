import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import jwtConfig from '../config/jwt.json'

interface IUser {
  isAdmin?: boolean
}

interface IRequest extends Request {
  user?: IUser
}

/**
 * Middleware to check user authentication using JWT.
 * @returns {void}
 */
export const isAuthenticated = (req: IRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.auth as string | undefined

  if (!token) {
    res.status(401).json({ message: 'Unauthorized - Token not provided' })
    return
  }

  try {
    const decodedToken: any = jwt.verify(token, jwtConfig.secret)

    req.user = decodedToken

    if (decodedToken.isAdmin) {
      return next()
    }

    res.status(401).json({ message: 'User is not an admin' })
  } catch (error: any) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
