import {
  CommentInfo,
  CreateCommentData,
  CreateTopicData,
  TopicInfo,
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

export const addNewTopic = createAsyncThunk<TopicInfo, CreateTopicData>(
  'forum/addNewTopic',
  async (CreateTopicData, thunkApi) => {
    try {
      const forumApi = (thunkApi.extra as IExtraArgument).forumService
      const newTopic = await forumApi.addNewTopic(CreateTopicData)
      return newTopic.data
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const deleteTopic = createAsyncThunk<number, number>(
  'forum/deleteTopic',
  async (topicId, thunkApi) => {
    try {
      const forumApi = (thunkApi.extra as IExtraArgument).forumService
      await forumApi.deleteTopic(topicId)
      return topicId
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

export const addNewComment = createAsyncThunk<CommentInfo, CreateCommentData>(
  'forum/addNewComment',
  async (CreateCommentData, thunkApi) => {
    try {
      const forumApi = (thunkApi.extra as IExtraArgument).forumService
      const newComment = await forumApi.addNewComment(CreateCommentData)
      return newComment.data
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)
