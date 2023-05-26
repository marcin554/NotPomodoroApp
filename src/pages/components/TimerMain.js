import { useDispatch, useSelector } from "react-redux";
import { Timer, Time, TimerOptions } from "timer-node";
import { updateTime, resetTimer } from "../../slices/timerSlice";
import { current } from "@reduxjs/toolkit";

import styles from "./TimerMain.module.css";

import { TfiControlPlay, TfiControlPause, TfiControlStop, TfiExchangeVertical} from "react-icons/tfi";



const timer = new Timer({ label: "Main-Timer" });
const timer2 = new Timer({ label: "Pomodoro-Timer" });

let currentDateTime;
let finishDate;

const TimerMain = () => {
  const stateTime = useSelector((state) => state.timer.value);
  const sessionRecords = useSelector((state) => state.sessionStore);

  const dispatch = useDispatch();

  const handleStoreSet = (testSession) => {
    window.electronAPI.store.set('session', testSession);
  };

  const handleStoreGet = async () => {
    try {
      
      const value = await window.electronAPI.store.get('sessions');
      console.log(value);
    } catch (error) {
      console.error(error);
    }
  };


  function createSession(tStart, tEnd, duration) {
    let session = {
      timeStart: tStart.toString(),
      timeEnd: tEnd.toString(),
      timeDuration: duration,
    };

    handleStoreSet(session);



    return session;
  }

  function startButton() {
    if (timer.isStarted()) {
      if (timer.isRunning() && !timer.isPaused()) {
        finishDate = new Date();

        const options = {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        };
        const formattedDate = finishDate.toLocaleString("en-US", options);

        const session = createSession(
          currentDateTime,
          formattedDate,
          timer.time()
        );

        timer.stop();
        timer.clear();

    
        clearInterval();
        dispatch(resetTimer());
      } else if (timer.isPaused()) {
        timer.resume();
      }
    } else {
      clearInterval();
      const date = new Date();

      const options = {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      const formattedDate = date.toLocaleString("en-US", options);

      currentDateTime = formattedDate;
      timer.start();

      setInterval(updateTimerDisplay, 200);
    }
  }

  function pauseButton() {
    timer.pause();
    clearInterval();
  }

  function checkStatus() {
    console.log("Is paused?", timer.isPaused());
    console.log("Is running?", timer.isRunning());
    console.log("Is started?", timer.isStarted());
    console.log("Current session list", sessionRecords);
    console.log(stateTime);
  }

  function updateTimerDisplay() {
    dispatch(updateTime(timer.time()));
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.timerDiv}>
          {stateTime != null ? (
            <div className={styles.timerCircle}>
              <div
                className={`${styles.progressBar} ${
                  timer.isRunning() ? styles.progressBarAnimation : ""
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
            
            {timer.isRunning() !== true ? "Start " && <TfiControlPlay className={styles.middleIcon} /> : "Stop" && <TfiControlStop className={styles.middleIcon}/>}
          </button>
          <button
            className={`${styles.buttonTimer} `}
            onClick={() => {
              pauseButton();
            }}
          >
            <TfiControlPause className={styles.middleIcon} />
           
          </button>
          <button className={styles.buttonTimer}>
 
            <TfiExchangeVertical className={styles.middleIcon}/>
          </button>
        </div>

        
      </div>
    </>
  );
};

export default TimerMain;
