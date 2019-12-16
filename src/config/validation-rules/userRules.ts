import { body, param } from 'express-validator'

export default {
  store: [
    body('name')
      .notEmpty().withMessage('Name is a required field'),

    body('email')
      .notEmpty().withMessage('Email is a required field')
      .isEmail().withMessage('Invalid email'),

    body('password')
      .notEmpty().withMessage('Password is a required field')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    body('role')
      .notEmpty().withMessage('Role is a required field')
      .isIn(['user', 'admin']).withMessage('Role must be admin or user')
  ],

  update: [
    param('id')
      .isMongoId().withMessage('Invalid Id'),

    body('name')
      .optional(),

    body('email')
      .optional()
      .isEmail().withMessage('Invalid email'),

    body('password')
      .optional()
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    body('role')
      .optional()
      .isIn(['user', 'admin']).withMessage('Role must be admin or user')
  ],

  delete: [
    param('id')
      .isMongoId().withMessage('Invalid Id')
  ]
}
