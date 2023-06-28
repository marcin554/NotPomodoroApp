import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import timerReducer from '../slices/timerSlice'
import sessionStoreReducer from '../slices/sessionStoreSlice'
import projectsReducer from '../slices/projectsSlice'
import settingsSlice from './settingsSlice'
import { createStateSyncMiddleware, initStateWithPrevTab} from 'redux-state-sync';

const config = {
  // TOGGLE_TODO will not be triggered in other tabs
  blacklist: ['TOGGLE_TODO'],
};

const middlewares = [createStateSyncMiddleware(config)];
export const store = configureStore({
  reducer: {
    timer: timerReducer,
    sessionStore: sessionStoreReducer,
    projectsStore: projectsReducer,
    settingsStore: settingsSlice,
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createStateSyncMiddleware(config),
  middlewares) 

},
)

initStateWithPrevTab(store)

