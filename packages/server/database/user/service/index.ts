import { IUser, User } from '../model'

export class UserService {
  public async addUser(user: IUser) {
    return User.create({
      displayName: user.displayName,
      firstName: user.firstName,
    })
  }

  public async getUser(userId: number) {
    return User.findOne({
      where: {
        id: userId,
      },
    })
  }
}
