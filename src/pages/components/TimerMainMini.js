
import { useDispatch, useSelector } from 'react-redux'
import styles from "./TimerMainMini.module.css";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import { SwapHoriz } from "@mui/icons-material";
import { setCommandBoolean, setCommandToRun } from '../../slices/timerSlice';


const typeArray = {
  pomodoro: "pomodoro",
  normalTimer: "normalTimer",
};





const TimerMainMini = () => {

  const dispatch = useDispatch();
  const timeState = useSelector((state) => state.timer.value);
  const timerState = useSelector((state) => state.timer.timer);
  const currentType = useSelector((state) => state.timer.currentType);

  const startEvent = () => {
    dispatch(setCommandToRun('start'))
    dispatch(setCommandBoolean(true))

  }

  const stopEvent = () => {
    dispatch(setCommandToRun('stop'))
    dispatch(setCommandBoolean(true))
  }

  const switchEvent = () => {
    dispatch(setCommandToRun('switch'))
    dispatch(setCommandBoolean(true))
  }



 
 


  return (
 <>

    <div className={styles.container} >

      <div className={styles.gridItem}>
        <button className={currentType === typeArray.normalTimer ? styles.buttons : styles.buttonsPomodoro} onClick={() => startEvent()}> {timerState.isRunning ? <PauseIcon /> : <PlayArrowIcon />}
        
    </button>
      </div>

       
      <div className={styles.gridItem}>
        <button className={currentType === typeArray.normalTimer ? styles.buttons : styles.buttonsPomodoro} onClick={() => stopEvent()}><StopIcon /> </button>

      </div>
      
      <div className={styles.gridItem}>
        <button className={currentType === typeArray.normalTimer ? styles.buttons : styles.buttonsPomodoro} onClick={() => switchEvent()} ><SwapHoriz /> </button>

      </div>

      <div className={styles.timer}>
        <div >
          {timeState.h} : {timeState.m} : {timeState.s}
          <div className={
      timerState.isRunning && currentType === typeArray.normalTimer ? styles.animation :
      timerState.isRunning && currentType === typeArray.pomodoro ? styles.animationPomodoro :
      ''
    }></div>

        </div>
      </div>
      

    </div>

    </>
  )
}

export default TimerMainMini
