import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { UserService } from '../database/user'

export const checkUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data } = await axios.get(
      'https://ya-praktikum.tech/api/v2/auth/user',
      {
        headers: {
          cookie: req.headers['cookie'] || '',
        },
      }
    )
    const userService = new UserService()
    const user = await userService.getUser(data.id)
    if (!user) {
      await userService.addUser({
        avatar: data.avatar,
        displayName: data.display_name,
        firstName: data.first_name,
        id: data.id,
        secondName: data.second_name,
      })
    }
    next()
  } catch (error) {
    res.statusCode = 403
    console.log(error)
    next(new Error('User not authorized'))
  }
}
