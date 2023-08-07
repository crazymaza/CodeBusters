import { BaseApi } from '@/api'
import {
  OAuthRequestParams,
  OAuthResponseService,
  OAuthRequestServiceParams,
} from './types'

const API_URL = import.meta.env.VITE_BASE_YANDEX_API_URL

class OAuthApi extends BaseApi {
  constructor() {
    super({
      baseURL: `${API_URL}/oauth/yandex`,
      withCredentials: true,
    })
  }

  fetchServiceId(params: OAuthRequestServiceParams) {
    return this.request.get<OAuthResponseService>(
      `/service-id?redirect_uri=${params.redirect_uri}`
    )
  }

  postToAccess(params: OAuthRequestParams) {
    return this.request.post('', params)
  }
}

export default OAuthApi
