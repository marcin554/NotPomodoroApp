import React, { useEffect, useState } from 'react'
import TimerMain from './components/TimerMain'
import _Container from './components/Container'

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
    
          setSettings(tempSettings);
       
      })
  }, [])
 
    

  

 

 

  return (
    <>


    <div className={styles.container}>
    {console.log(settings)}
    <_Container ComponentPage={settings ? <TimerMain settings={settings} /> : null}>
  
</_Container>

    </div>

    </>
  )
}

export default Index