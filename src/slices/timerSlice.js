import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   
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