import { body, param, ValidationChain } from 'express-validator'

class RulesManager {
  public getRules (endpoint: string, operation: string): Array<ValidationChain> {
    switch (endpoint) {
      case '/users': return this.userRules(operation)
    }
  }

  private userRules (operation: string): Array<ValidationChain> {
    switch (operation) {
      case 'store':
        return [
          body('name')
            .notEmpty().withMessage('Required field'),

          body('email')
            .notEmpty().withMessage('Required field')
            .isEmail().withMessage('Invalid e-mail'),

          body('password')
            .notEmpty().withMessage('Required field')
            .isLength({ min: 6 }).withMessage('Must be at least 6 characters'),

          body('role')
            .notEmpty().withMessage('Required field')
            .isIn(['user', 'admin']).withMessage('Must be admin or user')
        ]

      case 'update':
        return [
          param('id')
            .isMongoId().withMessage('Invalid Id'),

          body('name')
            .optional(),

          body('email')
            .optional()
            .isEmail().withMessage('Invalid e-mail'),

          body('password')
            .optional()
            .isLength({ min: 6 }).withMessage('Must be at least 6 characters'),

          body('role')
            .optional()
            .isIn(['user', 'admin']).withMessage('Must be admin or user')
        ]

      case 'delete':
        return [
          param('id')
            .isMongoId().withMessage('Invalid Id')
        ]
    }
  }
}

export default new RulesManager()
