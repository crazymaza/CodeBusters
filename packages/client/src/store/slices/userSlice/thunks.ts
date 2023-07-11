import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserApi } from '@/api'
import { ChangePasswordRequest } from '@/api/User/types'

export const changeUserAvatar = createAsyncThunk<void, FileList>(
  'user/changeUserAvatar',
  async (file, thunkApi) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file[0])
      await UserApi.changeUserAvatar(formData)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const changeUserPassword = createAsyncThunk<void, ChangePasswordRequest>(
  'user/changeUserPassword',
  async (changePasswordData, thunkApi) => {
    try {
      await UserApi.changeUserPassword(changePasswordData)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)
