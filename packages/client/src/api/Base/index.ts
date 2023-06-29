import http, { HTTPOptions } from '@/utils/http'

// TODO Создан для примера, необходимо дополнить/изменить
export default class BaseApi {
  public request: ReturnType<typeof http>

  constructor(options: HTTPOptions = {}) {
    this.request = http(options)
  }
}
