import {
  CommentInfo,
  CreateCommentData,
  CreateTopicData,
} from '@/api/Forum/types'
import { IExtraArgument } from '@/store'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getAllTopics = createAsyncThunk(
  'forum/getAllTopics',
  async (_, thunkApi) => {
    try {
      const forumApi = (thunkApi.extra as IExtraArgument).forumService
      const topicsList = await forumApi.getAllTopics()
      return topicsList
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const getTopFiveTopics = createAsyncThunk(
  'forum/getTopFiveTopics',
  async (_, thunkApi) => {
    try {
      const forumApi = (thunkApi.extra as IExtraArgument).forumService
      const topTopicList = await forumApi.getTopFiveTopics()
      return topTopicList
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const addNewTopic = createAsyncThunk<void, CreateTopicData>(
  'forum/addNewTopic',
  async (CreateTopicData, thunkApi) => {
    try {
      const forumApi = (thunkApi.extra as IExtraArgument).forumService
      await forumApi.addNewTopic(CreateTopicData)
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const getCommentsByTopicId = createAsyncThunk<CommentInfo[], number>(
  'forum/getCommentsByTopicId',
  async (topicId, thunkApi) => {
    try {
      const forumApi = (thunkApi.extra as IExtraArgument).forumService
      const commentsList = await forumApi.getCommentsByTopicId(topicId)
      return commentsList
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const addNewComment = createAsyncThunk<void, CreateCommentData>(
  'forum/addNewComment',
  async (CreateCommentData, thunkApi) => {
    try {
      const forumApi = (thunkApi.extra as IExtraArgument).forumService
      await forumApi.addNewComment(CreateCommentData)
    } catch (errro) {
      return thunkApi.rejectWithValue(false)
    }
  }
)
