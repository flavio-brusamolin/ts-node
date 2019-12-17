import { body } from 'express-validator'

export default {
  authenticate: [
    body('email')
      .notEmpty().withMessage('Email is a required field')
      .isEmail().withMessage('Invalid email'),

    body('password')
      .notEmpty().withMessage('Password is a required field')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ]
}
