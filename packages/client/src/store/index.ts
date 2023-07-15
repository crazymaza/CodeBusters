import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice, userSlice } from '@/store/slices'

const reducers = combineReducers({
  auth: authSlice,
  user: userSlice,
})

export const createReduxStore = (initialState = {}) => {
  return configureStore({
    reducer: reducers,
    preloadedState: initialState,
    devTools: true,
  })
}

const store = createReduxStore()

export type RootReducer = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof configureStore>

export default store
