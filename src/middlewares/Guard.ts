import { Request, Response, NextFunction, RequestHandler } from 'express'
import { verify, VerifyErrors } from 'jsonwebtoken'

interface DecodedToken {
  id: string,
  role: string
}

interface RequestWrapper extends Request {
  decoded: DecodedToken
}

class Guard {
  public verifyToken (req: RequestWrapper, res: Response, next: NextFunction): Response|void {
    let token = String(req.headers['x-access-token'] || req.headers.authorization)

    if (!token) {
      return res.status(401).json({
        success: false,
        errors: [{
          title: 'Authentication failed',
          message: 'No token provided'
        }]
      })
    }

    if (token.startsWith('Bearer ')) {
      [, token] = token.split(' ')
    }

    verify(token, process.env.PRIVATE_KEY, (err: VerifyErrors, decoded: DecodedToken) => {
      if (err) {
        return res.status(401).json({
          success: false,
          errors: [{
            title: 'Authentication failed',
            message: 'Unable to validate token'
          }]
        })
      }

      req.decoded = decoded
      return next()
    })
  }

  public checkPermission (expectedRole: string): RequestHandler {
    return function (req: RequestWrapper, res: Response, next: NextFunction): Response|void {
      const { role } = req.decoded

      if (role !== expectedRole) {
        return res.status(403).json({
          success: false,
          errors: [{
            title: 'Authorization failed',
            message: 'Permission denied'
          }]
        })
      }

      return next()
    }
  }
}

export default new Guard()
