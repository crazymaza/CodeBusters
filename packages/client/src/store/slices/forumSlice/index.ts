import { CommentInfo, TopicInfo } from '@/api/Forum/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  addNewComment,
  getAllTopics,
  getCommentsByTopicId,
  getTopFiveTopics,
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
  first_name: string
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
        const topicDataArr = payload.reduce(
          (acc: TopicData[], curr: TopicInfo) => [...acc, curr],
          []
        )
        state.topics = topicDataArr
        state.loading = false
      }
    )

    builder.addCase(getAllTopics.rejected, state => {
      state.loading = false
    })

    builder.addCase(getTopFiveTopics.pending, state => {
      state.loading = true
    })

    builder.addCase(
      getTopFiveTopics.fulfilled,
      (state, { payload }: PayloadAction<TopicInfo[]>) => {
        const topTopicList = payload.reduce(
          (acc: TopicData[], curr: TopicInfo) => [...acc, curr],
          []
        )
        state.topTopics = topTopicList
        state.loading = false
      }
    )

    builder.addCase(addNewComment.pending, state => {
      state.loading = true
    })

    builder.addCase(addNewComment.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(addNewComment.rejected, state => {
      state.loading = true
    })

    builder.addCase(getCommentsByTopicId.pending, state => {
      state.loading = true
    })

    builder.addCase(
      getCommentsByTopicId.fulfilled,
      (state, { payload }: PayloadAction<CommentInfo[]>) => {
        const commentsArr = payload.reduce(
          (acc: CommentData[], curr: CommentInfo) => [...acc, curr],
          []
        )
        state.comments = commentsArr
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
