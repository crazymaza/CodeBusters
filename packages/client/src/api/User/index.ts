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

const isDev = import.meta.env.MODE === 'development'

const yandexApiPath = import.meta.env.VITE_YANDEX_API_PATH

const clientPort = import.meta.env.VITE_CLIENT_PORT

const serverPort = import.meta.env.VITE_SERVER_PORT

const oauthUrl = import.meta.env.VITE_OAUTH_URL

const yandexUrl = import.meta.env.VITE_BASE_YANDEX_API_URL

const baseUri = isDev
  ? import.meta.env.VITE_SERVER_URL_DEV
  : import.meta.env.VITE_SERVER_URL_PROD

const baseURL = `${baseUri}:${serverPort}/${yandexApiPath}`

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
      `/oauth/yandex/service-id?redirect_uri=${baseUri}:${clientPort}`
    )
  }

  postToAccess(params: OAuthRequestParams) {
    return this.request.post(
      '/oauth/yandex',
      { ...params, redirect_uri: `${baseUri}:${clientPort}` },
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
      `${oauthUrl}?response_type=code&client_id=${serviceId}&redirect_uri=${baseUri}:${clientPort}`
    )
  }
}

export default UserApi
