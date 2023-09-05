import React, { useEffect, useRef, useState } from 'react'
import TimerMain from './components/TimerMain'
import _Container from './components/Container'

import styles from './Index.module.css'
import { _GetSettings, _updateGoal, _updateProject } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { _getSettings, setSettings } from '../slices/settingsSlice'
import { getSettings } from '../utils/utils'
import { setCommandBoolean, setTimeStart, setType, updateIsPaused, updateIsRunning, updateIsStarted, updateTime } from '../slices/timerSlice'
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
let booleanIntervalId;

export function TheTimer(pomodoroDefaultTime) {
  
  const dispatch = useDispatch();
  const normalTimer = new Timer({ label: "normalTimer" });
  
  //Get Settings from state.
  const settings = useSelector((state) => state.settingsStore.settings);

  

  
  
  const [timeLeft, { start, pause, resume, reset, }] = useCountDown(
    settings.defaultPomodoroTimerDuration * 60000,
    1000,
    
  );
  const timer = TimerUtils(settings, { timeLeft, start, pause, resume, reset }, normalTimer);


  useEffect(() => {
    dispatch(updateTime(timer.pomodoro.getTime()));
  }, [timeLeft]);



  return timer;

}



let timerState2;
let currentType2;
let _settings;
let _booleanCommand;
let _commandToRun;
let _timeState;
let _dateOfStart;
const Index = ({timer}) => {

 
  
  



  const dispatch = useDispatch();



  // const settings = useSelector((state) => state.settingsStore.settings);
  // const timeState = useSelector((state) => state.timer.value);
  const timerState = useSelector((state) => state.timer.timer);
  const currentType = useSelector((state) => state.timer.currentType);
  const settings = useSelector((state) => state.settingsStore.settings);
  const timeState = useSelector((state) => state.timer.value)
  const booleanCommand = useSelector((state) => state.timer.command.toRun)
  const commandToRun = useSelector((state) => state.timer.command.commandToRun)
 const  dateOfStart = useSelector((state) => state.timer.timeStart)
 
  //Please forgive me for this.
  useEffect(() => {
    timerState2 = timerState;
    currentType2 = currentType;
    _settings = settings;
    _timeState = timeState;
    _booleanCommand = booleanCommand;
    _commandToRun = commandToRun;
    _dateOfStart = dateOfStart;
  }, [])


  useEffect(() => {
    timerState2 = timerState;
    currentType2 = currentType;
    _settings = settings;
    _timeState = timeState;
    _booleanCommand = booleanCommand;
    _commandToRun = commandToRun;
    _dateOfStart = dateOfStart;
  }, [timerState, currentType, settings, timeState, booleanCommand, commandToRun])

  const handleStoreSet = (session) => {
 
    window.electronAPI.store.set("session", session);
  };


  function handleTimer(event) {





    switch (event) {
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
      default:
        break;
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
          let sessionInfo = timer.normalTimer.stop();
        
         
          createSession(sessionInfo._currentDateTime, sessionInfo.finishedDate, _timeState);
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
          
         
          let sessionInfo = timer.pomodoro.stop(_dateOfStart);
         
          createSession(sessionInfo._currentDateTime, sessionInfo.finishedDate,  timer.pomodoro.timeFromPomodoro(_settings.defaultPomodoroTimerDuration, {_timeState}));
          
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


    //Create Session and update goal and project.

    function startPomodoroTimer() {


      if (!timerState2.isStarted) {

        timer.pomodoro.start();
        dispatch(setTimeStart(Date.now()))
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
        alert("Please stop the timer before changing the type.");
      }



    }
  }

  function createSession(tStart, tEnd, duration) {

 
    let typeTimer;
    let projectName;
    let goalName;

  
    if (_settings) {
  
      if (_settings.defaultProject.workingOn === true || _settings.defaultGoal.workingOn === true) {
        if (_settings.defaultProject.workingOn === true) {
          typeTimer = typeTimerGoal.project
          projectName = _settings.defaultProject.projectName
        }
        else {
          projectName = "none";
          typeTimer = typeTimerGoal.none
        }

        if (_settings.defaultGoal.workingOn === true) {
          typeTimer = typeTimerGoal.goal

          goalName = _settings.defaultGoal.goalName
        }
        else {
          goalName = "none";
          typeTimer = typeTimerGoal.none
        }


      }



    }
   

    
    let session = {
      timerType: currentType2,
      timeStart: tStart,
      timeEnd: tEnd,
      timeDuration: duration,
      timerProjectName: projectName,
      timerGoalName: goalName,

    };

    

    if (currentType2 === typeArray.normalTimer) {

      if (typeTimer === typeTimerGoal.project || typeTimer === typeTimerGoal.goal) {
        if (typeTimer === typeTimerGoal.project) {
          _updateProject(session);
        }
        if (typeTimer === typeTimerGoal.goal) {
          _updateGoal(session);
        }
      }
      handleStoreSet(session);

    }
    else if (currentType2 === typeArray.pomodoro) {


      if (typeTimer === typeTimerGoal.project || typeTimer === typeTimerGoal.goal) {
        if (typeTimer === typeTimerGoal.project) {
          _updateProject(session);
        }
        if (typeTimer === typeTimerGoal.goal) {
          _updateGoal(session);
        }
      }
      handleStoreSet(session);
    }

    return session;

  }


  function listenerHandleTimer(event) {
  
    // setTimeout(() => {
    //  const message =  window.electronAPI.store.getMessage();

    //   handleTimer(message)
    // }, 1000)

  }
 
  // const booleanCommand = useSelector((state) => state.timer.command.toRun)
  // const commandToRun = useSelector((state) => state.timer.command.commandToRun)

  function updateCommandState() {

    if(_booleanCommand === true) {
      handleTimer(_commandToRun)
      dispatch(setCommandBoolean(false))
    } 
  }

  if (!booleanIntervalId) {

    booleanIntervalId = setInterval(() => {

      updateCommandState()
    }, 500);


  }





  return (
    <>


      <div className={styles.container}>

        <_Container ComponentPage={timerState ? <div> <TimerMain typeAr={typeArray} /> </div> : <div>Loading...</div>}>

        </_Container>










      </div>

    </>
  )
}

export default Index