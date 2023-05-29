import { createSlice } from '@reduxjs/toolkit'


const initialState = [
    {
        projectName: "Project 1",
        timeSpendTotal: 0,
        timeSpendThisWeek: 0,
    },
];


export const projectsSlice = createSlice({
  name: 'projectsStore',
  initialState,
  reducers: {
  
    setProjectList: (state, action) => {
        state = action.payload;
    }

    
    
  
  },
})

// Action creators are generated for each case reducer function
export const {getNewSettings } = projectsSlice.actions

export default projectsSlice.reducer