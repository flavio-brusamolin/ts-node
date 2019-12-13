import { Request, Response } from 'express'
import User from '../models/User'

class UserController {
  public async list (req: Request, res: Response): Promise<Response> {
    const users = await User.find()

    return res.status(200).json({
      success: true,
      users
    })
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { email, firstName, lastName } = req.body

    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User email already exists'
      })
    }

    await User.create({
      email,
      firstName,
      lastName
    })

    return res.status(201).json({
      success: true,
      message: 'Successful registration'
    })
  }
}

export default new UserController()
