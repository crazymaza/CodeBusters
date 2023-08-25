import { CommentController } from '../controller'
import { Router } from 'express'

export const commentRouter = (router: Router) => {
  const routes: Router = Router()
  const commentController = new CommentController()

  routes
    .post('/', commentController.addComment)
    .get('/:commentId', commentController.getComment)

  router.use('/comment', routes)
}
