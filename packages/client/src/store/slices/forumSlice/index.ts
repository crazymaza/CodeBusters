import { CommentInfo, ReactionInfo, TopicInfo } from '@/api/Forum/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  addNewComment,
  addNewReaction,
  addNewTopic,
  deleteReaction,
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
  reactionIdByUser: Map<number, number>
  ids: number[]
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

const getReactions = (data: ReactionInfo[]): ReactionData[] | [] => {
  if (!data) {
    return []
  }
  const reactionMap = new Map<string, ReactionData>()
  data.map(reac => {
    let reaction = reactionMap.get(reac.reaction)
    if (!reaction) {
      reaction = {
        reaction: reac.reaction,
        count: 0,
        reactionIdByUser: new Map<number, number>(),
        ids: new Array<number>(),
      }
    }
    reaction.ids.push(reac.id)
    reaction.reactionIdByUser.set(reac.user_id, reac.id)

    reactionMap.set(reac.reaction, {
      ...reaction,
      count: reaction.count + 1,
    })
  })
  const res: ReactionData[] = []
  for (const value of reactionMap.values()) {
    res.push({
      ...value,
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
          reactions: getReactions(payload.reaction) || [],
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
        const comments_arr = state.comments.map(stateComment => {
          if (stateComment.id === payload.comment_id) {
            let foundReaction = false
            stateComment.reactions = stateComment.reactions.map(
              stateReaction => {
                if (stateReaction.reaction === payload.reaction) {
                  stateReaction.count++
                  foundReaction = true
                }
                return stateReaction
              }
            )
            if (!foundReaction) {
              const reactionIdByUserId = new Map<number, number>()
              reactionIdByUserId.set(payload.user_id, payload.id)
              const ids = [payload.id]
              stateComment.reactions.push({
                reaction: payload.reaction,
                count: 1,
                reactionIdByUser: reactionIdByUserId,
                ids: ids,
              })
            }
          }
          return stateComment
        })
        state.comments = comments_arr
        state.loading = false
      }
    )

    builder.addCase(addNewReaction.rejected, state => {
      state.loading = true
    })

    builder.addCase(deleteReaction.pending, state => {
      state.loading = true
    })

    builder.addCase(
      deleteReaction.fulfilled,
      (state, { payload }: PayloadAction<number>) => {
        const comments_arr = state.comments.map(stateComment => {
          console.log(payload)
          stateComment.reactions = stateComment.reactions.map(reaction => {
            for (const reactionId of reaction.ids) {
              if (reactionId === payload) {
                reaction.count--
              }
            }
            return reaction
          })
          return stateComment
        })
        state.comments = comments_arr
      }
    )
  },
})

const { reducer } = forumSlice
export default reducer
