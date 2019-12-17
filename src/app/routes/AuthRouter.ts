import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import Validator from '../middlewares/Validator'

class AuthRouter {
  public routes: Router
  private endpoint = '/auth'

  public constructor () {
    this.routes = Router()
    this.setRoutes()
  }

  private setRoutes (): void {
    this.routes.post(this.endpoint,
      Validator.applyRules(this.endpoint, 'authenticate'),
      Validator.validate,
      AuthController.authenticate)
  }
}

export default new AuthRouter().routes
