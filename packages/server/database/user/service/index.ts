import User, { IUser } from '../model'

class UserService {
  public async addUser(user: IUser) {
    return User.create({
      displayName: user.displayName,
      firstName: user.firstName,
    })
  }
}

export default UserService
