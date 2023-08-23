import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { IExtraArgument } from '@/store'
import { ThemeSetRequestParams, ThemeResponse } from '@/api/Theme/types'

export const setTheme = createAsyncThunk<void, ThemeSetRequestParams>(
  'theme/set',
  async (params, thunkApi) => {
    try {
      const themeApi = (thunkApi.extra as IExtraArgument).themeService

      await themeApi.set(params)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const getTheme = createAsyncThunk<ThemeResponse, void>(
  'theme/get',
  async (_, thunkApi) => {
    try {
      const themeApi = (thunkApi.extra as IExtraArgument).themeService

      return await themeApi.get()
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const dropTheme = createAction('theme/drop')
