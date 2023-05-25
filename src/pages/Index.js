import React from 'react'
import TimerMain from './components/TimerMain'
import Container from './components/Container'

import styles from './Index.module.css'

const Index = () => {
  return (
    <>
    <div className={styles.container}>

    <TimerMain />
    </div>
    </>
  )
}

export default Index