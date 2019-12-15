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
    this.routes.post(this.endpoint, Validator.applyRules(this.endpoint, 'store'), Validator.validate, UserController.store)
    this.routes.put(`${this.endpoint}/:id`, Validator.applyRules(this.endpoint, 'update'), Validator.validate, UserController.update)
    this.routes.delete(`${this.endpoint}/:id`, Validator.applyRules(this.endpoint, 'delete'), Validator.validate, UserController.delete)
  }
}

export default new UserRouter().routes
