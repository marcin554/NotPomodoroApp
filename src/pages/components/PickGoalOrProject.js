import React, { useEffect, useState } from 'react'
import styles from './PickGoalOrProject.module.css'
import { getSettings, getGoals, getProjects, _setNewProject, setNewGoal } from '../../utils/utils';
import { Button, InputLabel, TextField } from '@mui/material';






const PickGoalOrProject = () => {

    const [isToggled, setToggle] = useState(false);
    const [importSettings, setImportSettings] = useState();
    const [importGoals, setImportGoals] = useState();
    const [importProjects, setImportProjects] = useState();


    const toggle = () => setToggle(!isToggled);

   useEffect(() => {
        getSettings().then((tempSettings) => {
            setImportSettings(tempSettings.settings.settings);
            console.log(tempSettings)
        })
    }, [])

    useEffect(() => {
        getGoals().then((tempGoals) => {
            setImportGoals(tempGoals);
            console.log('goals', tempGoals)
        })
    }, [])

    useEffect(() => {
        getProjects().then((tempProjects) => {
            setImportProjects(tempProjects);
            console.log(tempProjects)
        })
    }, [])
        
    


   async function addProject(projectName) {

  
        let project = {
            projectName: projectName,
            timeSpendTotal: 0,
            timeSpendThisWeek: 0,
        }
        
        
        await _setNewProject(project)

    }

    async function addGoal(goalName, timeGoal) { 
       let goal = {
              goalName: goalName,
                timeGoal: timeGoal,
                timeSpendTotal: 0,
                timeSpendThisWeek: 0,
            }

            
        await setNewGoal(goal)
        console.log('added goal to store')
    }

    async function changeSettings(value, changeWhat){
        let settings = importSettings;

        if(changeWhat === 'Goal'){
            settings.goalName = value;
            settings.workingOn = true;
        }
        else if(changeWhat === 'Project'){
            settings.projectName = value;
            settings.workingOn = true;
        }


        await window.electronAPI.store.set('settings', settings);
        console.log('changed settings')


    }
 


    return (
        <div>
            <div className={styles.dropdownButton} onClick={() => { toggle()}}>
                <span className='block mb-2 '>Pick a goal or project</span>
                
                {/* <img  alt="Dropdown Icon" /> */}
            </div>


            {isToggled && (


                <div>

                    <form >
                    
                        <TextField variant="filled" label="ProjectName" id="ProjectName"></TextField>
                        <Button variant="contained" onClick={() => {
                            addProject(document.getElementById('ProjectName').value)
                        }}> test </Button>
                     
                   
                    </form>
                    <form>
                        <TextField variant="filled" label="GoalName" id="GoalName"></TextField>
                        <TextField variant="filled" label="TimeGoal" id="TimeGoal"></TextField>
                        <Button variant="contained" onClick={() => {
                            addGoal(document.getElementById('GoalName').value, document.getElementById('TimeGoal').value)
                        }}> test </Button>
                    </form>
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                
                
                    <option>Goal 1</option>
                    <option>Goal 2</option>
                    <option>Goal 3</option>
                    <option>Goal 4</option>
                    <option>Goal 5</option>
                    <option>Goal 6</option>
                </select>
                </div>
            )  
            } 
        </div>
    )
          
}

export default PickGoalOrProject
