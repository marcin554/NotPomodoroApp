import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  command:{
    toRun: false,
    commandToRun: ''
  },
  timeStart:'',
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
   
    
      if(action.payload.h.toString().length <= 1){
   
        action.payload.h = '0' + action.payload.h;
      }
      if(action.payload.m.toString().length <= 1){
        action.payload.m = '0' + action.payload.m;
      }
      if(action.payload.s.toString().length <= 1){
        action.payload.s = '0' + action.payload.s;
      }

      state.value = action.payload;
    },
    updateIsStarted: (state, action) => {
      state.timer.isStarted = action.payload;
    },
    updateIsRunning: (state, action) => {
      console.log(action.payload);

      state.timer.isRunning = action.payload;
      console.log(state.timer.isRunning)
    },
    updateIsPaused: (state, action) => {
      state.timer.isPaused = action.payload;
      
    },
    setType(state, action) {
    
      state.currentType = action.payload;
      
    },

    resetTimer: (state) => {
        state = initialState;
    },
    setCommandBoolean: (state, action) => {
      state.command.toRun = action.payload;    
    },
    setCommandToRun: (state, action) => {
      state.command.commandToRun = action.payload;
    },
    setTimeStart: (state, action) => {
      state.timeStart = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateTime,resetTimer, updateIsStarted, updateIsRunning, updateIsPaused, setType, setCommandBoolean, setCommandToRun, setTimeStart } = timerSlice.actions

export default timerSlice.reducer