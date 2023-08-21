import { RootState } from '@/store'

const selectThemeLoading = (state: RootState) => state.theme.loading
const selectThemeName = (state: RootState) => state.theme.name

export { selectThemeLoading, selectThemeName }
