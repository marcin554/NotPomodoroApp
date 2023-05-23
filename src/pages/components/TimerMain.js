import { useDispatch, useSelector } from "react-redux";
import { Timer, Time, TimerOptions } from "timer-node";
import { updateTime, resetTimer } from "../../slices/timerSlice";
import { current } from "@reduxjs/toolkit";
import { addEntryToSessionList } from "../../slices/sessionStoreSlice";
import styles from './TimerMain.module.css'

const timer = new Timer({ label: "Main-Timer" });
let list = [];

let currentDateTime;
let finishDate;

const TimerMain = () => {
  const stateTime = useSelector((state) => state.timer.value);
  const sessionRecords = useSelector((state) => state.sessionStore);


  const dispatch = useDispatch();



  function createSession(tStart, tEnd, duration) {
    let session = {
      timeStart: tStart.toString(),
      timeEnd: tEnd.toString(),
      timeDuration: duration,
    };

    return session;
  }

  function startButton() {
    if (timer.isStarted()) {
      if (timer.isRunning() && !timer.isPaused()) {
        finishDate = new Date();

        const options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
        const formattedDate = finishDate.toLocaleString("en-US", options);

        const session = createSession(
          currentDateTime,
          formattedDate,
          timer.time()
        );


        timer.stop();
        timer.clear();

        
        dispatch(addEntryToSessionList(session))
        clearInterval();
        dispatch(resetTimer());
      } else if (timer.isPaused()) {
        timer.resume();
      }
    } else {
      clearInterval();
      const date = new Date()

      const options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
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
    < >
    <div className={styles.container}>

    
      <button
        onClick={() => {
          checkStatus();
        }}
      >
        Check Status
      </button>
      <button
        onClick={() => {
          startButton();
        }}
      >
        {timer.isRunning() !== true ? "Start" : "Stop"}
      </button>
      <button
        onClick={() => {
          pauseButton();
        }}
      >
        Pause
      </button>
      {stateTime != null ? (
        <div>
          {stateTime.h} : {stateTime.m} : {stateTime.s}
        </div>
      ) : null}


<div>

  Sessions:
  <br></br>
  {sessionRecords != null && sessionRecords.map((element, index) => (
<div >
  {index} <br></br>
    <span>Duration:{ element.timeDuration.h} : { element.timeDuration.m} : { element.timeDuration.s} ||||</span>
    <span>Time Start: { element.timeStart} ||||</span>
    <span>Time End: { element.timeEnd}|||| </span>

</div>
))}
</div>

      </div>
    </>
  );
};

export default TimerMain;
