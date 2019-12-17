import { ValidationChain } from 'express-validator'
import authRules from './validation-rules/authRules'
import userRules from './validation-rules/userRules'

class RulesManager {
  public getRules (endpoint: string, operation: string): Array<ValidationChain> {
    switch (endpoint) {
      case '/auth': return authRules[operation]
      case '/users': return userRules[operation]
    }
  }
}

export default new RulesManager()
