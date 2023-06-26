import { UserApi } from '@/api'
import { ChangePasswordRequest } from '@/api/User/types'

class UserPageService {
  public async changeUserAvatar(file: FileList) {
    const formData = new FormData()
    formData.append('avatar', file[0])
    await UserApi.changeUserAvatar(formData)
  }

  public async changeUserPassword(oldPassword: string, newPassword: string) {
    const data = {
      oldPassword,
      newPassword,
    } as ChangePasswordRequest
    await UserApi.changeUserPassword(data)
  }

  public async changeUserInfo() {
    await UserApi.changeUserInfo(data)
  }
}

export default new UserPageService()
