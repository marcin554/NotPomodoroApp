import React, { useEffect, useState } from 'react'
import styles from "./TimerMain.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateIsStarted, updateIsPaused, updateIsRunning, updateTime, setType } from '../../slices/timerSlice';
import TimerUtils from '../../utils/timer';
import { Container, FormControlLabel, Switch } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import { SwapHoriz } from "@mui/icons-material";
import { current } from '@reduxjs/toolkit';
import _Container from './Container';
import { getSettings } from '../../utils/utils';
import { setSettings } from '../../slices/settingsSlice';







const TimerMain = (typeAr) => {

  const settings = useSelector((state) => state.settingsStore.settings);


  const typeArray = typeAr.typeAr
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!settings){
      console.log('getting settings to State')
      getSettings().then((tempSettings) => {    
        dispatch(setSettings(tempSettings));
        dispatch(setType(tempSettings.defaultTimerType))
      })
    }
  
    }, [])
  
   

  const timeState = useSelector((state) => state.timer.value);
  const timerState = useSelector((state) => state.timer.timer);
  const currentType = useSelector((state) => state.timer.currentType);
  



  const startEvent = () => {
    
    window.postMessage('start', '*')
  }

  const stopEvent = () => {
    window.postMessage('stop', '*')
  }

  const switchEvent = () => {
    window.postMessage('switch', '*')
  }






  return (
    <>
    {settings ? 
      <div className={styles.container}>
      <div className={styles.timerDiv}>
       
 
            <div
              className={`${styles.timerCircle} ${currentType === typeArray.normalTimer
                ? ""
                : styles.timerCirclePomodoro
                }`}
            >
              <div
                className={`${currentType === typeArray.normalTimer
                  ? styles.progressBar
                  : styles.progressBarPomodoro
                  } ${timerState.isStarted && !timerState.isPaused
                    ? styles.progressBarAnimation
                    : null
                  }`}
              ></div>
              <div className={styles.timerText}>
                {timeState.h} : {timeState.m} : {timeState.s}
              </div>
            </div>
       
        </div>


        <div className={styles.buttonsDiv}>
        <button
            className={`${styles.buttonTimer} `}
            onClick={() => {
              startEvent();
            }}
          >
            {(!timerState.isRunning || timerState.isPaused)
              ? "Start " && <PlayArrowIcon fontSize="inherit"/> 
              : "Stop" && <PauseIcon fontSize="inherit"> </PauseIcon>}
          </button>

          <button className={`${styles.buttonTimer} `} onClick={() => {
            stopEvent()}}>
            <StopIcon fontSize="inherit"></StopIcon>
          </button>

          <button
            onClick={() => {
              switchEvent();
            }}
            className={styles.buttonTimer}
          >
            <SwapHoriz fontSize="inherit"/>
          </button>


          
          </div>


      </div>
: <div>waiting...</div>}
    </>
  )
}

export default TimerMain


