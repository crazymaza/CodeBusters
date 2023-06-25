import { RootState } from '@/store'

const selectAuthLoading = (state: RootState) => state.auth.loading
const selectUserInfo = (state: RootState) => state.auth.userInfo

export { selectAuthLoading, selectUserInfo }
