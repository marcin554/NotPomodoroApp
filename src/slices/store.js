import { configureStore } from '@reduxjs/toolkit'
import timerReducer from '../slices/timerSlice'
import sessionStoreReducer from '../slices/sessionStoreSlice'


export const store = configureStore({
  reducer: {
    timer: timerReducer,
    sessionStore: sessionStoreReducer
  },
})