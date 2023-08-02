import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  SigninData,
  SignupData,
  UserInfo,
  UserUpdateModel,
} from '@/api/User/types'
import { ChangePasswordRequest } from '@/api/User/types'
import { IExtraArgument } from '@/store'

export const signin = createAsyncThunk<void, SigninData>(
  'user/signin',
  async (signinData, thunkApi) => {
    try {
      const userApi = (thunkApi.extra as IExtraArgument).userService
      await userApi.signin(signinData)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const signup = createAsyncThunk<void, SignupData>(
  'user/signup',
  async (SignupData, thunkApi) => {
    try {
      const userApi = (thunkApi.extra as IExtraArgument).userService
      await userApi.signin(SignupData)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const logout = createAsyncThunk<void, void>(
  'user/logout',
  async (_, thunkApi) => {
    try {
      const userApi = (thunkApi.extra as IExtraArgument).userService
      await userApi.logout()
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const getUserInfo = createAsyncThunk<UserInfo, void>(
  'user/getUserInfo',
  async (_, thunkApi) => {
    try {
      const userApi = (thunkApi.extra as IExtraArgument).userService

      return await userApi.getUserInfo()
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const changeUserAvatar = createAsyncThunk(
  'user/changeUserAvatar',
  async (file: FileList, thunkApi) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file[0])

      const userApi = (thunkApi.extra as IExtraArgument).userService
      return await userApi.changeUserAvatar(formData)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const changeUserPassword = createAsyncThunk<void, ChangePasswordRequest>(
  'user/changeUserPassword',
  async (changePasswordData, thunkApi) => {
    try {
      const userApi = (thunkApi.extra as IExtraArgument).userService
      await userApi.changeUserPassword(changePasswordData)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const changeUserInfo = createAsyncThunk(
  'user/changeUserInfo',
  async (userData: UserUpdateModel, thunkApi) => {
    try {
      const userApi = (thunkApi.extra as IExtraArgument).userService
      return await userApi.changeUserInfo(userData)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)
