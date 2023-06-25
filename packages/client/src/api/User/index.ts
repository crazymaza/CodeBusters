import BaseApi from '../Base'

class UserApi extends BaseApi {
  public changeUserAvatar(data: FormData) {
    return this.request.put('', data)
  }
}

export default new UserApi()
