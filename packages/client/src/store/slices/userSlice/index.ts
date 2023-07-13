import { createSlice } from '@reduxjs/toolkit'
import {
  signin,
  signup,
  logout,
  getUserInfo,
  changeUserPassword,
  changeUserAvatar,
  changeUserInfo,
} from './thunks'
import { UserInfo, UserUpdateModel } from '@/api/User/types'

export interface UserState {
  loading: boolean
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
      state.userInfo = null
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
      if (state.userInfo) {
        const result = Object.assign(
          {},
          state.userInfo,
          ...Object.keys(state.userInfo).map(
            k =>
              k in action.payload && {
                [k]: action.payload[k as keyof UserUpdateModel],
              }
          )
        )
        state.userInfo = result
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
