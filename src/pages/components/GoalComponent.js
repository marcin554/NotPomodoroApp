import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSettings } from '../../slices/settingsSlice';
import { Switch } from '@mui/material';
import { getSettings } from '../../utils/utils';
import styles from './SessionTable.module.css'


const GoalComponent = (settingsAndGoals) => {
  console.log(settingsAndGoals);
  const dispatch = useDispatch();
  dispatch(setSettings(settingsAndGoals.settings))

  let rSettings = useSelector((state) => state.settingsStore.settings);

  function checkedOrNot(project) {

    if (project === rSettings.defaultGoal.goalName && rSettings.defaultGoal.workingOn === true) {
      return true
    }
    else {
      return false
    }




  }

  async function changeGoal(goalName) {
    let tempSettings = await getSettings();
    let settings = tempSettings.settings;
    console.log('sadsdasad', goalName)
    console.log('dsadsadsadsa', settings.defaultGoal.goalName)
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
    window.location.reload();




  }

  return (
    <div className={`${styles.container} shadow-md sm:rounded-lg`}>

<table className="rounded table-auto ">
<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
          <th scope="col" className="px-6 py-3 ">Goal Name</th>
          <th scope="col" className="px-6 py-3 ">Time Goal</th>
          <th scope="col" className="px-6 py-3 ">Time Spend This Week</th>
          <th scope="col" className="px-6 py-3 ">Time Spend Total</th>
          <th scope="col" className="px-6 py-3 ">Delete</th>
          <th scope="col" className="px-6 py-3 ">Choose Goal</th>
          </tr>
        </thead>
        <tbody>

          {settingsAndGoals.goals ?
            <>

              {settingsAndGoals.goals.length === 0 ? <li>No Goals</li> : <>
                {settingsAndGoals.goals.map((project) => (


<tr
className="border-b border-gray-200 dark:border-gray-700"

>
<td className="px-6 py-4 ">{project.goal.goalName}</td>
<td className={`${styles.tdColor} px-6 py-4 `}>{project.goal.timeGoal} min</td>
<td className="px-6 py-4 ">{project.goal.timeSpendThisWeek} min</td>
<td className={`${styles.tdColor} px-6 py-4 `}>{project.goal.timeSpendTotal} min</td>
<td className="px-6 py-4 "></td>
<td className={`${styles.tdColor} px-6 py-4 `}><Switch checked={checkedOrNot(project.goal.goalName)} label="Pick project" onClick={() => { changeGoal(project.goal.goalName) }} /> </td>

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

export default GoalComponent
