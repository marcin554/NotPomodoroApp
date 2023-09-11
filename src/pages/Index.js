import React, { useEffect} from 'react'
import TimerMain from './components/TimerMain'
import _Container from './components/Container'

import styles from './Index.module.css'
import {  _updateGoal, _updateProject } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux'

import { setCommandBoolean, setCommandToRun, setTimeStart, setType, updateIsPaused, updateIsRunning, updateIsStarted, updateTime } from '../slices/timerSlice'
import TimerUtils from '../utils/timer'
import useCountDown from 'react-countdown-hook'



import { Timer } from 'timer-node'
import { setBool, setMessage } from '../slices/applicationSlice'

const typeArray = {
  pomodoro: "pomodoro",
  normalTimer: "normalTimer",
};

const typeTimerGoal = {
  none: "none",
  project: "project",
  goal: "goal",
  both: "both",
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
 
  //Please forgive me for this. Should go over it again, but its really annoying to fix so im leaving it to be for now. Its hitting optimalization a bit so its going to be needed fixed at some point.
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

  useEffect(() => {
    console.log(timeState)
    if(currentType2 === typeArray.pomodoro && timerState.isRunning && parseInt(_timeState.h) <= 0 && parseInt(_timeState.m) <= 0 &&  parseInt(_timeState.s) <= 1){
      dispatch(setBool(true)); 
      dispatch(setMessage('You finished your pomodoro round!'))
      dispatch(setCommandToRun('stop'))
      dispatch(setCommandBoolean(true))
    }
  }, [_timeState])

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
        dispatch(setBool(false)); 
        dispatch(setMessage('You need first to stop the current Timer.'))
      
      }



    }
  }

  function createSession(tStart, tEnd, duration) {

 
    let typeTimer;
    let projectName;
    let goalName;

  
    if (_settings) {
  
      if (_settings.defaultProject.workingOn === true || _settings.defaultGoal.workingOn === true) {

        if(_settings.defaultProject.workingOn === true && _settings.defaultGoal.workingOn === true){
          typeTimer = typeTimerGoal.both;
          projectName = _settings.defaultProject.projectName
          goalName = _settings.defaultGoal.goalName
        }
        else if(_settings.defaultProject.workingOn === true ){
          typeTimer = typeTimerGoal.project
          projectName = _settings.defaultProject.projectName
        }
        else if(_settings.defaultGoal.workingOn === true){
          typeTimer = typeTimerGoal.goal

          goalName = _settings.defaultGoal.goalName
        }
        else{
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

      if (typeTimer !== typeTimerGoal.none) {
        if (typeTimer === typeTimerGoal.both){
          _updateProject(session);
          _updateGoal(session);
        }
        else if (typeTimer === typeTimerGoal.project) {
          _updateProject(session);
        }
        else if (typeTimer === typeTimerGoal.goal) {
          _updateGoal(session);
        }
      }
      handleStoreSet(session);

    }
    else if (currentType2 === typeArray.pomodoro) {


      if (typeTimer !== typeTimerGoal.none) {
        if (typeTimer === typeTimerGoal.both){
          _updateProject(session);
          _updateGoal(session);
        }
        else if (typeTimer === typeTimerGoal.project) {
          _updateProject(session);
        }
        else if (typeTimer === typeTimerGoal.goal) {
          _updateGoal(session);
        }
      }
      handleStoreSet(session);
    }

    return session;

  }



  // const booleanCommand = useSelector((state) => state.timer.command.toRun)
  // const commandToRun = useSelector((state) => state.timer.command.commandToRun)

  // Set interval and do actions if state changed (if_booleanCommand is true, then set it off after the action did run)
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