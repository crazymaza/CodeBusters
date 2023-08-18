import { UserService } from '../service'
import { Request, Response } from 'express'

const userService = new UserService()

export class UserController {
  public async getUser(req: Request, res: Response) {
    const { userId } = req.query

    try {
      const user = await userService.getUser(Number(userId))
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(500)
        res.json({ error: 'Failed to get user' })
      }
    } catch (err) {
      res.status(400)
      res.json({ error: (err as Error).message })
    }
  }

  public async addUser(req: Request, res: Response) {
    const { body } = req

    try {
      const newUser = await userService.addUser(body)
      if (newUser) {
        res.status(201).json(newUser)
      } else {
        res.status(500)
        res.json({ error: 'Failed to add new user' })
      }
    } catch (err) {
      res.status(400)
      res.json({ error: (err as Error).message })
    }
  }
}
