import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface GameState {
  scores: number
}

const initialState: GameState = {
  scores: 0,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setScores: (state, action: PayloadAction<number>) => {
      state.scores = action.payload
    },
  },
})

const { reducer, actions } = gameSlice

export const setGameScores = actions.setScores
export default reducer
