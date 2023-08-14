import { BaseApi } from '@/api'
import {
  ChangePasswordRequest,
  SigninData,
  SignupData,
  UserInfo,
  UserUpdateModel,
  OAuthRequestParams,
  OAuthRequestServiceParams,
  OAuthResponseService,
} from './types'

const isDev = import.meta.env.MODE === 'development'

const yandexApiPath = import.meta.env.VITE_YANDEX_API_PATH

const clientPort = import.meta.env.VITE_CLIENT_PORT

const serverPort = import.meta.env.VITE_SERVER_PORT

const oauthUrl = import.meta.env.VITE_OAUTH_URL

const baseUri = isDev
  ? import.meta.env.VITE_SERVER_URL_DEV
  : import.meta.env.VITE_SERVER_URL_PROD

class UserApi extends BaseApi {
  constructor(cookie?: string) {
    super({
      baseURL: `${baseUri}:${serverPort}/${yandexApiPath}`,
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
      `/service-id?redirect_uri=${params.redirect_uri}:${clientPort}`
    )
  }

  postToAccess(params: OAuthRequestParams) {
    return this.request.post('/oauth/yandex', JSON.stringify(params), {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    })
  }

  redirectToOauthYandexPage(serviceId: string) {
    window.location.replace(
      `${oauthUrl}?response_type=code&client_id=${serviceId}&redirect_uri=${baseUri}:${clientPort}`
    )
  }
}

export default UserApi
