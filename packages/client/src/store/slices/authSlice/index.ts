import { createSlice } from '@reduxjs/toolkit'
import { signin, signup, logout, getUserInfo } from './thunks'
import { UserInfo } from '@/api/Auth'

interface AuthState {
  loading: boolean
  userInfo: UserInfo | null
}

const initialState: AuthState = {
  loading: false,
  userInfo: null,
}

const authSlice = createSlice({
  name: 'auth',
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
      state.loading = false
    })
    builder.addCase(getUserInfo.rejected, state => {
      state.loading = false
    })
  },
})

const { reducer } = authSlice
export default reducer
