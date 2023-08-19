import { IUser, User } from '../model'

export class UserService {
  public async addUser({
    avatar,
    displayName,
    firstName,
    secondName,
    id,
  }: IUser) {
    return User.upsert({
      displayName,
      firstName,
      avatar,
      secondName,
      id,
    })
  }

  public async getUser(userId: number) {
    return User.findByPk(userId)
  }
}
