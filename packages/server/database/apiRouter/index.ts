import { topicRouter } from '../topic'
import { commentRouter } from '../comment'
import express from 'express'

export const apiRouter = express.Router()

apiRouter.use(commentRouter).use(topicRouter)
