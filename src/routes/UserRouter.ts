import { Router } from 'express'
import Validator from '../middlewares/Validator'
import UserController from '../controllers/UserController'

class UserRouter {
  public routes: Router
  private endpoint = '/users'

  public constructor () {
    this.routes = Router()
    this.setRoutes()
  }

  private setRoutes (): void {
    this.routes.get(this.endpoint, UserController.list)
    this.routes.post(this.endpoint, Validator.applyRules(this.endpoint), Validator.validate, UserController.store)
    // this.routes.delete(`${this.endpoint}/:id`, UserController.delete)
  }
}

export default new UserRouter().routes
