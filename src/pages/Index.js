import React, { useEffect, useRef, useState } from 'react'
import TimerMain from './components/TimerMain'
import _Container from './components/Container'

import styles from './Index.module.css'
import { _GetSettings } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { _getSettings, setSettings } from '../slices/settingsSlice'
import { getSettings } from '../utils/utils'
import { setType, updateIsPaused, updateIsRunning, updateIsStarted, updateTime } from '../slices/timerSlice'
import TimerUtils, { _getTime } from '../utils/timer'
import useCountDown from 'react-countdown-hook'
import TimerMainMini from './components/TimerMainMini'
import { Button } from '@mui/base'



import { Timer } from 'timer-node'
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



function TheTimer() {
  const dispatch = useDispatch();
  const normalTimer = new Timer({ label: "normalTimer" });
  const [timeLeft, { start, pause, resume, reset, }] = useCountDown(
    600000,
    500
  );
  //Get Settings from state.
  let settings = useSelector((state) => state.settingsStore.settings);


  const timer = TimerUtils(settings, { timeLeft, start, pause, resume, reset }, normalTimer);


  useEffect(() => {
    dispatch(updateTime(timer.pomodoro.getTime()));
  }, [timeLeft]);



  return timer;

}



let timerState2; 
let currentType2;

const Index = () => {
  const timer = TheTimer();
  const dispatch = useDispatch();



  // const settings = useSelector((state) => state.settingsStore.settings);
  // const timeState = useSelector((state) => state.timer.value);
  const timerState = useSelector((state) => state.timer.timer);
  const currentType = useSelector((state) => state.timer.currentType);



  useEffect(() => {
    timerState2 = timerState;
    currentType2 = currentType;
  }, [])


  useEffect(() => {
    timerState2 = timerState;
    currentType2 = currentType;
  }, [timerState, currentType])



  function handleTimer(event) {





    switch (event.data) {
      case 'start':
        {

          startTimer();
          break;
        }
      case 'stop': {
        stopTimer();
        break;
      }
      case 'switch': {

        switchTimer();
        break
      }
    }
  }

  function startTimer() {

    if (currentType2 === typeArray.pomodoro) {
   
      startPomodoroTimer();
    }
    else {

      startNormalTimer();

    }


  }

  function startNormalTimer() {

    if (currentType2 === typeArray.normalTimer) {

      if (!timerState2.isStarted) {

        timer.normalTimer.start();
        dispatch(updateIsStarted(true));
        dispatch(updateIsRunning(true));


        if (!intervalId) {

          intervalId = setInterval(() => {

            dispatch(updateTime(timer.normalTimer.getTime()));
          }, 1000);


        }

      }

      if (timerState2.isRunning) {

        timer.normalTimer.pause();
        dispatch(updateIsPaused(true));
        dispatch(updateIsRunning(false));
      }

      if (timerState2.isPaused) {
        timer.normalTimer.resume();
        dispatch(updateIsPaused(false));
        dispatch(updateIsRunning(true));
      }

    }
  }

  function stopTimer() {

    if (currentType2 === typeArray.normalTimer) {
      if (timerState2.isStarted) {
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
    else {
      if (timerState2.isStarted) {
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





  function startPomodoroTimer() {


    if (!timerState2.isStarted) {

      timer.pomodoro.start();
      dispatch(updateIsStarted(true));
      dispatch(updateIsRunning(true));
    }

    if (timerState2.isRunning) {
      timer.pomodoro.pause();
      dispatch(updateIsPaused(true));
      dispatch(updateIsRunning(false));
    }

    if (timerState2.isPaused) {
      timer.pomodoro.resume();
      dispatch(updateIsPaused(false));
      dispatch(updateIsRunning(true));
    }


  }


  function switchTimer() {

    if (!timerState2.isStarted && !timerState2.isPaused) {

      if (currentType2 === typeArray.normalTimer) {

        dispatch(setType(typeArray.pomodoro));
      }
      else {

        dispatch(setType(typeArray.normalTimer));
      }
    }
    else {
      alert("Please stop the timer before changing the type");
    }



  }





  useEffect(() => {
    window.addEventListener('message', handleTimer);

    return () => {
      window.removeEventListener('message', handleTimer);
    }
  }, [])

 




  return (
    <>


      <div className={styles.container}>

        <_Container ComponentPage={ timerState ? <div> <TimerMain typeAr={typeArray} /> </div> : <div>Loading...</div>}>

        </_Container>

        <Button onClick={() =>
          window.open('/mini', '_blank', 'top=500,left=200, width=300,height=80, frame= false, nodeIntegration=true, resizable=no, alwaysOnTop=yes')

        } >Abc</Button>








      </div>

    </>
  )
}

export default Index