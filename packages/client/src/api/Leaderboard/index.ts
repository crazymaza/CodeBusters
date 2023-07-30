import BaseApi from '../Base'
import { LeaderboardValues } from './types'

class LeaderboardApi extends BaseApi {
  constructor() {
    super()
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

export default new LeaderboardApi()
