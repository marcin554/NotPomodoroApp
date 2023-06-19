import { useDispatch, useSelector } from "react-redux";
import { Timer, Time, TimerOptions } from "timer-node";
import { updateTime, resetTimer } from "../../slices/timerSlice";
import { current } from "@reduxjs/toolkit";
import useCountDown from "react-countdown-hook";
import { FormControlLabel, Switch } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';



import styles from "./TimerMain.module.css";

import {
  TfiControlPlay,
  TfiControlPause,
  TfiControlStop,
  TfiExchangeVertical,
} from "react-icons/tfi";
import { useEffect, useState } from "react";
import { _updateProject, _updateStatus, getSettings, _updateGoal } from "../../utils/utils";
import {_GetSettings} from "../../utils/utils";
import { SwapHoriz } from "@mui/icons-material";
import { setSettings } from "../../slices/settingsSlice";

const timer = new Timer({ label: "Main-Timer" });
const timer2 = new Timer({ label: "Pomodoro-Timer" });



const typeArray = {
  pomodoro: "pomodoro",
  normalTimer: "normalTimer",
};

const getSettings_ = async () => {
  const settings = await getSettings();
  return settings.settings;
};


const typeTimerGoal = {
  none: "none",
  project: "project",
  goal: "goal",
}


let currentDateTime;
let finishDate;

