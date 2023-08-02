import { BaseApi } from '@/api'
import {
  ChangePasswordRequest,
  SigninData,
  SignupData,
  UserInfo,
  UserUpdateModel,
} from './types'

class UserApi extends BaseApi {
  constructor(cookie?: string) {
    super({
      baseURL: 'http://localhost:3001/api/v2',
      withCredentials: true,
      headers: {
        cookie,
      },
    })
  }

  signin(data: SigninData) {
    return this.request.post('/auth/signin', data)
  }

  signup(data: SignupData) {
    return this.request.post('/auth/signup', data)
  }

  logout() {
    return this.request.post('/auth/logout')
  }

  getUserInfo() {
    return this.request
      .get<UserInfo>('/auth/user')
      .then(response => response.data)
  }

  changeUserAvatar(data: FormData) {
    return this.request.put<UserInfo>('/user/profile/avatar', data)
  }

  changeUserPassword(data: ChangePasswordRequest) {
    return this.request.put('/user/password', data)
  }

  changeUserInfo(data: UserUpdateModel) {
    return this.request.put<UserInfo>('/user/profile', data)
  }
}

export default UserApi
