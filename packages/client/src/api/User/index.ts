import { BaseApi } from '@/api'
import {
  ChangePasswordRequest,
  SigninData,
  SignupData,
  UserInfo,
  UserUpdateModel,
  OAuthRequestParams,
  OAuthResponseService,
} from './types'

const oauthUrl = 'https://oauth.yandex.ru/authorize'

const yandexUrl = 'https://ya-praktikum.tech/api/v2'

const baseURL = `/api/v2`

class UserApi extends BaseApi {
  constructor(cookie?: string) {
    super({
      baseURL,
      // baseURL: yandexUrl,
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
      .get<UserInfo>('/auth/user', {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      })
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

  fetchServiceId() {
    return this.request.get<OAuthResponseService>(
      `/oauth/yandex/service-id?redirect_uri=${window.location.origin}`
    )
  }

  postToAccess(params: OAuthRequestParams) {
    return this.request.post(
      '/oauth/yandex',
      { ...params, redirect_uri: `${window.location.origin}` },
      {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      }
    )
  }

  redirectToOauthYandexPage(serviceId: string) {
    window.location.replace(
      `${oauthUrl}?response_type=code&client_id=${serviceId}&redirect_uri=${window.location.origin}`
    )
  }
}

export default UserApi
