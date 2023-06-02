import { createSlice } from '@reduxjs/toolkit'

const initialState = {

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
    resetTimer: (state) => {
        state = initialState;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateTime,resetTimer } = timerSlice.actions

export default timerSlice.reducer