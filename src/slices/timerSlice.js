import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  value:
   {
    h: 0,
    m: 0,
    s: 0,
  }
  
};

export const timerSlice = createSlice({
  name: 'timerS',
  initialState,
  reducers: {
  
    updateTime: (state, action) => {
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