import { Request, Response, NextFunction } from 'express'
import axios from 'axios'

export const checkUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.headers['cookie'])
    const { data } = await axios.get(
      'https://ya-praktikum.tech/api/v2/auth/user',
      {
        headers: {
          cookie: req.headers['cookie'] || '',
        },
      }
    )
    next()
  } catch (error) {
    res.statusCode = 403
    console.log(error)
    next(new Error('User not authorized'))
  }
}
