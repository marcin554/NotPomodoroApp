import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSettings } from '../../slices/settingsSlice';
import { Switch } from '@mui/material';
import { getSettings } from '../../utils/utils';
import styles from './SessionTable.module.css';
import { setMessage } from '../../slices/applicationSlice';



const GoalComponent = (settingsAndGoals) => {

  const dispatch = useDispatch();
  dispatch(setSettings(settingsAndGoals.settings))

  let rSettings = useSelector((state) => state.settingsStore.settings);

  const [nGoals, setNewGoals] = useState(settingsAndGoals.goals);

  function checkedOrNot(project) {

    if (project === rSettings.defaultGoal.goalName && rSettings.defaultGoal.workingOn === true) {
      return true
    }
    else {
      return false
    }




  }

  const deleteFunction = (goalName) => {
    let object = {
      type: 'goals',
      name: goalName
    }

    window.electronAPI.store.deleteType(object);

      window.location.reload();
  }

  function setCheckedInOnLoad() {
  
    let _nGoals = {...nGoals}


    Object.values(nGoals).map((project) => {
      project.checked = checkedOrNot(project.goal.goalName)
    })

    
    setNewGoals(_nGoals);
  }

  useEffect(() => {
    setCheckedInOnLoad();
  }, []);


  async function changeGoal(goalName) {
    let tempSettings = await getSettings();
    let settings = tempSettings;

    let nCopyGoals = {...nGoals}
    Object.values(nCopyGoals).map((project) => {

      if (project.goal.goalName=== goalName) {
        project.checked = !project.checked;
 
      }
      else {
        project.checked = false;
      }
     
    })

    setNewGoals(nCopyGoals);

    if (settings.defaultGoal.goalName === goalName) {

      if (settings.defaultGoal.workingOn === true) {

        settings.defaultGoal.workingOn = false;
      }
      else {

        settings.defaultGoal.workingOn = true;
      }
    }
    else {
      settings.defaultGoal.goalName = goalName
      settings.defaultGoal.workingOn = true;
    }

    dispatch(setSettings(settings))
    await window.electronAPI.store.updateSettings(settings);





  }

  return (
    <div className={`${styles.container} shadow-md sm:rounded-lg`}>

      <table className="rounded table-auto ">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 ">Goal Name</th>
            <th scope="col" className="px-6 py-3 ">Time Goal</th>
            <th scope="col" className="px-6 py-3 ">Time Spend In Last 7 Days</th>
            <th scope="col" className="px-6 py-3 ">Time Spend Total</th>
            <th scope="col" className="px-6 py-3 ">Delete</th>
            <th scope="col" className="px-6 py-3 ">Choose Goal</th>
          </tr>
        </thead>
        <tbody>
 
          {nGoals ?
            <>

              {nGoals.length === 0 ? <li>No Goals</li> : <> 
 
              <>
                {Object.values(nGoals).map((project) => (


                  <tr
                    className="border-b border-gray-200 dark:border-gray-700"

                  >
                    <td className="px-6 py-4 ">{project.goal.goalName}</td>
                    <td className={`${styles.tdColor} px-6 py-4 `}>{project.goal.timeGoal} min</td>
                    <td className="px-6 py-4 ">{project.goal.timeSpendThisWeek} min</td>
                    <td className={`${styles.tdColor} px-6 py-4 `}>{project.goal.timeSpendTotal} min</td>
                    <td className={`${styles.deleteButton} px-6 py-4 `} onClick={() => {deleteFunction(project.goal.goalName); setMessage('Goal deleted.')}}>Delete</td>
                    <td className={`${styles.tdColor} px-6 py-4 `}><Switch checked={project.checked} label="Pick project" onClick={() => { changeGoal(project.goal.goalName) }} /> </td>

                  </tr>

                ))}
</>
             

              </>}

            </>
            

            : null
          }

        </tbody>

      </table>


    </div>
  )
}

export default GoalComponent
