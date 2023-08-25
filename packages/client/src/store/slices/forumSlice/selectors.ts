import { RootState } from '@/store'

const selectTopicsData = (state: RootState) => state.forum.topics
const selectCommentsData = (state: RootState) => state.forum.comments
const selectCurrentTopicName = (state: RootState) => state.forum.currTopicName

export { selectTopicsData, selectCommentsData, selectCurrentTopicName }
