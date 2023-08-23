import { ThemeController } from '../controller'
import { Router } from 'express'

export const themeApiRouter = Router()

export const themeRouter = (router: Router) => {
  const routes: Router = Router()
  const themeController = new ThemeController()

  routes.post('/', themeController.update).get('/', themeController.get)

  router.use('/', routes)
}

themeRouter(themeApiRouter)
