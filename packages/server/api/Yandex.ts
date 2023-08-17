import axios from 'axios'

const API_ROOT = process.env.VITE_BASE_YANDEX_API_URL //'https://ya-praktikum.tech/api/v2/'

export default class YandexAPI {
  constructor(private _cookieHeader: string | undefined) {}

  async getCurrent(): Promise<any> {
    const { data } = await axios.get(`${API_ROOT}/auth/user`, {
      headers: {
        cookie: this._cookieHeader,
      },
    })
    return {
      ...data,
    }
  }
}
