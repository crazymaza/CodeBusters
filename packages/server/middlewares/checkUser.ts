import { Request, Response, NextFunction } from 'express'
import { UserService } from '../database/user'
import { YandexApi } from '../api'

export const checkUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const yandexApi = new YandexApi(req.headers['cookie'])

    const userData = await yandexApi.getCurrent()

    const userService = new UserService()
    const user = await userService.getUser(userData.id)
    if (!user) {
      await userService.addUser({
        avatar: userData.avatar,
        displayName: userData.display_name,
        firstName: userData.first_name,
        id: userData.id,
        secondName: userData.second_name,
      })
    }

    res.locals.user_id = userData.id
    next()
  } catch (error) {
    res.statusCode = 403
    console.log(error)
    next(new Error('User not authorized'))
  }
}
