import { RootState } from '@/store'

const selectGameScores = (state: RootState) => state.game.scores

export { selectGameScores }
