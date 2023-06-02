import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProjectComponent from './components/ProjectComponent';
import _Container from './components/Container';
import { getProjects, getSettings } from '../utils/utils';




const ProjectsIndex = () => {


  const [projects, setProjectList] = useState();
    

  useEffect(() => {
      getProjects().then((tempSettings) => {
      
          setProjectList(tempSettings);
         
       
      })
  }, [])

  const [settings, setSettings] = useState();
    

  useEffect(() => {
      getSettings().then((tempSettings) => {
      
          setSettings(tempSettings.settings);
       
       
      })
  }, [])
 



  return (
    <div>
   

  {settings && projects ? 
    <_Container ComponentPage={<ProjectComponent projects={projects} settings={settings} />} />
    : null
  } 
    

      

    </div>
  )
}

export default ProjectsIndex
