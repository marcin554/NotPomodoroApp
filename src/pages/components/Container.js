import React from 'react'
import styles from './Container.module.css'

const Container = ({ComponentPage}) => {



  return (

    <div className={styles.container}>
      <div className={styles.item}>
        {ComponentPage}
        </div>        
        </div>
     
  )
}

export default Container