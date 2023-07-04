
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./TimerMainMini.module.css";


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

const TimerMainMini = () => {
  const timeState = useSelector((state) => state.timer.value);
  const startEvent = () => {
    
    window.opener.postMessage('start', '*')
  }

  const stopEvent = () => {
    window.opener.postMessage('stop', '*')
  }

  const switchEvent = () => {
    window.opener.postMessage('switch', '*')
  }

  
 


  return (

    <div className={styles.container} >

      <div className={styles.gridItem}>
        <button className={styles.buttons} onClick={() => startEvent()}>Start </button>
      </div>

       
      <div className={styles.gridItem}>
        <button className={styles.buttons } onClick={() => stopEvent()}>Stop </button>

      </div>
      
      <div className={styles.gridItem}>
        <button className={styles.buttons} onClick={() => switchEvent()} >Switch </button>

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
