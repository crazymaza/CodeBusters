import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserApi } from '@/api'
import {
  SigninData,
  SignupData,
  UserInfo,
  UserUpdateModel,
} from '@/api/User/types'
import { ChangePasswordRequest } from '@/api/User/types'

export const signin = createAsyncThunk<void, SigninData>(
  'user/signin',
  async (signinData, thunkApi) => {
    try {
      await UserApi.signin(signinData)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const signup = createAsyncThunk<void, SignupData>(
  'user/signup',
  async (SignupData, thunkApi) => {
    try {
      await UserApi.signup(SignupData)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const logout = createAsyncThunk<void, void>(
  'user/logout',
  async (_, thunkApi) => {
    try {
      await UserApi.logout()
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const getUserInfo = createAsyncThunk<UserInfo, void>(
  'user/getUserInfo',
  async (_, thunkApi) => {
    try {
      const userInfo = await UserApi.getUserInfo()
      return userInfo
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
      const userInfo = await UserApi.changeUserAvatar(formData)
      return userInfo
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

export const changeUserInfo = createAsyncThunk(
  'user/changeUserInfo',
  async (userData: UserUpdateModel, thunkApi) => {
    try {
      const userInfo = await UserApi.changeUserInfo(userData)
      return userInfo
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)
