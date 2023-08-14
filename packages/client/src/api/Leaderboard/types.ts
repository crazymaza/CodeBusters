export interface LeaderboardValues {
  nickname: string | undefined
  avatar: string | undefined
  codebustersScores: number
  userId: number,
  userCountry: string,
}

export interface LeaderboardData {
  data: LeaderboardValues
}
