import { BaseApi } from '@/api'
import { ThemeResponse, ThemeSetRequestParams } from './types'

const isDev = import.meta.env.MODE === 'development'

const serverPort = import.meta.env.VITE_SERVER_PORT

const baseUri = isDev
  ? import.meta.env.VITE_SERVER_URL_DEV
  : import.meta.env.VITE_SERVER_URL_PROD

const baseURL = `${baseUri}:${serverPort}/api/theme`

export default class ThemeApi extends BaseApi {
  constructor(cookie?: string) {
    super({
      baseURL,
      withCredentials: true,
      headers: {
        cookie,
      },
    })
  }

  get() {
    return this.request.get<ThemeResponse>(``).then(response => response.data)
  }

  set(params: ThemeSetRequestParams) {
    return this.request.post('', params).then(response => response.data)
  }
}
