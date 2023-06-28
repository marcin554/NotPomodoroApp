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




const typeArray = {
  pomodoro: "pomodoro",
  normalTimer: "normalTimer",
};

const typeTimerGoal = {
  none: "none",
  project: "project",
  goal: "goal",
}

let intervalId;

const TimerMain = (_timer) => {

  let timer = _timer._timer;
  const dispatch = useDispatch();
  

  const settings = useSelector((state) => state.settingsStore.settings);
  const timeState = useSelector((state) => state.timer.value);
  const timerState = useSelector((state) => state.timer.timer);
  const currentType = useSelector((state) => state.timer.currentType);
  
 





  function startTimer() {
    if(currentType === typeArray.pomodoro) {
      startPomodoroTimer();
    }
    else{
      startNormalTimer();

    }


  }
  function startNormalTimer() {

    if(currentType === typeArray.normalTimer) {
    
    if(!timerState.isStarted){
      timer.normalTimer.start();
      dispatch(updateIsStarted(true));
      dispatch(updateIsRunning(true));

    }

    if(timerState.isRunning) {
      timer.normalTimer.pause();
      dispatch(updateIsPaused(true));
      dispatch(updateIsRunning(false));
    } 

    if(timerState.isPaused) {
      timer.normalTimer.resume();
      dispatch(updateIsPaused(false));
      dispatch(updateIsRunning(true));
    }

  }
 

    if(!intervalId) {
     
      intervalId = setInterval(() => {
        console.log('abc')
        console.log('normalTimer', timer.normalTimer.getTime());
        dispatch(updateTime(timer.normalTimer.getTime()));
      }, 1000);

    
    }


   
   
  }




  function startPomodoroTimer() {

    
    if(!timerState.isStarted){
      timer.pomodoro.start();
      dispatch(updateIsStarted(true));
      dispatch(updateIsRunning(true));
    }

    if(timerState.isRunning) {
      timer.pomodoro.pause();
      dispatch(updateIsPaused(true));
      dispatch(updateIsRunning(false));
    }

    if(timerState.isPaused) {
      timer.pomodoro.resume();
      dispatch(updateIsPaused(false));
      dispatch(updateIsRunning(true));
    }

    // if(!intervalId) {
    // intervalId = setInterval(() => {
    
    //   dispatch(updateTime(timer.pomodoro.getTime()));
    // }, 1000);
  // }
  }

  function stopButton() {

    if(currentType === typeArray.normalTimer) {
    if(timerState.isStarted) {
      timer.normalTimer.stop();
      dispatch(updateIsRunning(false));
      dispatch(updateIsStarted(false));
      dispatch(updateIsPaused(false));

     
      setTimeout(() => {
        clearInterval(intervalId);
        intervalId = null;
      }, 1000);
    }


    }
    else{
      if(timerState.isStarted) {
        timer.pomodoro.stop();
        dispatch(updateIsRunning(false));
        dispatch(updateIsStarted(false));
        dispatch(updateIsPaused(false));
  
  
        setTimeout(() => {
          clearInterval(intervalId);
          intervalId = null;
        }, 1000);
      }
    }
  }

  function changeType() {
    
    if (!timerState.isStarted && !timerState.isPaused) {
    if(currentType === typeArray.normalTimer){
      dispatch(setType(typeArray.pomodoro));
    }
    else{
      dispatch(setType(typeArray.normalTimer));
    }
  }
  else{
    alert("Please stop the timer before changing the type");
  }

   
    
  }


  return (
    <>
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
              startTimer();
            }}
          >
            {(!timerState.isRunning || timer.isPaused)
              ? "Start " && <PlayArrowIcon fontSize="inherit"/> 
              : "Stop" && <PauseIcon fontSize="inherit"> </PauseIcon>}
          </button>

          <button className={`${styles.buttonTimer} `} onClick={() => {
            stopButton()}}>
            <StopIcon fontSize="inherit"></StopIcon>
          </button>

          <button
            onClick={() => {
              changeType();
            }}
            className={styles.buttonTimer}
          >
            <SwapHoriz fontSize="inherit"/>
          </button>


          
          </div>


      </div>

    </>
  )
}

export default TimerMain


