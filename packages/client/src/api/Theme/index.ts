import { BaseApi } from '@/api'
import { ThemeResponse, ThemeSetRequestParams } from './types'

const baseURL = `/api/theme`

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
