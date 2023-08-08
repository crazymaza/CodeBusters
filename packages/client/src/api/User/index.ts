import { BaseApi } from '@/api'
import {
  ChangePasswordRequest,
  SigninData,
  SignupData,
  UserInfo,
  UserAuthOptions,
  UserUpdateModel,
  OAuthRequestParams,
  OAuthRequestServiceParams,
  OAuthResponseService,
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

  fetchServiceId(params: OAuthRequestServiceParams) {
    return this.request.get<OAuthResponseService>(
      `/oauth/yandex/service-id?redirect_uri=${params.redirect_uri}`
    )
  }

  postToAccess(params: OAuthRequestParams) {
    return this.request.post('/oauth/yandex', params)
  }
}

export default UserApi
