import http, { HTTPOptions } from '@/utils/http'

const baseURL = 'https://ya-praktikum.tech/api/v2'

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
