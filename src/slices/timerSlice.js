import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  currentType: '',
  timer:{
    isStarted: false,
    isRunning: false,
    isPaused: false,

  },
  value:
   {
    h: '00',
    m: '00',
    s: '00',
  }
  
};

export const timerSlice = createSlice({
  name: 'timerS',
  initialState,
  reducers: {
  
    updateTime: (state, action) => {
   

      if(action.payload.h < 10){
        action.payload.h = '0' + action.payload.h;
      }
      if(action.payload.m < 10){
        action.payload.m = '0' + action.payload.m;
      }
      if(action.payload.s < 10){
        action.payload.s = '0' + action.payload.s;
      }

      state.value = action.payload;
    },
    updateIsStarted: (state, action) => {
      state.timer.isStarted = action.payload;
    },
    updateIsRunning: (state, action) => {
      state.timer.isRunning = action.payload;
    },
    updateIsPaused: (state, action) => {
      state.timer.isPaused = action.payload;
    },
    setType(state, action) {
      state.currentType = action.payload;
    },

    resetTimer: (state) => {
        state = initialState;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateTime,resetTimer, updateIsStarted, updateIsRunning, updateIsPaused, setType } = timerSlice.actions

export default timerSlice.reducer