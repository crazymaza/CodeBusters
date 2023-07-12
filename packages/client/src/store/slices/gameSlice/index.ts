import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CodeBustersEngineProcess } from '@/engine/Core/types'

export interface GameState {
  scores: number
  process: CodeBustersEngineProcess
}

const initialState: GameState = {
  scores: 0,
  process: CodeBustersEngineProcess.STOP,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setScores: (state, action: PayloadAction<number>) => {
      state.scores = action.payload
    },
    setProcess: (state, action: PayloadAction<CodeBustersEngineProcess>) => {
      state.process = action.payload
    },
  },
})

const { reducer, actions } = gameSlice

export const setGameScores = actions.setScores
export const setGameProcess = actions.setProcess
export default reducer
