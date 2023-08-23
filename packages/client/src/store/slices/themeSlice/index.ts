import { createSlice } from '@reduxjs/toolkit'
import { ThemeNameEnum } from '@/api/Theme/types'
import { setTheme, getTheme, dropTheme } from './thunks'

export interface ThemeState {
  loading: boolean
  name: ThemeNameEnum
}

const initialState: ThemeState = {
  loading: false,
  name: ThemeNameEnum.LIGHT,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // theme-get
    builder.addCase(getTheme.pending, state => {
      state.loading = true
    })
    builder.addCase(getTheme.fulfilled, (state, action) => {
      state.loading = false
      state.name = action.payload.theme
    })
    builder.addCase(getTheme.rejected, state => {
      state.loading = false
    })
    // theme-set
    builder.addCase(setTheme.pending, state => {
      state.loading = true
    })
    builder.addCase(setTheme.fulfilled, (state, action) => {
      state.loading = false
      state.name = action.meta.arg.themeName
    })
    builder.addCase(setTheme.rejected, state => {
      state.loading = false
    })
    // theme-drop
    builder.addCase(dropTheme, state => {
      state.name = ThemeNameEnum.LIGHT
    })
  },
})

const { reducer } = themeSlice

export default reducer
