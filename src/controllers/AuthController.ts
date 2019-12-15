import { Request, Response } from 'express'
import User from '../models/User'
import AuthService from '../services/AuthService'

class AuthController {
  public async authenticate (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const user = await User.findOne({ email, password })
    if (!user) {
      return res.status(401).json({
        success: false,
        errors: [{
          title: 'Authentication failed',
          message: 'Incorret email or password'
        }]
      })
    }

    const token = AuthService.generateToken(user.id, user.role)

    return res.status(200).json({
      success: true,
      token
    })
  }
}

export default new AuthController()
