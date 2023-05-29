import React from 'react'
import styles from './NavigationMenu.module.css'
import { Link, NavLink } from 'react-router-dom'


const NavigationMenu = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.menuChoice}>
          <Link to="/">Timer</Link>
        </div>
        <div className={styles.menuChoice}>
          <Link to="/sessions">Session</Link>
        </div>
        <div className={styles.menuChoice}>
          <Link to="/sessions">Goals</Link>
        </div>
        <div className={styles.menuChoice}>
          <Link to="/projects">Projects</Link>
        </div>
        <div className={styles.menuChoice}>
          <Link to="/settings">Options</Link>
        </div>
        <div className={styles.menuChoice}>
          <Link to="/sessions">Exit</Link>
        </div>
      </div>
    </>
  );
}

export default NavigationMenu