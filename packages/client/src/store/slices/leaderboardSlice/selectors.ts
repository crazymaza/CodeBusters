import { RootState } from '@/store'

const selectLeaderboardData = (state: RootState) => state.leaderboard.data

export { selectLeaderboardData }
