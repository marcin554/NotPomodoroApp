import React from 'react'
import styles from './Container.module.css'

const Container = ({ComponentPage}) => {
  return (
    <div className={styles.container}>{ComponentPage}</div>
  )
}

export default Container