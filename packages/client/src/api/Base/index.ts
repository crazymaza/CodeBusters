import http, { HTTPOptions } from '@/utils/http'

const baseURL = import.meta.env.VITE_BASE_YANDEX_API_URL

// TODO Создан для примера, необходимо дополнить/изменить
export default class BaseApi {
  public request: ReturnType<typeof http>

  constructor(options: HTTPOptions = {}) {
    this.request = http({
      baseURL,
      ...options,

      withCredentials: true,
    })
  }
}
