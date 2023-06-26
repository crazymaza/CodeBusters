import BaseApi from '../Base'
import { ChangePasswordRequest, UserRequest } from './types'

class UserApi extends BaseApi {
  constructor() {
    super({
      baseURL: 'https://ya-praktikum.tech/api/v2/user',
      withCredentials: true,
    })
  }

  public changeUserAvatar(data: FormData) {
    return this.request.put('/profile/avatar', data)
  }

  public changeUserPassword(data: ChangePasswordRequest) {
    return this.request.put('/password', data)
  }

  public changeUserInfo(data: UserRequest) {
    return this.request.put('/profile', data)
  }
}

export default new UserApi()
