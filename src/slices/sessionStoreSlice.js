import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sessionStore: []
};

export const sessionStoreSlice = createSlice({
  name: 'sessionStore',
  initialState,
  reducers: {
  
    addEntryToSessionList: (state, action) => {
      state.push(action.payload);  
    },
    resetSessionList: (state) => {
        state = initialState;
    },
    swapList: (state, action) => {
      
    state.sessionStore = action.payload;

    }
  },
})

// Action creators are generated for each case reducer function
export const { addEntryToSessionList, resetSessionList, swapList} = sessionStoreSlice.actions

export default sessionStoreSlice.reducer