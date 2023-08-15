import { topicRouter } from '../topic'
import { commentRouter } from '../comment'
import express from 'express'
import { reactionRouter } from '../reaction'
import { userRouter } from '../user'

export const apiRouter = express.Router()

topicRouter(apiRouter)
commentRouter(apiRouter)
reactionRouter(apiRouter)
userRouter(apiRouter)
