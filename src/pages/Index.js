import React, { useEffect, useRef, useState } from 'react'
import TimerMain from './components/TimerMain'
import _Container from './components/Container'

import styles from './Index.module.css'
import { _GetSettings } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { _getSettings, setSettings } from '../slices/settingsSlice'
import { getSettings } from '../utils/utils'
import { setType, updateTime } from '../slices/timerSlice'
import TimerUtils, { _getTime } from '../utils/timer'
import useCountDown from 'react-countdown-hook'
import TimerMainMini from './components/TimerMainMini'
import { Button } from '@mui/base'

import ReactDOM from 'react-dom'
let intervalId;

//q: why when i apply float:left on * it works but when i try to apply it on .container it dosnt?
const Index = (_timer) => {


  const timer = _timer._timer;
  



  
  

  return (
    <>


    <div className={styles.container}>

    <_Container ComponentPage={timer ? <TimerMain _timer={timer} /> : <div>Waiting...</div>}> 
  
     </_Container>

    <Button onClick={() => 
     window.open('/mini', '_blank', 'top=500,left=200, width=300,height=80, frame= false, nodeIntegration=no, resizable=no, alwaysOnTop=yes')
    } >Abc</Button>
  
    

     
  
  
  

    </div>

    </>
  )
}

export default Index