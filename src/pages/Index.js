import React from 'react'
import TimerMain from './components/TimerMain'
import NavigationMenu from './components/NavigationMenu'
import styles from './Index.module.css'

const Index = () => {
  return (
    <>
    <div className={styles.container}>
    <NavigationMenu />
    <TimerMain />
    </div>
    </>
  )
}

export default Index