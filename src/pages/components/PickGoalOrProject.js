import React, { useEffect, useState } from 'react'
import styles from './PickGoalOrProject.module.css'
import { getSettings, getGoals, getProjects, _setNewProject } from '../../utils/utils';





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
            console.log(tempGoals)
        })
    }, [])

    useEffect(() => {
        getProjects().then((tempProjects) => {
            setImportProjects(tempProjects);
            console.log(tempProjects)
        })
    }, [])
        
    

    // {
    //     projectName: "Project 1",
    //     timeSpendTotal: 0,
    //     timeSpendThisWeek: 0,
    // },
   async function addProject(project) {

        await _setNewProject(project)

    }
 


    return (
        <div>
            <div className={styles.dropdownButton} onClick={() => { toggle()}}>
                <span className='block mb-2 '>Pick a goal or project</span>
                {/* <img  alt="Dropdown Icon" /> */}
            </div>


            {isToggled && (
                <div>
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
