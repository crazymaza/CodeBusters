import { RootState } from '@/store'

const selectGameScores = (state: RootState) => state.game.scores
const selectGameProcess = (state: RootState) => state.game.process

export { selectGameScores, selectGameProcess }
