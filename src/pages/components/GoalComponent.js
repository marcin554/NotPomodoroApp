import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSettings } from '../../slices/settingsSlice';
import { Switch } from '@mui/material';
import { getSettings } from '../../utils/utils';


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
    // window.location.reload();




  }

  return (
    <div>

      <table>
        <thead>
          <tr>
            <th>Goal Name</th>
            <th>Time Goal</th>
            <th>Time Spend This Week</th>
            <th>Time Spend Total</th>
            <th>Delete</th>
            <th>Choose Goal</th>
          </tr>
        </thead>
        <tbody>

          {settingsAndGoals.goals ?
            <>

              {settingsAndGoals.goals.length === 0 ? <li>No Goals</li> : <>
                {settingsAndGoals.goals.map((project) => (


                  <tr>
                    <td>{project.goal.goalName}</td>
                    <td>{project.goal.timeGoal}</td>
                    <td>{project.goal.timeSpendThisWeek} min</td>
                    <td>{project.goal.timeSpendTotal} min</td>
                    <td></td>
                    <td><Switch checked={checkedOrNot(project.goal.goalName)} label="Pick project" onClick={() => { changeGoal(project.goal.goalName) }} /> </td>

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
