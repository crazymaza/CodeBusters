export interface LeaderboardValues {
  nickname: string | undefined
  avatar: string | undefined
  codebustersScores: number
  userId: number
}

export interface LeaderboardData {
  data: LeaderboardValues
}
