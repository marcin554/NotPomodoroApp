import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProjectComponent from './components/ProjectComponent';
import Container from './components/Container';



const ProjectsIndex = () => {

    const dispatch = useDispatch();
    //useSelector
    const projects = useSelector((state) => state.projectsStore);
    
    

  return (
    <div>
   
    <Container ComponentPage={<ProjectComponent projects={projects} />} />

      

    </div>
  )
}

export default ProjectsIndex
