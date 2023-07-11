import { createSlice } from '@reduxjs/toolkit'
import { changeUserPassword, changeUserAvatar } from './thunks'

export interface UserState {
  loading: boolean
}

const initialState: UserState = {
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
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
    builder.addCase(changeUserAvatar.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(changeUserAvatar.rejected, state => {
      state.loading = false
    })
  },
})

const { reducer } = userSlice
export default reducer
