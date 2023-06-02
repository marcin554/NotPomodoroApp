import React, { useEffect, useState } from 'react'
import TimerMain from './components/TimerMain'
import Container from './components/Container'
import MyComponent from './app'
import styles from './Index.module.css'
import { _GetSettings } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { _getSettings } from '../slices/settingsSlice'
import { getSettings } from '../utils/utils'

//q: why when i apply float:left on * it works but when i try to apply it on .container it dosnt?
const Index = () => {


  const [settings, setSettings] = useState();
    

  useEffect(() => {
      getSettings().then((tempSettings) => {
      
          setSettings(tempSettings.settings);
       
      })
  }, [])
 
    

  

 

 

  return (
    <>


    <div className={styles.container}>
  
    <Container ComponentPage={settings ? <TimerMain settings={settings} /> : null}>
  
</Container>

    </div>
    </>
  )
}

export default Index