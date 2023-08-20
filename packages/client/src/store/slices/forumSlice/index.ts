import { CommentInfo, TopicInfo } from '@/api/Forum/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  addNewComment,
  addNewTopic,
  deleteTopic,
  getAllTopics,
  getCommentsByTopicId,
} from './thunks'

interface TopicData {
  id: number
  title: string
  description: string
  userId: number
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

export interface CommentData {
  id: number
  text: string
  topicId: number
  userId: number
  parentCommentId: number
  updatedAt: string
  createdAt: string
  user: UserInfo
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
        state.comments = [payload, ...state.comments]
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
        state.comments = payload
        state.loading = false
      }
    )

    builder.addCase(getCommentsByTopicId.rejected, state => {
      state.loading = true
    })
  },
})

const { reducer } = forumSlice
export default reducer
