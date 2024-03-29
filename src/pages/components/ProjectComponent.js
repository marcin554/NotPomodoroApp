import React, { useEffect, useState } from 'react'
import { Switch } from '@mui/material'
import { getSettings } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setSettings } from '../../slices/settingsSlice'
import styles from './SessionTable.module.css'
import { setMessage } from '../../slices/applicationSlice'




const ProjectComponent = (projects) => {

  


  const dispatch = useDispatch();
  dispatch(setSettings(projects.settings))

  let rSettings = useSelector((state) => state.settingsStore.settings);

  const [nProjects, setNewProjects] = useState(projects);

  function checkedOrNot(project) {

    if (project === rSettings.defaultProject.projectName && rSettings.defaultProject.workingOn === true) {
      return true
    }
    else {
      return false
    }



  }


  function setCheckedInOnLoad() {
    let nProjectCopy = {...nProjects}
    nProjectCopy.projects.map((project) => {
      project.checked = checkedOrNot(project.project.projectName)
    })
    setNewProjects(nProjectCopy);
  }

  useEffect(() => {
    setCheckedInOnLoad();
  }, []);

  async function changeProject(projectName) {
    let tempSettings = await getSettings();
    let settings = tempSettings;

    
    let nProjectCopy = {...nProjects}
  
    nProjectCopy.projects.map((project) => {

      if (project.project.projectName === projectName) {
        project.checked = !project.checked;
 
      }
      else {
        project.checked = false;
      }
     
    })

    setNewProjects(nProjectCopy);


    if (settings.defaultProject.projectName === projectName) {

      if (settings.defaultProject.workingOn === true) {
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
    await window.electronAPI.store.updateSettings(settings);



   
  }

  const deleteFunction = (projectName) => {
    let object = {
      type: 'projects',
      name: projectName
    }

    window.electronAPI.store.deleteType(object);

      window.location.reload();
  }

  return (
    <div className={`${styles.container} shadow-md sm:rounded-lg`}>

      <table className="rounded table-auto ">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 ">Project Name</th>
            <th scope="col" className="px-6 py-3 ">Total Time</th>
            <th scope="col" className={`${styles.thColor} px-6 py-3`}>Time Spend In Last 7 Days</th>
            <th scope="col" className="px-6 py-3 ">Delete</th>
            <th scope="col" className={`${styles.thColor} px-6 py-3`}>Pick Project</th>
          </tr>
        </thead>
        <tbody>

          {nProjects.projects ?
            <>
                {console.log(nProjects.projects)}
              {nProjects.projects[0] === 0 ? <li>No projects</li> : <>
                {nProjects.projects.map((project) => (
                 
                  <tr
                    className="border-b border-gray-200 dark:border-gray-700"

                  >
                     <td className="px-6 py-4 ">{project.project.projectName}</td>
                    <td className={`${styles.tdColor} px-6 py-4 `}>{project.project.timeSpendTotal} min</td>
                    <td className="px-6 py-4 ">{project.project.timeSpendThisWeek} min</td>
                    <td className={`${styles.deleteButton} px-6 py-4 `} onClick={() => {deleteFunction(project.project.projectName, setMessage('Project Deleted.'))}}>Delete</td>
                     <td className="px-6 py-4 "><Switch checked={project.checked} label="Pick project" onClick={() => { changeProject(project.project.projectName)  }} /> </td>

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
