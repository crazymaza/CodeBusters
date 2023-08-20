import { RootState } from '@/store'

const selectTopicsData = (state: RootState) => state.forum.topics
const selectCommentsData = (state: RootState) => state.forum.comments

export { selectTopicsData, selectCommentsData }
