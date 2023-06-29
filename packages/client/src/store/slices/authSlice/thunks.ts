import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthApi } from '@/api'
import { SigninData, SignupData, UserInfo } from '@/api/Auth'

export const signin = createAsyncThunk<void, SigninData>(
  'auth/signin',
  async (signinData, thunkApi) => {
    try {
      await AuthApi.signin(signinData)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const signup = createAsyncThunk<void, SignupData>(
  'auth/signup',
  async (SignupData, thunkApi) => {
    try {
      await AuthApi.signup(SignupData)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const logout = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await AuthApi.logout()
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const getUserInfo = createAsyncThunk<UserInfo, void>(
  'auth/getUserInfo',
  async (_, thunkApi) => {
    try {
      const userInfo = await AuthApi.getUserInfo()
      return userInfo
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)
