import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import User from '../models/User'
import AuthService from '../services/AuthService'

class AuthController {
  private static defaultError = {
    success: false,
    errors: [{
      title: 'Authentication failed',
      message: 'Incorret email or password'
    }]
  }

  public async authenticate (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json(AuthController.defaultError)
    }

    const match = await compare(password, user.password)
    if (!match) {
      return res.status(401).json(AuthController.defaultError)
    }

    const token = AuthService.generateToken(user.id, user.role)

    return res.status(200).json({
      success: true,
      token
    })
  }
}

export default new AuthController()
