import { CommentInfo, ReactionInfo, TopicInfo } from '@/api/Forum/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  addNewComment,
  addNewReaction,
  addNewTopic,
  deleteTopic,
  getAllTopics,
  getCommentsByTopicId,
  getTopic,
} from './thunks'

interface TopicData {
  id: number
  title: string
  description: string
  user_id: number
  createdAt: string
  updatedAt: string
  commentCount: number
}

export interface ForumState {
  topics: TopicData[]
  topTopics: TopicData[]
  comments: CommentData[]
  currTopicId?: number
  currTopicName: string
  loading: boolean
}

export interface ReactionData {
  reaction: string
  count: number
}

export interface CommentData {
  id: number
  text: string
  topic_id: number
  user_id: number
  parent_comment_id: number
  updatedAt: string
  createdAt: string
  user: UserInfo
  reactions: ReactionData[]
}

export interface UserInfo {
  id: number
  firstName: string
  login: string
  avatar: string
}

const initialState: ForumState = {
  topics: [],
  topTopics: [],
  comments: [],
  currTopicId: 0,
  currTopicName: '',
  loading: false,
}

const getReactions = (data: ReactionInfo[]): ReactionData[] => {
  const reactionRec = new Map<string, number>()
  data.map(reac => {
    const v = reactionRec.get(reac.reaction)
    if (v === undefined) {
      reactionRec.set(reac.reaction, 1)
      return
    }
    reactionRec.set(reac.reaction, v + 1)
  })
  const res: ReactionData[] = []
  for (const [reaction, value] of reactionRec) {
    res.push({
      reaction: reaction,
      count: value,
    })
  }
  return res
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllTopics.pending, state => {
      state.loading = true
    })
    builder.addCase(
      getAllTopics.fulfilled,
      (state, { payload }: PayloadAction<TopicInfo[]>) => {
        state.topics = payload
        state.loading = false
      }
    )

    builder.addCase(getAllTopics.rejected, state => {
      state.loading = false
    })

    builder.addCase(addNewTopic.pending, state => {
      state.loading = true
    })

    builder.addCase(
      addNewTopic.fulfilled,
      (state, { payload }: PayloadAction<TopicInfo>) => {
        state.topics = [payload, ...state.topics]
        state.loading = false
      }
    )

    builder.addCase(addNewComment.pending, state => {
      state.loading = true
    })

    builder.addCase(
      addNewComment.fulfilled,
      (state, { payload }: PayloadAction<CommentInfo>) => {
        const data: CommentData = {
          ...payload,
          reactions: getReactions(payload.reaction),
        }
        state.comments = [data, ...state.comments]
        state.loading = false
      }
    )

    builder.addCase(addNewComment.rejected, state => {
      state.loading = true
    })

    builder.addCase(deleteTopic.pending, state => {
      state.loading = true
    })

    builder.addCase(
      deleteTopic.fulfilled,
      (state, action: PayloadAction<number>) => {
        const id = action.payload
        state.topics = state.topics.filter(topic => topic.id !== id)
      }
    )

    builder.addCase(getCommentsByTopicId.pending, state => {
      state.loading = true
    })

    builder.addCase(
      getCommentsByTopicId.fulfilled,
      (state, { payload }: PayloadAction<CommentInfo[]>) => {
        state.comments = payload.map(value => {
          return {
            ...value,
            reactions: getReactions(value.reaction),
          }
        })
        state.loading = false
      }
    )

    builder.addCase(getCommentsByTopicId.rejected, state => {
      state.loading = true
    })

    builder.addCase(getTopic.pending, state => {
      state.loading = true
    })

    builder.addCase(
      getTopic.fulfilled,
      (state, { payload }: PayloadAction<TopicInfo>) => {
        state.currTopicName = payload.title
        state.loading = false
      }
    )

    builder.addCase(getTopic.rejected, state => {
      state.loading = true
    })
    builder.addCase(addNewReaction.pending, state => {
      state.loading = true
    })
    builder.addCase(
      addNewReaction.fulfilled,
      (state, { payload }: PayloadAction<ReactionInfo>) => {
        state.comments = state.comments.map(value => {
          if (value.id == payload.commentId) {
            value.reactions = value.reactions.map(v => {
              if (v.reaction === payload.reaction) {
                v.count++
              }
              return v
            })
          }

          return value
        })
        state.loading = false
      }
    )
  },
})

const { reducer } = forumSlice
export default reducer
