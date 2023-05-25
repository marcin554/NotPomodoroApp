import React from 'react'
import TimerMain from './components/TimerMain'

import SessionTable from './components/SessionTable'
import { useDispatch, useSelector } from 'react-redux'
import styles from './SessionIndex.module.css'


const SessionIndex = () => {
    const sessionRecords = useSelector((state) => state.sessionStore);


    const dispatch = useDispatch();
  return (
    <>
    <div className={styles.container}>
     <SessionTable sessionObject={sessionRecords}/>
    </div>
    </>
  )
}

export default SessionIndex