import { body, param, ValidationChain } from 'express-validator'

class RulesManager {
  public getRules (endpoint: string, operation: string): Array<ValidationChain> {
    switch (endpoint) {
      case '/users': return this.userRules(operation)
      case '/auth': return this.authRules(operation)
    }
  }

  private userRules (operation: string): Array<ValidationChain> {
    switch (operation) {
      case 'store':
        return [
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
        ]

      case 'update':
        return [
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
        ]

      case 'delete':
        return [
          param('id')
            .isMongoId().withMessage('Invalid Id')
        ]

      default:
        return []
    }
  }

  private authRules (operation: string): Array<ValidationChain> {
    switch (operation) {
      case 'authenticate':
        return [
          body('email')
            .notEmpty().withMessage('Email is a required field')
            .isEmail().withMessage('Invalid email'),

          body('password')
            .notEmpty().withMessage('Password is a required field')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        ]

      default:
        return []
    }
  }
}

export default new RulesManager()
