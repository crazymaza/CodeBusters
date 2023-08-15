import { Router } from 'express'
import { TopicController } from '../controller'
import { CommentController } from '../../comment'

export const topicRouter = (router: Router) => {
  const routes: Router = Router()
  const topicController = new TopicController()
  const commentController = new CommentController()

  routes
    .get('/comments', commentController.getAllTopicComments)
    .get('/', topicController.getAllTopics)
    .get('/top', topicController.getTopTopics)
    .post('/', topicController.addTopic)
    .delete('/', topicController.deleteTopic)

  router.use('/topic', routes)
}
