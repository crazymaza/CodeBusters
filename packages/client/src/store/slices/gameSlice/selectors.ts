import { RootState } from '@/store'

const selectTimeLeft = (state: RootState) => state.game.timeLeft
const selectGameScores = (state: RootState) => state.game.scores
const selectGameProcess = (state: RootState) => state.game.process

export { selectTimeLeft, selectGameScores, selectGameProcess }
