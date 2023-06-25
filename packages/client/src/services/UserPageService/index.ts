import { UserApi } from '@/api'

class UserPageService {
  public async changeUserAvatar(file: FileList) {
    const formData = new FormData()
    formData.append('avatar', file[0])
    await UserApi.changeUserAvatar(formData)
  }
}

export default new UserPageService()
