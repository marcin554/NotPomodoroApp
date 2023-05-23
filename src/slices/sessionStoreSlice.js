import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const sessionStoreSlice = createSlice({
  name: 'sessionStore',
  initialState,
  reducers: {
  
    addEntryToSessionList: (state, action) => {
      state.push(action.payload);  
    },
    resetSessionList: (state) => {
        state = initialState;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addEntryToSessionList, resetSessionList} = sessionStoreSlice.actions

export default sessionStoreSlice.reducer