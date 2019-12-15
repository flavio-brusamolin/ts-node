import { Request, Response, NextFunction } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import RulesManager from '../config/RulesManager'

class Validator {
  public applyRules (endpoint: string, operation: string): Array<ValidationChain> {
    return RulesManager.getRules(endpoint, operation)
  }

  public validate (req: Request, res: Response, next: NextFunction): Response|void {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }

    const prettyErrors: Array<object> = []
    errors.array().map(err => {
      prettyErrors.push({
        title: `Invalid value in '${err.param}' parameter in '${err.location}' location`,
        message: err.msg
      })
    })

    return res.status(400).json({
      success: false,
      errors: prettyErrors
    })
  }
}

export default new Validator()
