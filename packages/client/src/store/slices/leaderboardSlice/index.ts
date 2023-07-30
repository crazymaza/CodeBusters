import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getLeaderboardData } from './thunks'
import { LeaderboardValues } from '@/api/Leaderboard/types'

export interface LeaderboardState {
  data: LeaderboardValues[]
  loading: boolean
}

const initialState: LeaderboardState = {
  data: [],
  loading: false,
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // getLeaderboard
    builder.addCase(getLeaderboardData.pending, state => {
      state.loading = true
    })
    builder.addCase(
      getLeaderboardData.fulfilled,
      (state, { payload }: PayloadAction<LeaderboardValues[]>) => {
        state.loading = false
        state.data = payload
      }
    )
    builder.addCase(getLeaderboardData.rejected, state => {
      state.loading = false
    })
  },
})

const { reducer } = leaderboardSlice
export default reducer
