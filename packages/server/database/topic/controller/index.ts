import { TopicService } from '../service'
import { Request, Response } from 'express'

const topicService = new TopicService()

export class TopicController {
  public async getAllTopics(_req: Request, res: Response) {
    try {
      const topics = await topicService.getAllTopics()
      if (topics) {
        res.status(200).json(topics)
      } else {
        res.status(500)
        res.json({ error: 'Failed to get list of topics' })
      }
    } catch (err) {
      res.status(500)
      res.json({ error: (err as Error).message })
    }
  }

  public async getTopic(req: Request, res: Response) {
    const { topicId } = req.params

    try {
      const topic = await topicService.getTopic(Number(topicId))
      if (topic) {
        res.status(200).json(topic)
      } else {
        res.status(500)
        res.json({ error: 'Failed to get topic' })
      }
    } catch (err) {
      res.status(500)
      res.json({ error: (err as Error).message })
    }
  }

  public async addTopic(req: Request, res: Response) {
    const { body } = req
    const { user_id } = res.locals

    try {
      const newTopic = await topicService.addTopic({ ...body, user_id })
      if (newTopic) {
        res.status(201).json(newTopic)
      } else {
        res.status(500)
        res.json({ error: 'Failed to add new topic' })
      }
    } catch (err) {
      res.status(500)
      res.json({ error: (err as Error).message })
    }
  }

  public async deleteTopic(req: Request, res: Response) {
    const { topicId } = req.params

    try {
      const newTopic = await topicService.deleteTopic(Number(topicId))
      if (newTopic) {
        res.status(204).json({ message: 'Topic deleted successfully' })
      } else {
        res.status(500)
        res.json({ error: 'Failed to delete topic' })
      }
    } catch (err) {
      res.status(500)
      res.json({ error: (err as Error).message })
    }
  }
}
