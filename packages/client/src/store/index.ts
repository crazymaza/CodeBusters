import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  userSlice,
  gameSlice,
  leaderboardSlice,
  themeSlice,
  forumSlice,
} from '@/store/slices'
import { LeaderboardApi, UserApi, ThemeApi } from '@/api'
import ForumApi from '@/api/Forum'

export interface IExtraArgument {
  userService: UserApi
  leaderboardService: LeaderboardApi
  themeService: ThemeApi
  forumService: ForumApi
}

const reducers = combineReducers({
  user: userSlice,
  game: gameSlice,
  leaderboard: leaderboardSlice,
  theme: themeSlice,
  forum: forumSlice,
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
            forumService: new ForumApi(cookie),
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
