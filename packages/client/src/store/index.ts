import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userSlice, gameSlice } from '@/store/slices'

const reducers = combineReducers({
  user: userSlice,
  game: gameSlice,
})

export const createReduxStore = (initialState = {}) => {
  const preloadedState =
    typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : initialState

  if (typeof window !== 'undefined') {
    delete window?.__PRELOADED_STATE__
  }

  return configureStore({
    reducer: reducers,
    preloadedState,
    devTools: true,
  })
}

const store = createReduxStore()

export type RootReducer = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof configureStore>

export default store
