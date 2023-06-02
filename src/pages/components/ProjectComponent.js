import React from 'react'
import PickGoalOrProject from './PickGoalOrProject'
import { Switch } from '@mui/material'
import { getSettings } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setSettings } from '../../slices/settingsSlice'





const ProjectComponent = (projects) => {

  const dispatch = useDispatch();
  dispatch(setSettings(projects.settings))

  let rSettings = useSelector((state) => state.settingsStore.settings);
 


    function checkedOrNot (project) {

      if(project === rSettings.defaultProject.projectName && rSettings.defaultProject.workingOn === true) {
        return true
      }
      else {
        return false
      }
      

        
    }

    async function changeProject(projectName) {
      let tempSettings = await getSettings();
      let settings = tempSettings.settings;

      if(settings.defaultProject.projectName === projectName) {
       
        if(settings.defaultProject.workingOn === true)
        {
          settings.defaultProject.workingOn = false;
        }
        else {
        settings.defaultProject.workingOn = true;
        }
      }
      else {

     
     
        settings.defaultProject.projectName = projectName;
        settings.defaultProject.workingOn = true;
  

      }
          
      dispatch(setSettings(settings))
      await window.electronAPI.store.updateSettings( settings);
     window.location.reload();
      
    
    
    
    }
  
    
  return (
    <div>
        <PickGoalOrProject />
          <table>
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Project Description</th>
                            <th>Total Time</th>
                            <th>Time Spend This Week</th>
                            <th>Delete</th>
                            <th>Pick Project</th>
                            </tr>
                    </thead>
                    <tbody>
                       
                    {projects.projects ?
                  <>
                  
                      {projects.projects.length === 0 ? <li>No projects</li> : <>
                      {projects.projects.map((project) => (
                          console.log('dsadsadadasdsad', project),
                          
                            <tr>
                            <td>{project.project.projectName}</td>
                            <td>{project.project.projectDescription}</td>
                            <td>{project.project.timeSpendTotal} min</td>
                            <td>{project.project.timeSpendThisWeek} min</td>
                            <td></td>
                            <td><Switch checked={checkedOrNot(project.project.projectName)}label="Pick project" onClick={() => {changeProject(project.project.projectName)}} /> </td>
                            
                            </tr>

                          ))}
                    
                          
                          
                      </>}
                      
                  </>
                  
                  : null
              }

                    </tbody>
          
              </table>

    
         
 

    </div>
  )
}

export default ProjectComponent
