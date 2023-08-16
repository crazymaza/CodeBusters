import { Router } from 'express'
import { TopicController } from '../controller'
import { CommentController } from '../../comment'
import { checkUserAuth } from '../../../middlewares/checkUser'

export const topicRouter = (router: Router) => {
  const routes: Router = Router()
  const topicController = new TopicController()
  const commentController = new CommentController()

  routes
    .get('/comments/:topicId', commentController.getAllTopicComments)
    .get('/', topicController.getAllTopics)
    .get('/top', topicController.getTopTopics)
    .post('/', topicController.addTopic)
    .delete('/:topicId', topicController.deleteTopic)

  router.use('/topic', [checkUserAuth], routes)
}
