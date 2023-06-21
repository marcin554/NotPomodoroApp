import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import setSettings from "../slices/settingsSlice";
import { current } from "@reduxjs/toolkit";



// const dispatch = useDispatch();

export const getSessions = async () => {
    let sessions = await window.electronAPI.store.get('sessions');
    return sessions;

};

export const getProjects = async () => {
  
    let currentProjects = window.electronAPI.store.get('projects');
      
   
     
    
    return currentProjects;
   


}



export const getSettings = () => {
  return window.electronAPI.store.get('settings')
    .then(currentSettings => {
      let mySettings = currentSettings;
      return mySettings;
    })
    .catch(error => {
      console.error(error);
      throw error; // Optionally re-throw the error
    });
};

export const test = async () => {
  try {
    const currentSettings = await getSettings();
    let mySettings = currentSettings;
    return mySettings;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getGoals = () => {
   let goals = window.electronAPI.store.get('goals');
    return goals;
     
   
}

export const _setNewProject = (project) => {
  window.electronAPI.store.setNewProject(project);



}

export const _setNewGoal = (goal) => {
  window.electronAPI.store.setNewGoal(goal);

}

export const createSettings = () => {

  const setting = {
    defaultTimerType: 'normalTimer',
    defaultPomodoroTimerDuration: 25,
    defaultProject: {
      projectName: '',
      workingOn: false,
      
    },
    defaultGoal: {
      goalName: '',
      workingOn: false,
    }
    



 
    
  }

  window.electronAPI.store.updateSettings(setting);
}

export const _updateGoal = (goal,session) => {
  window.electronAPI.store.updateGoal(goal, session);
}

export const closeApp = () => {
  window.electronAPI.store.closeApp();
}

export const _updateProject = (project, session) => {
  window.electronAPI.store.updateProject(project, session);
}

export const _updateStatus = (projectOrGoal) => {
  
  window.electronAPI.store.updateStatus(projectOrGoal);
}



