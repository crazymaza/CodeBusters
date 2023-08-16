import { Router } from 'express'
import { ReactionController } from '../controller'
import { checkUserAuth } from '../../../middlewares/checkUser'

export const reactionRouter = (router: Router) => {
  const routes: Router = Router()
  const reactionController = new ReactionController()

  routes
    .post('/', reactionController.addReaction)
    .get('/:reactionId', reactionController.getCommentReaction)
    .delete('/:reactionId', reactionController.deleteReaction)

  router.use('/reaction', [checkUserAuth], routes)
}
