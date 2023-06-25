import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authSlice from '@/store/slices/authSlice'

const reducers = combineReducers({
  auth: authSlice,
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
