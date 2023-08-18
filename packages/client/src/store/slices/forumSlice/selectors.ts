import { RootState } from '@/store'

const selectTopicsData = (state: RootState) => state.forum.topics
const selectTopTopicsData = (state: RootState) => state.forum.topTopics
const selectCommentsData = (state: RootState) => state.forum.comments

export { selectTopicsData, selectCommentsData, selectTopTopicsData }
