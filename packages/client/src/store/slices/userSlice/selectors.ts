import { RootState } from '@/store'

const selectAuthLoading = (state: RootState) => state.user.loading
const selectUserInfo = (state: RootState) => state.user.userInfo
const selectUserIsOauth = (state: RootState) => state.user.isOath

export { selectAuthLoading, selectUserInfo, selectUserIsOauth }
