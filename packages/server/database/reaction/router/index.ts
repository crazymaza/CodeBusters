import { Router } from 'express'
import { ReactionController } from '../controller'

export const reactionRouter = (router: Router) => {
  const routes: Router = Router()
  const reactionController = new ReactionController()

  routes
    .post('/', reactionController.addReaction)
    .get('/', reactionController.getCommentReaction)
    .delete('/', reactionController.deleteReaction)

  router.use('/reaction', routes)
}
