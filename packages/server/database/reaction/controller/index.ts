import { ReactionService } from '../service'
import { Request, Response } from 'express'

const reactionService = new ReactionService()

export class ReactionController {
  public async getCommentReaction(req: Request, res: Response) {
    const { commentId } = req.params
    try {
      const reactions = await reactionService.getCommentReactions(
        Number(commentId)
      )
      if (reactions) {
        res.status(200).json(reactions)
      } else {
        res.status(500)
        res.json({ error: 'Failed to get list of comment reactions' })
      }
    } catch (err) {
      res.status(400)
      res.json({ error: (err as Error).message })
    }
  }

  public async addReaction(req: Request, res: Response) {
    const { body } = req

    try {
      const reaction = await reactionService.addReaction(body)
      if (reaction) {
        res.status(201).json(reaction)
      } else {
        res.status(500)
        res.json({ error: 'Failed to add new reaction to comment' })
      }
    } catch (err) {
      res.status(400)
      res.json({ error: (err as Error).message })
    }
  }

  public async deleteReaction(req: Request, res: Response) {
    const { reactionId } = req.params

    try {
      const reaction = await reactionService.deleteReaction(Number(reactionId))
      if (reaction) {
        res.status(200).json({ message: 'Reaction deleted successfully' })
      } else {
        res.status(500)
        res.json({ error: 'Failed to add delete reaction' })
      }
    } catch (err) {
      res.status(400)
      res.json({ error: (err as Error).message })
    }
  }
}
