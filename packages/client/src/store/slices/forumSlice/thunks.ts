import {
  CommentInfo,
  CreateCommentData,
  CreateReactionData,
  CreateTopicData,
  ReactionInfo,
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

export const getTopic = createAsyncThunk<TopicInfo, number>(
  'forum/getTopic',
  async (topicId, thunkApi) => {
    try {
      const forumApi = (thunkApi.extra as IExtraArgument).forumService
      const topic = await forumApi.getTopic(topicId)
      return topic
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const addNewTopic = createAsyncThunk<TopicInfo, CreateTopicData>(
  'forum/addNewTopic',
  async (createTopicData, thunkApi) => {
    try {
      const forumApi = (thunkApi.extra as IExtraArgument).forumService
      const newTopic = await forumApi.addNewTopic(createTopicData)
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
  async (createCommentData, thunkApi) => {
    try {
      const forumApi = (thunkApi.extra as IExtraArgument).forumService
      const newComment = await forumApi.addNewComment(createCommentData)
      return newComment.data
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const addNewReaction = createAsyncThunk<
  ReactionInfo,
  CreateReactionData
>('forum/addNewReaction', async (createReactionData, thunkApi) => {
  try {
    const forumApi = (thunkApi.extra as IExtraArgument).forumService
    const newReaction = await forumApi.addNewReaction(createReactionData)
    return newReaction.data
  } catch (error) {
    return thunkApi.rejectWithValue(false)
  }
})

export const getReactionByCommentId = createAsyncThunk<ReactionInfo, number>(
  'forum/getReactionById',
  async (comment_id, thunkApi) => {
    try {
      const forumApi = (thunkApi.extra as IExtraArgument).forumService
      const reactionsList = await forumApi.getReactionsByCommentId(comment_id)
      return reactionsList.data
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)

export const deleteReaction = createAsyncThunk<number, number>(
  'forum/deleteReaction',
  async (reactionId, thunkApi) => {
    try {
      const forumApi = (thunkApi.extra as IExtraArgument).forumService
      await forumApi.deleteReaction(reactionId)
      return reactionId
    } catch (error) {
      return thunkApi.rejectWithValue(false)
    }
  }
)
