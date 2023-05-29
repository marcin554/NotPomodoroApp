import React from 'react'
import PickGoalOrProject from './PickGoalOrProject'


const ProjectComponent = (projects) => {
    console.log(projects.projects)
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
                            </tr>
                    </thead>
                    <tbody>
                       
                    {projects.projects ?
                  <>
                  
                      {projects.projects.length === 0 ? <li>No projects</li> : <>
                      {projects.projects.map((project) => (
                          
                            <tr>
                            <td>{project.projectName}</td>
                            <td>{project.projectDescription}</td>
                            <td>{project.timeSpendTotal}</td>
                            <td>{project.timeSpendThisWeek}</td>
                            
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
