import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



// const dispatch = useDispatch();

export const getSessions = async () => {
    let sessions = await window.electronAPI.store.get('sessions');
    return sessions;

};

export const getProjects = async () => {
    return window.electronAPI.store.get('projects').then(currentProjects => {
      return currentProjects;
    }
    );

}

export const getSettings = () => {
    return window.electronAPI.store.get('settings').then(currentSettings => {
      return currentSettings;
    });
  }

export const getGoals = () => {
   return window.electronAPI.store.get('goals').then(currentGoals => {
      return currentGoals;
    }
    );
}

export const _setNewProject = (project) => {
  window.electronAPI.store.setNewProject(project);
  console.log('added project to store')


}

export const setNewGoal = (goal) => {
  window.electronAPI.store.setNewGoal(goal);

}




