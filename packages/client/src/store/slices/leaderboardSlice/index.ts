import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getLeaderboardData } from './thunks'
import { LeaderboardData, LeaderboardValues } from '@/api/Leaderboard/types'

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
      (state, { payload }: PayloadAction<LeaderboardData[]>) => {
        const leaderboardData = payload.reduce(
          (acc: LeaderboardValues[], curr: LeaderboardData) => [
            ...acc,
            curr.data,
          ],
          []
        )
        state.loading = false
        state.data = leaderboardData
      }
    )
    builder.addCase(getLeaderboardData.rejected, state => {
      state.loading = false
    })
  },
})

const { reducer } = leaderboardSlice
export default reducer
