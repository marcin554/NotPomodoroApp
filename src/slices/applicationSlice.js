import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    
        message: ''

    
};


export const applicationSlice = createSlice({
  name: 'applicationStore',
  initialState,
  reducers: {
  
    setMessage: (state, action) => {
        state.message = action.payload;
    },
    deleteMessage: (state) => {
        console.log(state)
        state.message = ' ';
    }
    

    
    
  
  },
})

// Action creators are generated for each case reducer function
export const {setMessage, deleteMessage } = applicationSlice.actions

export default applicationSlice.reducer