import { CommentService } from '../service'
import { Request, Response } from 'express'

const commentService = new CommentService()

export class CommentController {
  public async getAllTopicCommnets(req: Request, res: Response) {
    const { topicId } = req.params

    try {
      const topics = await commentService.getAllTopicCommnets(Number(topicId))
      if (topics) {
        res.status(200).json(topics)
      } else {
        res.status(500)
        res.json({ error: 'Failed to get list of topic comments' })
      }
    } catch (err) {
      res.status(400)
      res.json({ error: (err as Error).message })
    }
  }

  public async addComment(req: Request, res: Response) {
    const { body } = req

    try {
      const newComment = await commentService.addComment(body)
      if (newComment) {
        res.status(201).json(newComment)
      } else {
        res.status(500)
        res.json({ error: 'Failed to add new comment' })
      }
    } catch (err) {
      res.status(400)
      res.json({ error: (err as Error).message })
    }
  }

  public async getComment(req: Request, res: Response) {
    const { commentId } = req.params

    try {
      const comment = await commentService.getComment(Number(commentId))
      if (comment) {
        res.status(200).json(comment)
      } else {
        res.status(500)
        res.json({ error: 'Failed to add new comment' })
      }
    } catch (err) {
      res.status(400)
      res.json({ error: (err as Error).message })
    }
  }
}
