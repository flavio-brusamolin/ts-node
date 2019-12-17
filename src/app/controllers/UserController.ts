import { Request, Response } from 'express'
import { hash } from 'bcrypt'
import User from '../models/User'
import UserInterface from '../utils/interfaces/UserInterface'

class UserController {
  public async list (req: Request, res: Response): Promise<Response> {
    const users = await User.find()
      .select('-password')
      .sort({ _id: -1 })

    return res.status(200).json({
      success: true,
      users
    })
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { name, email, password, role } = req.body

    const user: UserInterface = {
      name,
      email,
      password: await hash(password, 12),
      role
    }

    try {
      await User.create(user)

      return res.status(201).json({
        success: true,
        message: 'Successful registration'
      })
    } catch (error) {
      return res.status(400).json({
        success: false,
        errors: [{
          title: 'Email validation failed',
          message: 'User email already exists'
        }]
      })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email, password, role } = req.body

    const user: UserInterface = {}
    if (email) user.email = email
    if (name) user.name = name
    if (password) user.password = await hash(password, 12)
    if (role) user.role = role

    try {
      const result = await User.findByIdAndUpdate(id, user)
      if (!result) {
        return res.status(400).json({
          success: false,
          errors: [{
            title: 'Id validation failed',
            message: 'User id not found'
          }]
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Successful update'
      })
    } catch (error) {
      return res.status(400).json({
        success: false,
        errors: [{
          title: 'Email validation failed',
          message: 'User email already exists'
        }]
      })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const result = await User.findByIdAndDelete(id)
    if (!result) {
      return res.status(400).json({
        success: false,
        errors: [{
          title: 'Id validation failed',
          message: 'User id not found'
        }]
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Successful deletion'
    })
  }
}

export default new UserController()
