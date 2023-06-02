import { useDispatch, useSelector } from "react-redux";
import { Timer, Time, TimerOptions } from "timer-node";
import { updateTime, resetTimer } from "../../slices/timerSlice";
import { current } from "@reduxjs/toolkit";
import useCountDown from "react-countdown-hook";


import styles from "./TimerMain.module.css";

import {
  TfiControlPlay,
  TfiControlPause,
  TfiControlStop,
  TfiExchangeVertical,
} from "react-icons/tfi";
import { useEffect, useState } from "react";
import { getSettings } from "../../utils/utils";
import {_GetSettings} from "../../utils/utils";

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

  let [isPaused, setPause] = useState(false);
  let [isStarted, setStarted] = useState(false);



let [currentType, setType] = useState(settings.settings.defaultTimerType);



  // setType(settings_.defaultTimerType);
const initialTime = settings.settings.defaultPomodoroTimerDuration * 60000;
const interval = 500;









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

  const dispatch = useDispatch();

  const handleStoreSet = (testSession) => {
    window.electronAPI.store.set("session", testSession);
  };

  

  function createSession(tStart, tEnd, duration) {
  

    let typeTimer;
    let projectName; 

    if(settings.settings.defaultProject.workingOn === true) {
     typeTimer = typeTimerGoal.project
      projectName = settings.settings.defaultProject.projectName
   }
   else if(settings.settings.defaultGoal.workingOn === true) {
     typeTimer = typeTimerGoal.goal
      projectName = settings.settings.defaultGoal.goalName
   }
   else {
    projectName = "none";
     typeTimer = typeTimerGoal.none
   }

    let session = {
      timerType: currentType,
      timeStart: tStart.toString(),
      timeEnd: tEnd.toString(),
      timeDuration: duration,
      timerGoal: typeTimer,
      timerProjectName: projectName,

    };

    handleStoreSet(session);

    return session;
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
      console.log('started!')
      clearInterval();
      currentDateTime = new Date();
      timer.start();
      console.log(timer.time())
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
      console.log('abc')

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
      console.log(timer.time());
      dispatch(updateTime(timer.time()));
    }
  }

  function checkStatus() {
    console.log("Is paused?", timer.isPaused());
    console.log("Is running?", timer.isRunning());
    console.log("Is started?", timer.isStarted());
    console.log("Current session list", sessionRecords);
    console.log(stateTime);
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
                    : ""
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
              ? "Start " && <TfiControlPlay className={styles.middleIcon} />
              : "Stop" && <TfiControlStop className={styles.middleIcon} />}
          </button>
          <button
            className={`${styles.buttonTimer} `}
            onClick={() => {
              pauseButton();
            }}
          >
            <TfiControlPause className={styles.middleIcon} />
          </button>
          <button
            onClick={() => {
              changeType();
            }}
            className={styles.buttonTimer}
          >
            <TfiExchangeVertical className={styles.middleIcon} />
          </button>

          <form className="styles.buttonTimer">
a
          </form>
        </div>
      </div>
      
    </>
    
  );
};



export default TimerMain;
