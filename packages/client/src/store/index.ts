import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  userSlice,
  gameSlice,
  leaderboardSlice,
  themeSlice,
} from '@/store/slices'
import { LeaderboardApi, UserApi, ThemeApi } from '@/api'

export interface IExtraArgument {
  userService: UserApi
  leaderboardService: LeaderboardApi
  themeService: ThemeApi
}

const reducers = combineReducers({
  user: userSlice,
  game: gameSlice,
  leaderboard: leaderboardSlice,
  theme: themeSlice,
})

export const createReduxStore = (initialState = {}, cookie = '') => {
  const preloadedState =
    typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : initialState

  if (typeof window !== 'undefined') {
    delete window?.__PRELOADED_STATE__
  }

  return configureStore({
    reducer: reducers,
    preloadedState,
    devTools: true,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            userService: new UserApi(cookie),
            leaderboardService: new LeaderboardApi(cookie),
            themeService: new ThemeApi(cookie),
          },
        },
      }),
  })
}

const store = createReduxStore()

export type RootReducer = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof configureStore>

export default store
