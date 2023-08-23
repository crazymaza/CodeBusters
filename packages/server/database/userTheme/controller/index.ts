import { UserTheme } from '../model'
import type { Request, Response } from 'express'
import { themeService } from '../service'

export class ThemeController {
  public async get(req: Request, res: Response) {
    const { userId } = res.locals

    if (userId) {
      try {
        const userTheme: UserTheme | null = await themeService.find(+userId)

        if (!userTheme) {
          return res
            .status(404)
            .json('There is no theme in database for this user')
        }

        return res.json({
          theme: userTheme?.theme?.theme,
        })
      } catch (e) {
        return res.status(404).json({ error: (e as Error).message })
      }
    }

    return res.status(400).json('Access is denied!')
  }

  public async update(req: Request, res: Response) {
    const { themeName } = req.body
    const { userId } = res.locals

    try {
      await themeService.upsert({ userId, themeName })
      res.json({ message: 'Theme was updated' })
    } catch (e) {
      res.status(404).json({ error: (e as Error).message })
    }
  }
}
