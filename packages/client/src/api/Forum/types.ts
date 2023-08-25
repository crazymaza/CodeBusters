export interface TopicInfo {
  id: number
  title: string
  description: string
  user_id: number
  createdAt: string
  updatedAt: string
  commentCount: number
}

export interface CommentInfo {
  id: number
  text: string
  topic_id: number
  user_id: number
  parent_comment_id: number
  updatedAt: string
  createdAt: string
  user: UserCommentInfo
  reaction: ReactionInfo[]
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
  topic_id: number
  text: string
  parent_comment_id?: number
}

export interface CreateReactionData {
  commentId: number
  userId: number
  reaction: string
}

export interface ReactionInfo {
  id: number
  commentId: number
  createdAt: string
  reaction: string
  updatedAt: string
  userId: number
}

export interface ForumData {
  data: TopicInfo
}
