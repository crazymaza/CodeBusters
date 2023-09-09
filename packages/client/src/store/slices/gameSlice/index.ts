import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EngineProcess } from '@/engine/Core/types'
import { INITIAL_PLAYER_PROGRESS } from '@/engine/Core/const'

export interface GameState {
  scores: number
  timeLeft: number
  process: EngineProcess
}

const initialState: GameState = {
  timeLeft: INITIAL_PLAYER_PROGRESS.timeLeft,
  scores: INITIAL_PLAYER_PROGRESS.scores,
  process: EngineProcess.STOP,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTimeLeft: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload
    },
    setScores: (state, action: PayloadAction<number>) => {
      state.scores = action.payload
    },
    setProcess: (state, action: PayloadAction<EngineProcess>) => {
      state.process = action.payload
    },
  },
})

const { reducer, actions } = gameSlice

export const setTimeLeft = actions.setTimeLeft
export const setGameScores = actions.setScores
export const setGameProcess = actions.setProcess
export default reducer
