import BaseApi from '../Base'

export interface SigninData {
  login: string
  password: string
}

export interface SignupData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface UserInfo {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

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