const TimerMain = (settings) => {

  const dispatch = useDispatch();
  dispatch(setSettings(settings.settings));
  let rSettings = useSelector((state) => state.settingsStore.settings);


  let [isPaused, setPause] = useState(false);
  let [isStarted, setStarted] = useState(false);
  let [workingProject, setWorkingProject] = useState(rSettings.defaultProject.workingOn);
  let [workingGoal, setWorkingGoal] = useState(rSettings.defaultGoal.workingOn);


let [currentType, setType] = useState(settings.settings.defaultTimerType);



  // setType(settings_.defaultTimerType);
const initialTime = settings.settings.defaultPomodoroTimerDuration * 60000;
const interval = 500;



  function updateCheck (projectOrGoal) {
    if(projectOrGoal === "project") {
     
  

      setWorkingProject(!workingProject);
    }
    else if(projectOrGoal === "goal") {


      setWorkingGoal(!workingGoal);
    }
    
    _updateStatus(projectOrGoal);
  }






  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    interval
  );
  function changeType() {
    if (!isStarted && !isPaused) {
      if (currentType === typeArray.pomodoro) {

        isPaused = false;
        isStarted = false;
        clearInterval();
        pause();
        reset();
        setType(typeArray.normalTimer);
      } else {
        isPaused = false;
        isStarted = false;
        clearInterval();
        timer.clear();
        setType(typeArray.pomodoro);
      }
    }
    else {
      alert('Please stop the timer first!')
    }
  }

  const stateTime = useSelector((state) => state.timer.value);
  const sessionRecords = useSelector((state) => state.sessionStore);

  

  const handleStoreSet = (testSession) => {
    window.electronAPI.store.set("session", testSession);
  };

  

  function createSession(tStart, tEnd, duration) {
  

    let typeTimer;
    let projectName;
    let goalName; 

    if (settings.settings.defaultProject.workingOn === true || settings.settings.defaultGoal.workingOn === true) {
      if(settings.settings.defaultProject.workingOn === true) {
        typeTimer = typeTimerGoal.project
         projectName = settings.settings.defaultProject.projectName
      }
      else {
        projectName = "none";
         typeTimer = typeTimerGoal.none
       }
    
      if(settings.settings.defaultGoal.workingOn === true) {
        typeTimer = typeTimerGoal.goal
         goalName = settings.settings.defaultGoal.goalName
      }
      else {
        goalName = "none";
         typeTimer = typeTimerGoal.none
       }
    

    }

    let session = {
      timerType: currentType,
      timeStart: tStart.toString(),
      timeEnd: tEnd.toString(),
      timeDuration: duration,
      timerGoal: typeTimer,
      timerProjectName: projectName,
      timerGoalName: goalName,

    };

    (currentType);
      if (currentType === typeArray.normalTimer) {

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
      else if (currentType = typeArray.pomodoro) {
        session.timeDuration = timeFromPomodoro(session.timeDuration);

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


  function timeFromPomodoro (time) {
    let newTime = time;

    newTime.m = settings.settings.defaultPomodoroTimerDuration - time.m -1;
    newTime.s = 60 - time.s;


    return newTime;


  }


  useEffect(() => {
    updateTimerDisplay(timeLeft);
  }, [timeLeft]);



  function getFinishedFormatedDate() {
    finishDate = new Date();

    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDate = finishDate.toLocaleString("en-US", options);

    return formattedDate;

  }

  function getCurrentFormatedDate() {


    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDate = currentDateTime.toLocaleString("en-US", options);

    return formattedDate;

  }
  function startThePomodoroTimer() {

    if (!isStarted) {
      clearInterval();
      start();
      setStarted(true);
      currentDateTime = new Date();

    }
    else if (isStarted === true && isPaused === true) {
      resume();
      setPause(false);
    }
    else if (isStarted === true && !isPaused) {

      createSession(
        getCurrentFormatedDate(),
        getFinishedFormatedDate(),
        changeToMinutes(timeLeft)
      );

      clearInterval();
      reset();
      dispatch(resetTimer());

      setStarted(false);

    }

  }
  function startButton() {

    if (currentType === typeArray.pomodoro) {
      startThePomodoroTimer();
    }
    else {
      startTheNormalTime();
    }
  }
  function startTheNormalTime() {



    if (!timer.isStarted() && !timer.isRunning()) {
      ('started!')
      clearInterval();
      currentDateTime = new Date();
      timer.start();
      (timer.time())
      setInterval(updateTimerDisplay, 200);
      setStarted(true);
    }
    else if (timer.isRunning() && !timer.isPaused()) {


      createSession(
        getCurrentFormatedDate(),
        getFinishedFormatedDate(),
        timer.time(),

      );

      setStarted(false);
      timer.stop();
      timer.clear();

      dispatch(resetTimer());
      dispatch(updateTime(timer.time()));
    }
    else if (timer.isPaused()) {
      setPause(false);
      ('abc')

      timer.resume();

    }




  }





  function pauseButton() {
    if (currentType === typeArray.pomodoro) {
      setPause(true);
      pause();
    } else if (currentType === typeArray.normalTimer) {
      setPause(true);
      timer.pause();


    }
  }

  function changeToMinutes(time) {
    const remainingTime = time;

    const milliseconds = remainingTime % 1000;
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const formattedTime = {
      ms: milliseconds,
      s: seconds,
      m: minutes,
      h: hours,
      d: days,
    };

    return formattedTime;
  }
  function updateTimerDisplay(atimeLeft) {

    if (currentType === typeArray.pomodoro && !isPaused) {
      dispatch(updateTime(changeToMinutes(atimeLeft)));

    } else if (!timer.isPaused() && timer.isRunning()) {
      (timer.time());
      dispatch(updateTime(timer.time()));
    }
  }

  function checkStatus() {
    ("Is paused?", timer.isPaused());
    ("Is running?", timer.isRunning());
    ("Is started?", timer.isStarted());
    ("Current session list", sessionRecords);
    (stateTime);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.timerDiv}>
          {stateTime != null ? (
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
                  } ${isStarted && !isPaused
                    ? styles.progressBarAnimation
                    : null
                  }`}
              ></div>
              <div className={styles.timerText}>
                {stateTime.h} : {stateTime.m} : {stateTime.s}
              </div>
            </div>
          ) : null}
        </div>

        <div className={styles.buttonsDiv}>
          {/* <button
            className={`${styles.buttonTimer} `}
            onClick={() => {
              checkStatus();
            }}
          >
            Check Status
          </button> */}
          <button
            className={`${styles.buttonTimer} `}
            onClick={() => {
              startButton();
            }}
          >
            {(!timer.isRunning() || timer.isPaused()) && timeLeft === 0
              ? "Start " && <PlayArrowIcon fontSize="inherit"/> 
              : "Stop" && <StopIcon fontSize="inherit"> </StopIcon>}
          </button>
          <button
            className={`${styles.buttonTimer} `}
            onClick={() => {
              pauseButton();
            }}
          >
            <PauseIcon fontSize="inherit" />
          </button>
          <button
            onClick={() => {
              changeType();
            }}
            className={styles.buttonTimer}
          >
            <SwapHoriz fontSize="inherit"/>
          </button>

          <div  className={`${styles.buttonTimerSwitch} `} >
            <FormControlLabel control ={<Switch checked={workingProject}color="warning" onClick={() => {updateCheck('project') }}/>} label={rSettings.defaultProject.projectName + "  Project"}> </FormControlLabel>
            
            <FormControlLabel control ={<Switch checked={workingGoal} onClick={() => {updateCheck('goal')}} />} label={rSettings.defaultGoal.goalName + "  Goal"} > </FormControlLabel>
        
          </div>
        </div>
      </div>
      
    </>
    
  );
};



export default TimerMain;
