import React from 'react'
import TimerMain from './components/TimerMain'
import Container from './components/Container'
import MyComponent from './app'
import styles from './Index.module.css'
//q: why when i apply float:left on * it works but when i try to apply it on .container it dosnt?
const Index = () => {
  return (
    <>

    <div className={styles.container}>
  
<Container ComponentPage={<TimerMain />} />   
 

    </div>
    </>
  )
}

export default Index