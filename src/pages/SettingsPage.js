import React, { useEffect, useState } from 'react'
import { getSettings } from '../utils/utils'
import Container from './components/Container';



const SettingsPage = () => {
    
    const [_settings, setSettings] = useState();
    

    useEffect(() => {
        getSettings().then((tempSettings) => {
          console.log(tempSettings.settings.settings)
            setSettings(tempSettings.settings.settings);
         
        })
    }, [])

    

 

   
 

    return (
      <Container ComponentPage={  <div>

        {_settings && (
          <div>
            <h1>Current Project: {_settings.defaultProject.projectName}</h1>
            <h1>DefaultPomodoroTimerDuration: {_settings.defaultPomodoroTimerDuration} min</h1>
            <h1>DefaultTimerType: {_settings.defaultTimerType}</h1>
          </div>
        )}
    </div>} />
    
    );
  }

export default SettingsPage
