import { BaseApi } from '@/api'
import { SigninData, SignupData, UserInfo } from './types'

class AuthApi extends BaseApi {
  constructor() {
    super({
      baseURL: 'https://ya-praktikum.tech/api/v2/auth',
      withCredentials: true,
    })
  }

  signin(data: SigninData) {
    return this.request.post('/signin', data)
  }

  signup(data: SignupData) {
    return this.request.post('/signup', data)
  }

  logout() {
    return this.request.post('/logout')
  }

  getUserInfo() {
    return this.request.get<UserInfo>('/user').then(response => response.data)
  }
}

export default new AuthApi()
