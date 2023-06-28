import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setState } from '../../slices/sessionStoreSlice';
import styles from "./TimerMainMini.module.css";
import { Button, Container } from '@mui/material';
import { updateIsPaused, updateIsRunning, updateIsStarted, updateTime } from '../../slices/timerSlice';
import { current } from '@reduxjs/toolkit';

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

const TimerMainMini = (_timer) => {


  
  const timer = _timer._timer;
  console.log(timer)
  const dispatch = useDispatch();
  const timeState = useSelector((state) => state.timer.value);

  const settings = useSelector((state) => state.settingsStore.settings);
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


  return (

    <div className={styles.container} >

      <div className={styles.gridItem}>
        <button className={styles.buttons} onClick={() => startTimer()}>Start </button>
      </div>

        <div className={styles.gridItem}>
        <div className={styles.buttons}>Pause </div>

      </div>
      <div className={styles.gridItem}>
        <div className={styles.buttons}>Stop </div>

      </div>

      <div className={styles.gridItem}>
      <div className={styles.timer}>
        {timeState.h} : {timeState.m} : {timeState.s}
      </div>
     </div>
      

    </div>

  )
}

export default TimerMainMini
