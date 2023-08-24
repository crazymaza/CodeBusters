export interface TopicInfo {
  id: number
  title: string
  description: string
  userId: number
  createdAt: string
  updatedAt: string
  commentCount: number
}

export interface CommentInfo {
  id: number
  text: string
  topicId: number
  userId: number
  parentCommentId: number
  updatedAt: string
  createdAt: string
  user: UserCommentInfo
}

export interface UserCommentInfo {
  id: number
  firstName: string
  secondName: string
  displayName: string
  login: string
  avatar: string
}

export interface RawComment {
  comment: CommentInfo
}

export interface CreateTopicData {
  title: string
  description: string
}

export interface CreateCommentData {
  topicId: number
  text: string
  parentCommentId?: number
}

export interface ForumData {
  data: TopicInfo
}
