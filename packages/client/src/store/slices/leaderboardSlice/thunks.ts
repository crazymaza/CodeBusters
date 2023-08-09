import { createAsyncThunk } from '@reduxjs/toolkit'
import { LeaderboardValues } from '@/api/Leaderboard/types'
import { IExtraArgument } from '@/store'

export const getLeaderboardData = createAsyncThunk(
  'leaderboard/getAll',
  async (_, thunkApi) => {
    try {
      const leaderboardApi = (thunkApi.extra as IExtraArgument)
        .leaderboardService
      const leaderboardData = await leaderboardApi.getData()
      return leaderboardData.data
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const setLeaderboardData = createAsyncThunk(
  'leaderboard/setScore',
  async (data: LeaderboardValues, thunkApi) => {
    try {
      const leaderboardApi = (thunkApi.extra as IExtraArgument)
        .leaderboardService
      await leaderboardApi.setData(data)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)
