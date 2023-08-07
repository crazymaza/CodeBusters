import { createSlice } from '@reduxjs/toolkit'
import {
  signin,
  signup,
  logout,
  getUserInfo,
  changeUserPassword,
  changeUserAvatar,
  changeUserInfo,
  oauthServiceFetch,
  oauthServicePost,
} from './thunks'
import { UserInfo } from '@/api/User/types'

export interface UserState {
  loading: boolean
  isOath?: boolean
  userInfo: UserInfo | null
}

const initialState: UserState = {
  loading: false,
  userInfo: null,
}

const AVATAR_SOURCE_URL = 'https://ya-praktikum.tech/api/v2/resources/'

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // oauth-post
    builder.addCase(oauthServicePost.pending, state => {
      state.loading = true
    })
    builder.addCase(oauthServicePost.fulfilled, (state, action) => {
      localStorage.setItem('isOauth', 'true')

      state.isOath = true
      state.loading = false
    })
    builder.addCase(oauthServicePost.rejected, (state, action) => {
      const isOauth = action.payload === 'User already in system'

      localStorage.setItem('isOauth', JSON.stringify(isOauth))

      state.isOath = isOauth
      state.loading = false
    })
    // oauth-fetch
    builder.addCase(oauthServiceFetch.pending, state => {
      state.loading = true
    })
    builder.addCase(oauthServiceFetch.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(oauthServiceFetch.rejected, state => {
      state.loading = false
    })
    // signin
    builder.addCase(signin.pending, state => {
      state.loading = true
    })
    builder.addCase(signin.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(signin.rejected, state => {
      state.loading = false
    })
    // signup
    builder.addCase(signup.pending, state => {
      state.loading = true
    })
    builder.addCase(signup.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(signup.rejected, state => {
      state.loading = false
    })
    // logout
    builder.addCase(logout.pending, state => {
      state.loading = true
    })
    builder.addCase(logout.fulfilled, state => {
      localStorage.setItem('isOauth', 'false')

      state.userInfo = null
      state.isOath = false
      state.loading = false
    })
    builder.addCase(logout.rejected, state => {
      state.loading = false
    })
    // getUserInfo
    builder.addCase(getUserInfo.pending, state => {
      state.loading = true
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload

      if (action.payload.avatar) {
        state.userInfo.avatar = AVATAR_SOURCE_URL + action.payload.avatar
      }

      state.loading = false
    })
    builder.addCase(getUserInfo.rejected, state => {
      state.loading = false
    })
    // changeUserPassword
    builder.addCase(changeUserPassword.pending, state => {
      state.loading = true
    })
    builder.addCase(changeUserPassword.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(changeUserPassword.rejected, state => {
      state.loading = false
    })
    // changeUserAvatar
    builder.addCase(changeUserAvatar.pending, state => {
      state.loading = true
    })
    builder.addCase(changeUserAvatar.fulfilled, (state, action) => {
      state.userInfo = action.payload.data
      if (action.payload.data.avatar) {
        state.userInfo.avatar = AVATAR_SOURCE_URL + action.payload.data.avatar
      }
      state.loading = false
    })
    builder.addCase(changeUserAvatar.rejected, state => {
      state.loading = false
    })
    // changeUserInfo
    builder.addCase(changeUserInfo.pending, state => {
      state.loading = true
    })
    builder.addCase(changeUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload.data
      if (action.payload.data.avatar) {
        state.userInfo.avatar = AVATAR_SOURCE_URL + action.payload.data.avatar
      }

      state.loading = false
    })
    builder.addCase(changeUserInfo.rejected, state => {
      state.loading = false
    })
  },
})

const { reducer } = authSlice
export default reducer
