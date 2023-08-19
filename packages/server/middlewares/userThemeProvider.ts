import { Request, Response, NextFunction } from 'express'
import { YandexApi } from '../api'

const userThemeProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const yandexApi = new YandexApi(req.headers['cookie'])

    const user = await yandexApi.getCurrent()

    res.locals.userId = user.id

    next()
  } catch (error) {
    res.statusCode = 404

    console.log('Error from theme', error)

    next(new Error('Theme not found'))
  }
}

export default userThemeProvider
