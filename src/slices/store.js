import { configureStore } from '@reduxjs/toolkit'
import timerReducer from '../slices/timerSlice'
import sessionStoreReducer from '../slices/sessionStoreSlice'
import projectsReducer from '../slices/projectsSlice'
import settingsSlice from './settingsSlice'



export const store = configureStore({
  reducer: {
    timer: timerReducer,
    sessionStore: sessionStoreReducer,
    projectsStore: projectsReducer,
    settingsStore: settingsSlice,
    
  },
})