import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  SigninData,
  SignupData,
  UserInfo,
  UserUpdateModel,
  OAuthRequestParams,
} from '@/api/User/types'
import { ChangePasswordRequest } from '@/api/User/types'
import { IExtraArgument } from '@/store'
import { isAxiosError } from 'axios'

const isDev = import.meta.env.MODE === 'development'
const oauthUrl = import.meta.env.VITE_OAUTH_URL
const redirectUri = isDev
  ? import.meta.env.VITE_OAUTH_REDIRECT_URL_DEV
  : import.meta.env.VITE_OAUTH_REDIRECT_URL_PROD

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

export const oauthServicePost = createAsyncThunk<
  void,
  Pick<OAuthRequestParams, 'code'>
>('user/oauth-post-to-access-code', async (params, thunkApi) => {
  try {
    const userApi = (thunkApi.extra as IExtraArgument).userService

    const { data } = await userApi.postToAccess({
      code: params.code,
      redirect_uri: redirectUri,
    })

    return data
  } catch (error) {
    if (isAxiosError(error)) {
      const reason = error.response?.data.reason

      return thunkApi.rejectWithValue(reason)
    } else {
      return thunkApi.rejectWithValue(false)
    }
  }
})

export const oauthServiceFetch = createAsyncThunk<void, void>(
  'user/oauth-fetch-service-id',
  async (_, thunkApi) => {
    try {
      const userApi = (thunkApi.extra as IExtraArgument).userService

      const { data } = await userApi.fetchServiceId({
        redirect_uri: redirectUri,
      })

      window.location.href = `${oauthUrl}?response_type=code&client_id=${data.service_id}&redirect_uri=${redirectUri}`
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)
