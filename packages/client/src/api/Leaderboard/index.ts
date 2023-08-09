import BaseApi from '../Base'
import { LeaderboardValues } from './types'

class LeaderboardApi extends BaseApi {
  constructor(cookie?: string) {
    super({
      baseURL: 'http://localhost:3001/api/v2',
      // baseURL: 'https://ya-praktikum.tech/api/v2',
      withCredentials: true,
      headers: {
        cookie,
      },
    })
  }

  getData() {
    return this.request.post('/leaderboard/all', {
      ratingFieldName: 'codebustersScores',
      cursor: 0,
      limit: 10,
    })
  }

  setData(data: LeaderboardValues) {
    return this.request.post('/leaderboard', {
      data,
      ratingFieldName: 'codebustersScores',
      teamName: 'CodeBusters',
    })
  }
}

export default LeaderboardApi
