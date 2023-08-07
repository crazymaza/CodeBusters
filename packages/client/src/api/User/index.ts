import { BaseApi } from '@/api'
import {
  ChangePasswordRequest,
  SigninData,
  SignupData,
  UserInfo,
  UserAuthOptions,
  UserUpdateModel,
} from './types'

class UserApi extends BaseApi {
  constructor(cookie?: string) {
    super({
      baseURL: 'http://localhost:3000/api/v2',
      // baseURL: 'https://ya-praktikum.tech/api/v2',
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

  logout(options: UserAuthOptions) {
    const baseURL = options.isOauth
      ? import.meta.env.VITE_BASE_YANDEX_API_URL
      : undefined

    return this.request.post('/auth/logout', { baseURL })
  }

  getUserInfo(options: UserAuthOptions = {}) {
    const baseURL = options.isOauth
      ? import.meta.env.VITE_BASE_YANDEX_API_URL
      : undefined

    return this.request
      .get<UserInfo>('/auth/user', { baseURL })
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
