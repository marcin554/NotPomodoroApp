import React from 'react'
import styles from './Container.module.css'
import { Container } from '@mui/material'

const _Container = ({ComponentPage}) => {



  return (
<Container maxWidth="xl">


      <div className={styles.item}>
        {ComponentPage}
        
        </div>        
      
     </Container>
  )
}

export default _Container