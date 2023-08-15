import React, { useEffect, useState } from 'react'
import { getSettings } from '../utils/utils'
import _Container from './components/Container';
import Settings from './components/Settings';



const SettingsPage = () => {
    
    const [_settings, setSettings] = useState();
    

    useEffect(() => {
        getSettings().then((tempSettings) => {
      
            setSettings(tempSettings);
         
        })
    }, [])

    

 

   
 

    return (
      <_Container ComponentPage={  <div>

        {_settings && (
          <div>
            {/* <h1>Current Project: {_settings.defaultProject.projectName}</h1>
            <h1>DefaultPomodoroTimerDuration: {_settings.defaultPomodoroTimerDuration} min</h1>
            <h1>DefaultTimerType: {_settings.defaultTimerType}</h1> */}
            <Settings settings={_settings} />
          </div>
        )}
    </div>} />
    
    );
  }

export default SettingsPage
