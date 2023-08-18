import BaseApi from '../Base'
import {
  CreateCommentData,
  CreateTopicData,
  RawComment,
  TopicInfo,
} from './types'

class ForumApi extends BaseApi {
  constructor(cookie?: string) {
    console.log('COOKIE', cookie)
    super({
      baseURL: 'http://localhost:3001/api/forum',
      withCredentials: true,
      headers: {
        cookie,
      },
    })
  }

  // Topics
  getAllTopics() {
    return this.request
      .get<TopicInfo[]>('/topic')
      .then(response => response.data)
  }

  getTopFiveTopics() {
    return this.request.get('/topic/top').then(response => response.data)
  }

  getCommentsByTopicId(topicId: number) {
    return this.request
      .get<RawComment[]>(`/topic/comments/${topicId}`)
      .then(response => {
        return response.data.map(res => {
          return res.comment
        })
      })
  }

  addNewTopic(data: CreateTopicData) {
    return this.request.post('/topic', data)
  }

  deleteTopic(topicId: number) {
    return this.request.delete(`/${topicId}`)
  }

  //Comments

  addNewComment(data: CreateCommentData) {
    return this.request.post('/comment', data)
  }
}

export default ForumApi
