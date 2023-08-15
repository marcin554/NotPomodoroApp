import React, { useEffect, useState } from 'react'
import styles from "./TimerMain.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateIsStarted, updateIsPaused, updateIsRunning, updateTime, setType, setCommandBoolean, setCommandToRun } from '../../slices/timerSlice';
import TimerUtils from '../../utils/timer';
import { Button, Container, FormControlLabel, Switch } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import { SwapHoriz } from "@mui/icons-material";
import { current } from '@reduxjs/toolkit';
import _Container from './Container';
import { _updateStatus, getSettings } from '../../utils/utils';
import { setSettings } from '../../slices/settingsSlice';







const TimerMain = (typeAr) => {

  const settings = useSelector((state) => state.settingsStore.settings);

  

  const typeArray = typeAr.typeAr
  const dispatch = useDispatch();
  let [workingProject, setWorkingProject] = useState();
  let [workingGoal, setWorkingGoal] = useState();


  useEffect(() => {
    if(!settings){
      console.log('getting settings to State')
      getSettings().then((tempSettings) => {    
        dispatch(setSettings(tempSettings));
        dispatch(setType(tempSettings.defaultTimerType))
        
      })
    }
  
    }, [])
  
    useEffect(() => {
      if(settings){
        setWorkingProject(settings.defaultProject.workingOn);
        setWorkingGoal(settings.defaultGoal.workingOn);
      }
      
    }, [settings])



  const timeState = useSelector((state) => state.timer.value);
  const timerState = useSelector((state) => state.timer.timer);
  const currentType = useSelector((state) => state.timer.currentType);




  const startEvent = () => {
    
    dispatch(setCommandToRun('start'))
    dispatch(setCommandBoolean(true))

  }

  const stopEvent = () => {
    dispatch(setCommandToRun('stop'))
    dispatch(setCommandBoolean(true))

  }

  const switchEvent = () => {
    dispatch(setCommandToRun('switch'))
    dispatch(setCommandBoolean(true))

  }

  function updateCheck (projectOrGoal) {
    if(projectOrGoal === "project") {
     
  

      setWorkingProject(!workingProject);
    }
    else if(projectOrGoal === "goal") {


      setWorkingGoal(!workingGoal);
    }
    
    _updateStatus(projectOrGoal);
  }





  return (
    <>
    {settings ? 
      <div className={styles.container}>

      <div className={styles.timerDiv}>
       
 
            <div
              className={`${styles.timerCircle} ${currentType === typeArray.normalTimer && !timerState.isPaused
                ? ""
                : currentType === typeArray.pomodoro && !timerState.isPaused
                  ? styles.timerCirclePomodoro
                  : timerState.isPaused
                    ? styles.timerCirclePaused 
                    : ""
                }`}
            >
              <div
                className={`${currentType === typeArray.normalTimer
                  ? styles.progressBar
                  : styles.progressBarPomodoro
                  } ${timerState.isStarted && !timerState.isPaused && currentType === typeArray.normalTimer
                    ? styles.progressBarAnimation
                    : timerState.isStarted && !timerState.isPaused && currentType === typeArray.pomodoro
                    ? styles.progressBarAnimationPomodoro
                    : ""
                      
                  }`}
              ></div>
              <div className={styles.timerText}>
                {!timerState.isPaused ?
                <>
                {timeState.h} : {timeState.m} : {timeState.s}
                </>
                : <><div><PauseIcon  style={{ margin: 'auto', fontSize: '10vh' }}></PauseIcon> </div>  <div style={{fontSize: '2vh'}}>{timeState.h} : {timeState.m} : {timeState.s}</div>  </>}
              </div>
            </div>
       
        </div>


        <div className={styles.buttonsDiv}>
        <button
            className={`${ currentType === typeArray.normalTimer 
              ? styles.buttonTimer 
              : styles.buttonTimerPomodoro

            } `}
            onClick={() => {
              startEvent();
            }}
          >
            {(!timerState.isRunning || timerState.isPaused)
              ? "Start " && <PlayArrowIcon fontSize="inherit"/> 
              : "Stop" && <PauseIcon fontSize="inherit"> </PauseIcon>}
          </button>

          <button  className={`${ currentType === typeArray.normalTimer 
              ? styles.buttonTimer 
              : styles.buttonTimerPomodoro

            } `} onClick={() => {
            stopEvent()}}>
            <StopIcon fontSize="inherit"></StopIcon>
          </button>

          <button
            onClick={() => {
              switchEvent();
            }}
            className={`${ currentType === typeArray.normalTimer 
              ? styles.buttonTimer 
              : styles.buttonTimerPomodoro

            } `}
          >
            <SwapHoriz fontSize="inherit"/>
          </button>

          
          <div  className={`${styles.buttonTimerSwitch} `} >
          {settings.defaultGoal.goalName && settings.defaultProject.projectName?
          <>
            <FormControlLabel control ={<Switch checked={workingProject}color="warning" onClick={() => {updateCheck('project') }}/>} label={ "PROJECT:   " + settings.defaultProject.projectName}> </FormControlLabel>
            
            <FormControlLabel control ={<Switch checked={workingGoal} onClick={() => {updateCheck('goal')}} />} label={ "GOAL:   " + settings.defaultGoal.goalName } > </FormControlLabel>
            </> : null}
            <Button onClick={() =>{
          window.electronAPI.store.openMiniWindow();

  //This Timeout is to force update on state in the new Window. 
                setTimeout(() => {
                  dispatch(setType(currentType))
                  dispatch(updateIsRunning(timerState.isRunning));
                }
                , 500);
            }
        
        

        } >Mini Timer</Button>
          </div>
        
          
          </div>

          
      </div>
: <div>waiting...</div>}
    </>
  )
}

export default TimerMain


