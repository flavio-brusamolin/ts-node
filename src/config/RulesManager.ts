import { body, ValidationChain } from 'express-validator'

class RulesManager {
  public getRules (endpoint: string): Array<ValidationChain> {
    switch (endpoint) {
      case '/users': return this.userRules()
    }
  }

  private userRules (): Array<ValidationChain> {
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
  }
}

export default new RulesManager()
