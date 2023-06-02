import React, { useEffect, useState } from 'react'
import styles from './PickGoalOrProject.module.css'
import { getSettings, getGoals, getProjects, _setNewProject, setNewGoal, createSettings } from '../../utils/utils';
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
            console.log('teemo', tempProjects)
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


    async function changeSettings(project, changeWhat) {

        // createSettings();
        let tempSettings = await getSettings();
        let settings = tempSettings.settings;







        if (changeWhat === 'project') {
            settings.defaultProject.projectName = project;
            settings.defaultProject.workingOn = true;
            console.log(project);

        }






        await window.electronAPI.store.updateSettings(settings);
        console.log('changed settings')


    }




    return (
        <div>
            <div className={styles.dropdownButton} onClick={() => { toggle() }}>
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



                    <form>
                        <select id="projects" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">


                            {!importProjects && <option value="No Projects">No Projects</option>}
                            {importProjects && importProjects.map((project) => {
                                return <option value={project.project.projectName}>{project.project.projectName} </option>


                            })}



                        </select>
                        <Button variant="contained" onClick={() => {
                            changeSettings(document.getElementById('projects').value, 'project')
                        }
                        }
                        >Change Project</Button>
                    </form>
                </div>
            )
            }
        </div>
    )

}

export default PickGoalOrProject
