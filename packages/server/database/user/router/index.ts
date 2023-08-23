import { Router } from 'express'
import { UserController } from '../controller'

export const userRouter = (router: Router) => {
  const routes: Router = Router()
  const userController = new UserController()

  routes
    .post('/', userController.addUser)
    .get('/:userId', userController.getUser)

  router.use('/user', routes)
}
