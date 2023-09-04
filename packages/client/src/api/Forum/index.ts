import BaseApi from '../Base'
import {
  CreateCommentData,
  CreateTopicData,
  RawComment,
  TopicInfo,
} from './types'

const forumApiPath = 'api/forum'

const baseURL = `/${forumApiPath}`

class ForumApi extends BaseApi {
  constructor(cookie?: string) {
    super({
      baseURL,
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

  getTopic(topicId: number) {
    return this.request
      .get<TopicInfo>(`/topic/${topicId}`)
      .then(response => response.data)
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
    return this.request.delete(`/topic/${topicId}`)
  }

  //Comments

  addNewComment(data: CreateCommentData) {
    return this.request.post('/comment', data)
  }
}

export default ForumApi
