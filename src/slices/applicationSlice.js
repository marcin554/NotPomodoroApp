import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    
        message: '',
        bool: 'true'

    
};


export const applicationSlice = createSlice({
  name: 'applicationStore',
  initialState,
  reducers: {
  
    setMessage: (state, action) => {
        state.message = action.payload;
    },
    setBool: (state, action) => {
      state.message = action.payload;
  },
    deleteMessage: (state) => {
        console.log(state)
        state.message = ' ';
    }
    

    
    
  
  },
})

// Action creators are generated for each case reducer function
export const {setMessage, deleteMessage , setBool} = applicationSlice.actions

export default applicationSlice.reducer