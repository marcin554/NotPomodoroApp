import React from 'react'
import styles from './NavigationMenu.module.css'

const NavigationMenu = () => {
  return (
    <>
    <div className={styles.container}>
       <div className={styles.menuChoice}>Timer</div>
       <div className={styles.menuChoice}>Sessions</div>
       <div className={styles.menuChoice}>Goals </div>
       <div className={styles.menuChoice}>Exit</div>
    </div>
    
    
    </>
  )
}

export default NavigationMenu