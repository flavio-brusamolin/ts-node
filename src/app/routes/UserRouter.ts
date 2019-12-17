import { Router } from 'express'
import UserController from '../controllers/UserController'
import Guard from '../middlewares/Guard'
import Validator from '../middlewares/Validator'

class UserRouter {
  public routes: Router
  private endpoint = '/users'

  public constructor () {
    this.routes = Router()
    this.setRoutes()
  }

  private setRoutes (): void {
    this.routes.get(this.endpoint,
      Guard.verifyToken,
      Guard.checkPermission('admin'),
      UserController.list)

    this.routes.post(this.endpoint,
      Guard.verifyToken,
      Guard.checkPermission('admin'),
      Validator.applyRules(this.endpoint, 'store'),
      Validator.validate,
      UserController.store)

    this.routes.put(`${this.endpoint}/:id`,
      Guard.verifyToken,
      Guard.checkPermission('admin'),
      Validator.applyRules(this.endpoint, 'update'),
      Validator.validate,
      UserController.update)

    this.routes.delete(`${this.endpoint}/:id`,
      Guard.verifyToken,
      Guard.checkPermission('admin'),
      Validator.applyRules(this.endpoint, 'delete'),
      Validator.validate,
      UserController.delete)
  }
}

export default new UserRouter().routes
