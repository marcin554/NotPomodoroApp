import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    settings: {
        defaultProject: {
            projectName: "Project 1",
            workingOn: false
        },
        defaultPomodoroTimerDuration: 25,
        defaultTimerType: "normalTimer",
    },
}
     
    
export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setDefaultProject: (state, action) => {
            state.settings.defaultProject.projectName = action.payload;
        },
        setBooleanOnProject: (state, action) => {
            state.settings.defaultProject.workingOn = action.payload;
        },
        setSettings: (state, action) => {
            state.settings = action.payload;
        }
        
    

    }
})

export const { setDefaultProject } = settingsSlice.actions

export default settingsSlice.reducer

