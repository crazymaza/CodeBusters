import { RootState } from '@/store'

const selectAuthLoading = (state: RootState) => state.user.loading
const selectUserInfo = (state: RootState) => state.user.userInfo

export { selectAuthLoading, selectUserInfo }
