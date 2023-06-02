import { createSlice } from "@reduxjs/toolkit";
import { getSettings, test } from "../utils/utils";

const initialState = {
 
}
     
    
export const settingsSlice =  createSlice({
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
        },
    
            
            
        
   

    
        
    

    }
})


export const { setDefaultProject, setSettings} = settingsSlice.actions

export default settingsSlice.reducer

