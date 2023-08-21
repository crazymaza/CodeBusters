import { CommentController } from '../controller'
import { Router } from 'express'
import { checkUserAuth } from '../../../middlewares/checkUser'

export const commentRouter = (router: Router) => {
  const routes: Router = Router()
  const commentController = new CommentController()

  routes
    .post('/', commentController.addComment)
    .get('/:commentId', commentController.getComment)

  router.use('/comment', [checkUserAuth], routes)
}
