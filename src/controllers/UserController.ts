import { Request, Response } from 'express'
import User from '../models/User'

class UserController {
  public async list (req: Request, res: Response): Promise<Response> {
    const users = await User.find().select('-password')

    return res.status(200).json({
      success: true,
      users
    })
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { name, email, password, role } = req.body

    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User email already exists'
      })
    }

    await User.create({
      name,
      email,
      password,
      role
    })

    return res.status(201).json({
      success: true,
      message: 'Successful registration'
    })
  }

  // public async delete (req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params

  //   // validate id

  //   const user = await User.findByIdAndDelete(id)
  //   if (!user) {
  //     return res.status(400).json({
  //       success: false,
  //       message: 'User not found'
  //     })
  //   }

  //   return res.status(200).json({
  //     success: true,
  //     message: 'Successful deletion'
  //   })
  // }

  // public async update (req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params
  //   const { name, email, password, role } = req.body

  //   // validate id and params

  //   if (await User.findOne({ email })) {
  //     return res.status(400).json({
  //       success: false,
  //       message: 'User email already exists'
  //     })
  //   }

  //   const user = await User.findByIdAndUpdate(id, {
  //     name,
  //     email,
  //     password,
  //     role
  //   })

  //   if (!user) {
  //     return res.status(400).json({
  //       success: false,
  //       message: 'User not found'
  //     })
  //   }

  //   return res.status(200).json({
  //     success: true,
  //     message: 'Successful update'
  //   })
  // }
}

export default new UserController()
