import { createAsyncThunk } from '@reduxjs/toolkit'
import { LeaderboardApi } from '@/api'
import { LeaderboardData, LeaderboardValues } from '@/api/Leaderboard/types'

export const getLeaderboardData = createAsyncThunk(
  'leaderboard/getAll',
  async (_, thunkApi) => {
    try {
      const leaderboardData = await LeaderboardApi.getData()
      return leaderboardData.data.reduce(
        (acc: [], curr: LeaderboardData) => [...acc, curr['data']],
        []
      )
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const setLeaderboardData = createAsyncThunk(
  'leaderboard/setScore',
  async (data: LeaderboardValues, thunkApi) => {
    try {
      await LeaderboardApi.setData(data)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)
