import { RootState } from '@/store'

const selectAuthLoading = (state: RootState) => state.user.loading
const selectOAuthServiceId = (state: RootState) => state.user.loadingServiceId
const selectUserInfo = (state: RootState) => state.user.userInfo
const selectUserTheme = (state: RootState) => state.user.themeName

export {
  selectAuthLoading,
  selectUserInfo,
  selectOAuthServiceId,
  selectUserTheme,
}
